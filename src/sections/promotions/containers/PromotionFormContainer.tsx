"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { revalidateServerTags } from "@/lib/utils/cache";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import {
  CreatePromotion,
  CreatePromotionDTO,
  DiscountOption,
  invertedPromotionsDiscountOptionMap,
  promotionsDiscountOptionMap,
  StatesPromotions,
} from "@/lib/types/promotion";
import { createPromotionSchema } from "../utils/shcema";
import {
  createPromotion,
  getPromotion,
  updatePromotion,
} from "@/lib/services/promotions";
import { PromotionForm } from "../components/PromotionForm";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import {
  createFileFromUrl,
  createSerializeFile,
} from "@/lib/utils/fileTransformers";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

export const PromotionFormContainer: FunctionComponent = () => {
  const {
    entityId: promotionId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const formOptions: UseFormProps<
    CreatePromotion & {
      productsOrCombos: { message: string };
      dateRange: { message: string };
    }
  > = {
    resolver: zodResolver(createPromotionSchema()),
    defaultValues: {
      name: undefined,
      description: undefined,
      code: undefined,
      discountOption: promotionsDiscountOptionMap.get(
        DiscountOption.FIXED_AMOUNT
      ),
      discountValue: 1,
      endDate: new Date().toISOString(),
      startDate: new Date().toISOString(),
      image: null,
      isActive: StatesPromotions.INACTIVA,
      productCombos: [],
      products: [],
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<
    CreatePromotion & {
      productsOrCombos: { message: string };
      dateRange: { message: string };
    }
  >(formOptions);
  const {
    formState: { errors },
  } = methods;
  const onSubmit = async ({
    name,
    description,
    code,
    discountOption,
    discountValue,
    endDate,
    image: file,
    isActive: state,
    productCombos,
    products,
    startDate,
  }: CreatePromotion) => {
    setIsLoading(true);
    try {
      const discountOptionValue =
        invertedPromotionsDiscountOptionMap.get(discountOption);

      const createPromotionDTO: CreatePromotionDTO = {
        name: name,
        code,
        description,
        discountOption: discountOptionValue
          ? discountOptionValue
          : DiscountOption.PERCENTAGE,
        discountValue,
        endDate: endDate,
        startDate: startDate,
        image: file ? await createSerializeFile(file) : null,
        isActive: state === StatesPromotions.ACTIVA ? true : false,
        productComboIds: productCombos.map((productCombo) => productCombo.id),
        productIds: products.map((product) => product.id),
      };
      if (!promotionId) {
        await createPromotion(createPromotionDTO);
        openSnackBar("Promoción creada con éxito", "success");
      } else {
        await updatePromotion(promotionId, createPromotionDTO);
        openSnackBar(
          `Promoción con identificador ${promotionId} actualizada con éxito`,
          "success"
        );
      }
      await revalidateServerTags("promotions");
      handleCloseModal();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        openSnackBar(error.message, "error");
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = useCallback(
    async (promotionId: string) => {
      setLoadingData(true);
      setError(undefined);
      try {
        const promotion = await getPromotion(promotionId);
        methods.reset({
          code: promotion.code,
          description: promotion.description,
          discountOption: promotionsDiscountOptionMap.get(
            promotion.discountOption
          ),
          discountValue: promotion.discountValue,
          endDate: promotion.endDate,
          startDate: promotion.startDate,
          image: promotion.image
            ? await createFileFromUrl(promotion.image, promotion.name)
            : null,
          isActive: promotion.isActive
            ? StatesPromotions.ACTIVA
            : StatesPromotions.INACTIVA,
          name: promotion.name,
          productCombos: promotion.productCombos,
          products: promotion.products,
        });
      } catch {
        console.log("error");
      } finally {
        setLoadingData(false);
      }
    },
    [methods]
  );

  useEffect(() => {
    if (promotionId) updateForm(promotionId);
  }, [promotionId, updateForm]);

  useEffect(() => {
    if (error && contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error, contentRef]);

  return (
    <FormProvider {...methods}>
      <form
        action="#"
        onSubmit={methods.handleSubmit(onSubmit)}
        onReset={handleCloseModal}
        autoComplete="off"
        className="relative z-10"
      >
        {loadingData ? (
          <LoadingScreen sx={{ height: "100%" }} />
        ) : (
          <PromotionForm
            isLoading={isLoading}
            isUpdate={promotionId !== null}
            error={error}
            errors={errors}
          />
        )}
      </form>
    </FormProvider>
  );
};

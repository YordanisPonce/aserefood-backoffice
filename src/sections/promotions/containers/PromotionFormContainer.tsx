"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { revalidateServerTags } from "@/lib/utils/cache";
import useModal from "@/components/partials/Modal/hooks/useModal";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import {
  CreatePromotion,
  CreatePromotionDTO,
  DiscountOption,
} from "@/lib/types/promotion";
import { createPromotionSchema } from "../utils/shcema";
import {
  createPromotion,
  getPromotion,
  updatePromotion,
} from "@/lib/services/promotions";
import { PromotionForm } from "../components/PromotionForm";

export const PromotionFormContainer: FunctionComponent = () => {
  const { entityId: promotionId, handleCloseModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const formOptions: UseFormProps<CreatePromotion> = {
    resolver: zodResolver(createPromotionSchema()),
    defaultValues: {
      name: undefined,
      description: undefined,
      code: undefined,
      discountOption: DiscountOption.FIXED_AMOUNT,
      discountValue: 1,
      endDate: new Date().toISOString(),
      startDate: new Date().toISOString(),
      image: undefined,
      isActive: false,
      productCombos: [],
      products: [],
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreatePromotion>(formOptions);

  const onSubmit = async ({
    name,
    description,
    code,
    discountOption,
    discountValue,
    endDate,
    image,
    isActive,
    productCombos,
    products,
    startDate,
  }: CreatePromotion) => {
    setIsLoading(true);
    try {
      const createPromotionDTO: CreatePromotionDTO = {
        name: name,
        code,
        description,
        discountOption: discountOption === DiscountOption.PERCENTAGE ? 1 : 2,
        discountValue,
        endDate: endDate,
        startDate: startDate,
        image,
        isActive,
        productComboIds: productCombos.map((productCombo) => productCombo.id),
        productIds: products.map((product) => product.id),
      };
      if (!promotionId) await createPromotion(createPromotionDTO);
      else await updatePromotion(promotionId, createPromotionDTO);
      await revalidateServerTags("promotions");
      handleCloseModal();
    } catch (error) {
      if (error instanceof Error) setError(error.message);
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
          discountOption:
            promotion.discountOption === 1
              ? DiscountOption.PERCENTAGE
              : DiscountOption.FIXED_AMOUNT,
          discountValue: promotion.discountValue,
          endDate: promotion.endDate,
          startDate: promotion.startDate,
          image: promotion.image,
          isActive: promotion.isActive,
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
  }, []);

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
          />
        )}
      </form>
    </FormProvider>
  );
};

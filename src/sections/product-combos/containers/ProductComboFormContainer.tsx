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
  CreateProductCombo,
  CreateProductComboDTO,
  StatesProductCombos,
} from "@/lib/types/productCombo";
import { createProductComboSchema } from "../utils/schema";
import {
  createProductCombo,
  getProductCombo,
  updateProductCombo,
} from "@/lib/services/productCombos";
import { ProductComboForm } from "../components/ProductComboForm";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { base64ToFile, fileToBase64 } from "@/lib/utils/fileTransformers";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

export const ProductComboFormContainer: FunctionComponent = () => {
  const {
    entityId: productComboId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const formOptions: UseFormProps<CreateProductCombo> = {
    resolver: zodResolver(createProductComboSchema()),
    defaultValues: {
      name: undefined,
      description: undefined,
      image: null,
      isActive: StatesProductCombos.INACTIVE,
      price: 1,
      productComboItems: [],
      shortDescription: undefined,
      zone: null,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateProductCombo>(formOptions);

  const onSubmit = async ({
    name,
    description,
    image: file,
    isActive: state,
    price,
    productComboItems,
    shortDescription,
    zone,
  }: CreateProductCombo) => {
    setIsLoading(true);
    setError(undefined);

    const createProductComboDTO: CreateProductComboDTO = {
      name: name,
      description,
      image: file ? await fileToBase64(file) : null,
      isActive: state === StatesProductCombos.ACTIVE ? true : false,
      price,
      productComboItems: productComboItems.map((productCombo) => {
        return {
          productId: productCombo.product?.id ?? 0,
          amount: productCombo.amount,
        };
      }),
      shortDescription,
      zoneId: zone?.id ?? 0,
    };
    try {
      if (!productComboId) {
        await createProductCombo(createProductComboDTO);
        openSnackBar("Combo de producto creado con éxito", "success");
      } else {
        await updateProductCombo(productComboId, createProductComboDTO);
        openSnackBar(
          `Combo de producto con identificador ${productComboId} actualizado con éxito`,
          "success"
        );
      }
      await revalidateServerTags("product-combos");
      handleCloseModal();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setError(error.message);
        openSnackBar(error.message, "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = useCallback(
    async (productComboId: string) => {
      setLoadingData(true);
      try {
        const productCombo = await getProductCombo(productComboId);
        methods.reset({
          name: productCombo.name,
          description: productCombo.description,
          image: productCombo.image
            ? base64ToFile(productCombo.image, productCombo.name)
            : null,
          isActive: productCombo.isActive
            ? StatesProductCombos.ACTIVE
            : StatesProductCombos.INACTIVE,
          price: productCombo.price,
          productComboItems: productCombo.productComboItems.map(
            (productCombo) => {
              return {
                product: {
                  id: productCombo.productId,
                  name: productCombo.productName,
                },
                amount: productCombo.amount,
              };
            }
          ),
          shortDescription: productCombo.shortDescription,
          zone: {
            id: productCombo.zoneId,
            name: productCombo.zoneName,
          },
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
    if (productComboId) updateForm(productComboId);
  }, [productComboId, updateForm]);

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
          <ProductComboForm
            isLoading={isLoading}
            isUpdate={productComboId !== null}
            error={error}
          />
        )}
      </form>
    </FormProvider>
  );
};

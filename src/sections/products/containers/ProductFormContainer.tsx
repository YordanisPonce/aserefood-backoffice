"use client";

import {
  CreateProduct,
  CreateProductDTO,
  StatesProducts,
} from "@/lib/types/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { createProductSchema } from "../utils/schema";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "@/lib/services/products";
import { revalidateServerTags } from "@/lib/utils/cache";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import useModal from "@/components/partials/Modal/hooks/useModal";
import { ProductForm } from "../components/ProductForm";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import {
  createFileFromUrl,
  createSerializeFile,
} from "@/lib/utils/fileTransformers";


export const ProductFormContainer: FunctionComponent = () => {
  const { entityId: productId, handleCloseModal } = useModal();
  const { openSnackBar } = useSnackBar();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const formOptions: UseFormProps<CreateProduct> = {
    resolver: zodResolver(createProductSchema()),
    defaultValues: {
      category: null,
      description: undefined,
      name: undefined,
      image: null,
      isService: StatesProducts.SERVICE,
      providers: [],
      shortDescription: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };

  const methods = useForm<CreateProduct>(formOptions);

  const onSubmit = async ({
    name,
    description,
    image: file,
    category,
    isService: state,
    providers,
    shortDescription,
  }: CreateProduct) => {
    setIsLoading(true);
    setError(undefined);

    const createProductDto: CreateProductDTO = {
      categoryId: category?.id ?? 0,
      description,
      isService: state === StatesProducts.SERVICE ? true : false,
      image: file ? await createSerializeFile(file) : null,
      name,
      shortDescription,
      providerIds: providers.map((provider) => provider.id),
    };
    try {
      if (!productId) {
        await createProduct(createProductDto);
        openSnackBar("Producto creado con éxito", "success");
      } else {
        await updateProduct(productId, createProductDto);
        openSnackBar(
          `Producto con identificador ${productId} actualizado con éxito`,
          "success"
        );
      }
      await revalidateServerTags("products");
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
    async (productId: string) => {
      setLoadingData(true);
      try {
        const product = await getProduct(productId);
        methods.reset({
          description: product.description,
          name: product.name,
          image: await createFileFromUrl(product.image, product.name),
          isService: product.isService
            ? StatesProducts.SERVICE
            : StatesProducts.NOTSERVICE,
          shortDescription: product.shortDescription,
          providers: product.providers,
          category: {
            id: product.categoryId,
            name: product.categoryName,
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
    if (productId) updateForm(productId);
  }, [productId, updateForm]);

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
          <ProductForm
            isLoading={isLoading}
            isUpdate={productId !== null}
            error={error}
          />
        )}
      </form>
    </FormProvider>
  );
};

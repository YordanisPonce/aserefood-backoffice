"use client";

import { CreateProduct, CreateProductDTO } from "@/lib/types/products";
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
import { base64ToFile, fileToBase64 } from "@/lib/utils/fileTransformers";

export const ProductFormContainer: FunctionComponent = () => {
  const { entityId: productId, handleCloseModal } = useModal();
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
    providers,
    shortDescription,
  }: CreateProduct) => {
    setIsLoading(true);
    setError(undefined);

    const image = file ? await fileToBase64(file) : null;

    const createProductDto: CreateProductDTO = {
      categoryId: category?.id ?? 0,
      description,
      isService: false,
      image,
      name,
      shortDescription,
      providerIds: providers.map((provider) => provider.id),
    };
    try {
      if (!productId) {
        await createProduct(createProductDto);
      } else {
        await updateProduct(productId, createProductDto);
      }
      await revalidateServerTags("products");
      handleCloseModal();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
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
          image: product.image
            ? base64ToFile(product.image, product.name)
            : null,
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

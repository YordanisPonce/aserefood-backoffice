"use client";

import {
  CreateProduct,
  CreateProductDTO,
  UpdateProduct,
  UpdateProductDTO,
} from "@/lib/types/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { createProductSchema, updateProductSchema } from "../utils/schema";
import {
  createProducts,
  getProduct,
  updateProduct,
} from "@/lib/services/products";
import { revalidateServerTags } from "@/lib/utils/cache";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import useModal from "@/components/partials/Modal/hooks/useModal";
import { ProductForm } from "../components/CreateProductFrom";

export const AddProductContainer: FunctionComponent = () => {
  const { entityId: productId, handleCloseModal } = useModal();
  // ****if productId is no null them this form is open of update****
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const formOptions: UseFormProps<CreateProduct | UpdateProduct> = !productId
    ? {
        // resolver of create
        resolver: zodResolver(createProductSchema()),
        defaultValues: {
          category: null,
          description: undefined,
          name: undefined,
          provider: null,
          shortDescription: undefined,
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
      }
    : {
        // resolver of update (in case the entity update does not have the same fields)
        resolver: zodResolver(updateProductSchema()),
        defaultValues: {
          category: null,
          description: undefined,
          name: undefined,
          provider: null,
          shortDescription: undefined,
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
      };
  const methods = useForm<CreateProduct | UpdateProduct>(formOptions);

  const onSubmit = async (product: CreateProduct | UpdateProduct) => {
    setIsLoading(true);
    try {
      if (!productId) {
        // create product
        const { category, description, shortDescription, name, provider } =
          product as CreateProduct;
        const createProductDto: CreateProductDTO = {
          categoryId: category?.id ?? 0,
          description,
          isService: false,
          name,
          shortDescription,
          providerIds: provider ? [provider?.id] : [],
        };
        await createProducts(createProductDto);
      } else {
        // update product
        const { category, description, shortDescription, name, provider } =
          product as UpdateProduct;
        const updateProductDTO: UpdateProductDTO = {
          categoryId: category?.id ?? 0,
          description,
          isService: false,
          name,
          shortDescription,
          providerIds: provider ? [provider?.id] : [],
        };
        await updateProduct(productId, updateProductDTO);
      }
      await revalidateServerTags("products");
      handleCloseModal();
    } catch (error) {
      console.log(error);
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
          shortDescription: product.shortDescription,
          provider: {
            id: product.providers[0].id,
            name: product.providers[0].name,
          },
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

  // when the component is assembled
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
          />
        )}
      </form>
    </FormProvider>
  );
};

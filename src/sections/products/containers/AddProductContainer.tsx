"use client";

import { CreateProduct, CreateProductDTO } from "@/lib/types/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useEffect, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { createProductSchema } from "../utils/schema";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CreateProductFrom } from "../components/CreateProductFrom";
import { createProducts, getProduct } from "@/lib/services/products";
import useUrlParams from "@/lib/hooks/useUrlParams";
import { revalidateServerTags } from "@/lib/utils/cache";
import { useSearchParams } from "next/navigation";

export const AddProductContainer: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateSearchParams } = useUrlParams();
  const params = useSearchParams();

  const currentModal = params.get("currentModal");
  const productId = params.get("productId");

  const formOptions: UseFormProps<CreateProduct> = {
    resolver: zodResolver(createProductSchema()),
    defaultValues: {
      category: undefined,
      description: undefined,
      name: undefined,
      provider: undefined,
      shortDescription: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateProduct>(formOptions);

  const handleCloseModal = () => {
    updateSearchParams({
      currentModal: {
        action: "delete",
        value: "",
      },
      productId: {
        action: "delete",
        value: "",
      },
    });
    methods.reset();
  };

  const onSubmit = async ({
    category,
    description,
    name,
    provider,
    shortDescription,
  }: CreateProduct) => {
    setIsLoading(true);
    try {
      const createProductDto: CreateProductDTO = {
        categoryId: category.id,
        description,
        isService: false,
        name,
        shortDescription,
        providerIds: [provider.id],
      };
      await createProducts(createProductDto);
      await revalidateServerTags("products");
      handleCloseModal();
      methods.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = async (productId: string) => {
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

    console.log({
      ...product,
      provider: {
        id: product.providers[0].id,
        name: product.providers[0].name,
      },
      category: {
        id: product.categoryId,
        name: product.categoryName,
      },
    });
  };
  useEffect(() => {
    if (currentModal === "update-product" && productId) {
      updateForm(productId);
    }
  }, [currentModal]);

  return (
    <Dialog
      open={
        currentModal === "create-product" || currentModal === "update-product"
      }
      maxWidth={"md"}
      fullWidth
      keepMounted={false}
    >
      <DialogTitle id="alert-dialog-title">Crear producto </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form
            action="#"
            onSubmit={methods.handleSubmit(onSubmit)}
            onReset={handleCloseModal}
            autoComplete="off"
            className="relative z-10"
          >
            <CreateProductFrom isLoading={isLoading} />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

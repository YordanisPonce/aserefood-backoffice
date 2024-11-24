"use client";

import { CreateProduct, CreateProductDTO } from "@/lib/types/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { createProductSchema } from "../utils/schema";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CreateProductFrom } from "../components/CreateProductFrom";
import { createProducts } from "@/lib/services/products";
import { revalidateTag } from "next/cache";

export const AddProductContainer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formOptions: UseFormProps<CreateProduct> = {
    resolver: zodResolver(createProductSchema()),
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateProduct>(formOptions);

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
      await revalidateTag("products");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open maxWidth={"md"} fullWidth>
      <DialogTitle id="alert-dialog-title">Crear producto </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form
            action="#"
            onSubmit={methods.handleSubmit(onSubmit)}
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

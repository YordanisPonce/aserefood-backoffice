"use client";

import { CreateProduct, CreateProductDTO } from "@/lib/types/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { createProductSchema } from "../utils/schema";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CreateProductFrom } from "../components/CreateProductFrom";
import { createProducts } from "@/lib/services/products";
import useUrlParams from "@/lib/hooks/useUrlParams";
import { revalidateServerTags } from "@/lib/utils/cache";

type AddProductContainerProps = {
  currentModal?: string;
};

export const AddProductContainer: FunctionComponent<
  AddProductContainerProps
> = ({ currentModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateSearchParams } = useUrlParams();

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

  return (
    <Dialog
      open={currentModal === "create-product"}
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

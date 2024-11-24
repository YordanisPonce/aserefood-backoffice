"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import useUrlParams from "@/lib/hooks/useUrlParams";
import { revalidateServerTags } from "@/lib/utils/cache";
import { CreateProvider, CreateProviderDTO } from "@/lib/types/provider";
import { createProvider } from "@/lib/services/providers";
import { createProviderSchema } from "../utils/schema";
import { CreateProviderForm } from "../components/CreateProviderForm";

type AddProviderContainerProps = {
  currentModal?: string;
};

export const AddProviderContainer: FunctionComponent<
  AddProviderContainerProps
> = ({ currentModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateSearchParams } = useUrlParams();

  const formOptions: UseFormProps<CreateProvider> = {
    resolver: zodResolver(createProviderSchema()),
    defaultValues: {
      name: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateProvider>(formOptions);

  const handleCloseModal = () => {
    updateSearchParams({
      currentModal: {
        action: "delete",
        value: "",
      },
    });
    methods.reset();
  };

  const onSubmit = async ({ name }: CreateProvider) => {
    setIsLoading(true);
    try {
      const createProviderDto: CreateProviderDTO = {
        name: name,
      };
      await createProvider(createProviderDto);
      await revalidateServerTags("providers");
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
      open={currentModal === "create-provider"}
      maxWidth={"md"}
      fullWidth
      keepMounted={false}
    >
      <DialogTitle id="alert-dialog-title">Crear Proveedor </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form
            action="#"
            onSubmit={methods.handleSubmit(onSubmit)}
            onReset={handleCloseModal}
            autoComplete="off"
            className="relative z-10"
          >
            <CreateProviderForm isLoading={isLoading} />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

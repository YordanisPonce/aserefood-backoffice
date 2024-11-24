"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import useUrlParams from "@/lib/hooks/useUrlParams";
import { revalidateServerTags } from "@/lib/utils/cache";
import { createProvinceSchema } from "../utils/schema";
import { CreateProvince, CreateProvinceDTO } from "@/lib/types/province";
import { createProvince } from "@/lib/services/provinces";
import { CreateProvinceForm } from "../components/CreateProvinceForm";


type AddProvinceContainerProps = {
  currentModal?: string;
};

export const AddProvinceContainer: FunctionComponent<
AddProvinceContainerProps
> = ({ currentModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateSearchParams } = useUrlParams();

  const formOptions: UseFormProps<CreateProvince> = {
    resolver: zodResolver(createProvinceSchema()),
    defaultValues: {
      name: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateProvince>(formOptions);

  const handleCloseModal = () => {
    updateSearchParams({
      currentModal: {
        action: "delete",
        value: "",
      },
    });
    methods.reset();
  };

  const onSubmit = async ({ name }: CreateProvince) => {
    setIsLoading(true);
    try {
      const createProvinceDto: CreateProvinceDTO = {
        name: name,
      };
      await createProvince(createProvinceDto);
      await revalidateServerTags("provinces");
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
      open={currentModal === "create-province"}
      maxWidth={"md"}
      fullWidth
      keepMounted={false}
    >
      <DialogTitle id="alert-dialog-title">Crear Provincia </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form
            action="#"
            onSubmit={methods.handleSubmit(onSubmit)}
            onReset={handleCloseModal}
            autoComplete="off"
            className="relative z-10"
          >
            <CreateProvinceForm isLoading={isLoading} />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import useUrlParams from "@/lib/hooks/useUrlParams";
import { revalidateServerTags } from "@/lib/utils/cache";
import { createMunicipalitieSchema } from "../utils/schema";
import {
  CreateMunicipality,
  CreateMunicipalityDTO,
} from "@/lib/types/municipality";
import { createMunicipalitie } from "@/lib/services/municipalities";
import { CreateMunicipalitieForm } from "../components/CreateMunicipalitieForm";

type AddMunicipalitieContainerProps = {
  currentModal?: string;
};

export const AddMunicipalitieContainer: FunctionComponent<
  AddMunicipalitieContainerProps
> = ({ currentModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateSearchParams } = useUrlParams();

  const formOptions: UseFormProps<CreateMunicipality> = {
    resolver: zodResolver(createMunicipalitieSchema()),
    defaultValues: {
      name: undefined,
      province: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateMunicipality>(formOptions);

  const handleCloseModal = () => {
    updateSearchParams({
      currentModal: {
        action: "delete",
        value: "",
      },
    });
    methods.reset();
  };

  const onSubmit = async ({ name, province }: CreateMunicipality) => {
    setIsLoading(true);
    try {
      const createMunicipaliyDTO: CreateMunicipalityDTO = {
        name,
        provinceId: province.id,
      };
      await createMunicipalitie(createMunicipaliyDTO);
      await revalidateServerTags("municipalities");
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
      open={currentModal === "create-municipalitie"}
      maxWidth={"md"}
      fullWidth
      keepMounted={false}
    >
      <DialogTitle id="alert-dialog-title">Crear Municipio </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form
            action="#"
            onSubmit={methods.handleSubmit(onSubmit)}
            onReset={handleCloseModal}
            autoComplete="off"
            className="relative z-10"
          >
            <CreateMunicipalitieForm isLoading={isLoading} />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

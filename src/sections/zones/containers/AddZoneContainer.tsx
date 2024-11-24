"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import useUrlParams from "@/lib/hooks/useUrlParams";
import { revalidateServerTags } from "@/lib/utils/cache";
import { createZoneSchema } from "../utils/schema";
import { CreateZone, CreateZoneDTO } from "@/lib/types/zone";
import { createZone } from "@/lib/services/zones";
import { CreateZoneForm } from "../components/CreateZoneForm";

type AddZoneContainerProps = {
  currentModal?: string;
};

export const AddZoneContainer: FunctionComponent<AddZoneContainerProps> = ({
  currentModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateSearchParams } = useUrlParams();

  const formOptions: UseFormProps<CreateZone> = {
    resolver: zodResolver(createZoneSchema()),
    defaultValues: {
      name: undefined,
      description: undefined,
      municipality: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateZone>(formOptions);

  const handleCloseModal = () => {
    updateSearchParams({
      currentModal: {
        action: "delete",
        value: "",
      },
    });
    methods.reset();
  };

  const onSubmit = async ({ name, municipality, description }: CreateZone) => {
    setIsLoading(true);
    try {
      const createZoneDto: CreateZoneDTO = {
        name,
        description,
        municipalityIds: [municipality.id]
      };
      await createZone(createZoneDto);
      await revalidateServerTags("zones");
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
      open={currentModal === "create-zone"}
      maxWidth={"md"}
      fullWidth
      keepMounted={false}
    >
      <DialogTitle id="alert-dialog-title">Crear Zona </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form
            action="#"
            onSubmit={methods.handleSubmit(onSubmit)}
            onReset={handleCloseModal}
            autoComplete="off"
            className="relative z-10"
          >
            <CreateZoneForm isLoading={isLoading} />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { revalidateServerTags } from "@/lib/utils/cache";
import { createZoneSchema } from "../utils/schema";
import { CreateZone, CreateZoneDTO } from "@/lib/types/zone";
import { createZone, getZone, updateZone } from "@/lib/services/zones";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import { ZoneForm } from "../components/ZoneForm";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

export const ZoneFormContainer: FunctionComponent = () => {
  const {
    entityId: zoneId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const formOptions: UseFormProps<CreateZone> = {
    resolver: zodResolver(createZoneSchema()),
    defaultValues: {
      name: undefined,
      description: undefined,
      municipalities: [],
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateZone>(formOptions);
  const {
    formState: { errors, isValid },
  } = methods;

  const onSubmit = async ({
    name,
    municipalities,
    description,
  }: CreateZone) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const createZoneDto: CreateZoneDTO = {
        name,
        description,
        municipalityIds: municipalities.map((municipality) => municipality.id),
      };
      if (!zoneId) {
        await createZone(createZoneDto);
        openSnackBar("Zona creada con éxito", "success");
      } else {
        await updateZone(zoneId, createZoneDto);
        openSnackBar(
          `Zona con identificador ${zoneId} actualizada con éxito`,
          "success"
        );
      }
      await revalidateServerTags("zones");
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
    async (zoneId: string) => {
      setLoadingData(true);
      try {
        const zone = await getZone(zoneId);
        methods.reset({
          name: zone.name,
          description: zone.description,
          municipalities: zone.municipalities,
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
    if (zoneId) updateForm(zoneId);
  }, [zoneId, updateForm]);

  useEffect(() => {
    if (error && contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error, contentRef]);

  useEffect(() => {
    if (errors && Object.keys(errors).length > 0 && !isValid) {
      setError(undefined);
      setTimeout(() => {
        setError("El formulario presenta errores. Por favor revise");
      }, 0);
    } else {
      setError(undefined);
    }
  }, [isValid, errors]);

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
          <ZoneForm
            isLoading={isLoading}
            isUpdate={zoneId !== null}
            error={error}
          />
        )}
      </form>
    </FormProvider>
  );
};

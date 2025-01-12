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
import { createMunicipalitieSchema } from "../utils/schema";
import {
  CreateMunicipality,
  CreateMunicipalityDTO,
} from "@/lib/types/municipality";
import {
  createMunicipality,
  getMunicipality,
  updateMunicipality,
} from "@/lib/services/municipalities";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import { MunicipalityForm } from "../components/MunicipalityForm";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

export const MunicipalityFormContainer: FunctionComponent = () => {
  const {
    entityId: municipalityId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const formOptions: UseFormProps<CreateMunicipality> = {
    resolver: zodResolver(createMunicipalitieSchema()),
    defaultValues: {
      name: undefined,
      province: null,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateMunicipality>(formOptions);

  const onSubmit = async ({ name, province }: CreateMunicipality) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const createMunicipaliyDTO: CreateMunicipalityDTO = {
        name,
        provinceId: province?.id ?? 0,
      };
      if (!municipalityId) {
        await createMunicipality(createMunicipaliyDTO);
        openSnackBar("Municipio creado con éxito", "success");
      } else {
        await updateMunicipality(municipalityId, createMunicipaliyDTO);
        openSnackBar(
          `Municipio con identificador ${municipalityId} actualizado con éxito`,
          "success"
        );
      }
      await revalidateServerTags("municipalities");
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
    async (municipalityId: string) => {
      setLoadingData(true);
      try {
        const municipality = await getMunicipality(municipalityId);
        methods.reset({
          name: municipality.name,
          province: {
            id: municipality.provinceId,
            name: municipality.provinceName,
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
    if (municipalityId) updateForm(municipalityId);
  }, [municipalityId, updateForm]);

  useEffect(() => {
    if (error && contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

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
          <MunicipalityForm
            isLoading={isLoading}
            isUpdate={municipalityId !== null}
            error={error}
          />
        )}
      </form>
    </FormProvider>
  );
};

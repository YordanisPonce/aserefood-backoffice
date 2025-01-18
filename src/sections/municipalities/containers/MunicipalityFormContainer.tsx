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
import { ApiError, UnauthorizedClientError } from "@/lib/types/errors";
import { signOut } from "next-auth/react";
import { routes } from "@/lib/config/routes";
import { errorClientHandling } from "@/lib/utils/errorClientHandling";
import useAlertDialog from "@/components/partials/AlertDialog/hooks/useAlertDialog";

export const MunicipalityFormContainer: FunctionComponent = () => {
  const {
    entityId: municipalityId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
  const { openAlertDialog } = useAlertDialog();
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
  const {
    formState: { errors, isValid },
  } = methods;

  const onSubmit = async ({ name, province }: CreateMunicipality) => {
    setIsLoading(true);
    setError(undefined);
    try {
      let response: ApiError;
      const createMunicipaliyDTO: CreateMunicipalityDTO = {
        name,
        provinceId: province?.id ?? 0,
      };
      if (!municipalityId) {
        response = await createMunicipality(createMunicipaliyDTO);
        errorClientHandling(response);
        openSnackBar("Municipio creado con éxito", "success");
      } else {
        response = await updateMunicipality(
          municipalityId,
          createMunicipaliyDTO
        );
        errorClientHandling(response);
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
        if (error instanceof UnauthorizedClientError) {
          openAlertDialog(error.message, "error", () => {
            signOut({ redirect: true, callbackUrl: routes.login.path });
          });
        } else {
          setError(error.message);
          openSnackBar(error.message, "error");
        }
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

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
import { CreateProvider, CreateProviderDTO } from "@/lib/types/provider";
import {
  createProvider,
  getProvider,
  updateProvider,
} from "@/lib/services/providers";
import { createProviderSchema } from "../utils/schema";
import { ProviderForm } from "../components/ProviderForm";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";
import { ApiError, UnauthorizedClientError } from "@/lib/types/errors";
import { signOut } from "next-auth/react";
import { routes } from "@/lib/config/routes";
import { errorClientHandling } from "@/lib/utils/errorClientHandling";
import useAlertDialog from "@/components/partials/AlertDialog/hooks/useAlertDialog";

export const ProviderFormContainer: FunctionComponent = () => {
  const {
    entityId: providerId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
  const { openAlertDialog } = useAlertDialog();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const formOptions: UseFormProps<CreateProvider> = {
    resolver: zodResolver(createProviderSchema()),
    defaultValues: {
      name: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateProvider>(formOptions);
  const {
    formState: { errors, isValid },
  } = methods;

  const onSubmit = async ({ name }: CreateProvider) => {
    setIsLoading(true);
    setError(undefined);
    try {
      let response: ApiError;
      const createProviderDto: CreateProviderDTO = {
        name: name,
      };
      if (!providerId) {
        response = await createProvider(createProviderDto);
        errorClientHandling(response);
        openSnackBar("Proveedor creado con éxito", "success");
      } else {
        response = await updateProvider(providerId, createProviderDto);
        errorClientHandling(response);
        openSnackBar(
          `Proveedor con identificador ${providerId} actualizado con éxito`,
          "success"
        );
      }
      await revalidateServerTags("providers");
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
    async (providerId: string) => {
      setLoadingData(true);
      try {
        const provider = await getProvider(providerId);
        methods.reset({ name: provider.name });
      } catch {
        console.log("error");
      } finally {
        setLoadingData(false);
      }
    },
    [methods]
  );

  useEffect(() => {
    if (providerId) updateForm(providerId);
  }, [providerId, updateForm]);

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
          <ProviderForm
            isLoading={isLoading}
            isUpdate={providerId !== null}
            error={error}
          />
        )}
      </form>
    </FormProvider>
  );
};

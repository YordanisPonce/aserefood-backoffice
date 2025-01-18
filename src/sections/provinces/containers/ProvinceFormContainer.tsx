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
import { createProvinceSchema } from "../utils/schema";
import { CreateProvince, CreateProvinceDTO } from "@/lib/types/province";
import {
  createProvince,
  getProvince,
  updateProvince,
} from "@/lib/services/provinces";
import { ProvinceForm } from "../components/ProvinceForm";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";
import { ApiError, UnauthorizedClientError } from "@/lib/types/errors";
import { signOut } from "next-auth/react";
import { routes } from "@/lib/config/routes";
import useAlertDialog from "@/components/partials/AlertDialog/hooks/useAlertDialog";
import { errorClientHandling } from "@/lib/utils/errorClientHandling";

export const ProvinceFormContainer: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const {
    entityId: provinceId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
  const { openAlertDialog } = useAlertDialog();
  const [error, setError] = useState<string | undefined>(undefined);

  const formOptions: UseFormProps<CreateProvince> = {
    resolver: zodResolver(createProvinceSchema()),
    defaultValues: {
      name: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateProvince>(formOptions);
  const {
    formState: { errors, isValid },
  } = methods;

  const onSubmit = async ({ name }: CreateProvince) => {
    setIsLoading(true);
    setError(undefined);
    try {
      let response: ApiError;
      const createProvinceDto: CreateProvinceDTO = {
        name: name,
      };
      if (!provinceId) {
        response = await createProvince(createProvinceDto);
        errorClientHandling(response);
        openSnackBar("Provincia creada con éxito", "success");
      } else {
        response = await updateProvince(provinceId, createProvinceDto);
        errorClientHandling(response);
        openSnackBar(
          `Provincia con identificador ${provinceId} actualizada con éxito`,
          "success"
        );
      }
      await revalidateServerTags("provinces");
      handleCloseModal();
      methods.reset();
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
    async (provinceId: string) => {
      setLoadingData(true);
      try {
        const province = await getProvince(provinceId);
        methods.reset({ name: province.name });
      } catch {
        console.log("error");
      } finally {
        setLoadingData(false);
      }
    },
    [methods]
  );

  useEffect(() => {
    if (provinceId) updateForm(provinceId);
  }, [provinceId, updateForm]);

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
          <ProvinceForm
            isLoading={isLoading}
            isUpdate={provinceId !== null}
            error={error}
          />
        )}
      </form>
    </FormProvider>
  );
};

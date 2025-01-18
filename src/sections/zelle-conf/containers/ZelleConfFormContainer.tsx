"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { updateZelleConfSchema } from "../utils/schema";
import { revalidateServerTags } from "@/lib/utils/cache";
import { base64ToFile, fileToBase64 } from "@/lib/utils/fileTransformers";
import { UpdateZelleConf, ZelleConf } from "@/lib/types/zelleConf";
import { useCallback, useEffect, useState } from "react";
import { updateZelleConf } from "@/lib/services/zelleConf";
import ZelleConfForm from "../components/ZelleConfForm";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { ApiError, UnauthorizedClientError } from "@/lib/types/errors";
import { signOut } from "next-auth/react";
import { routes } from "@/lib/config/routes";
import { errorClientHandling } from "@/lib/utils/errorClientHandling";
import useAlertDialog from "@/components/partials/AlertDialog/hooks/useAlertDialog";

interface Props {
  zelleConf: ZelleConf | undefined;
}

export default function ZelleConfFormContainer({ zelleConf }: Props) {
  const { openSnackBar } = useSnackBar();
  const { openAlertDialog } = useAlertDialog();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const formOptions: UseFormProps<UpdateZelleConf> = {
    resolver: zodResolver(updateZelleConfSchema()),
    defaultValues: {
      phoneNumber: "",
      qr: null,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };

  const methods = useForm<UpdateZelleConf>(formOptions);

  const onSubmit = async ({ phoneNumber, qr: file }: UpdateZelleConf) => {
    try {
      setIsLoading(true);
      setError(undefined);

      const response: ApiError = await updateZelleConf({
        phoneNumber,
        qr: file ? await fileToBase64(file) : null,
      });
      errorClientHandling(response);
      openSnackBar("Zelle Conf actualizada con éxito", "success");
      await revalidateServerTags("zelle-conf");
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
    async (zelleConf: ZelleConf) => {
      methods.reset({
        phoneNumber: zelleConf.phoneNumber,
        qr: base64ToFile(zelleConf.qr, "qr"),
      });
    },
    [methods]
  );

  useEffect(() => {
    if (zelleConf) updateForm(zelleConf);
  }, [zelleConf, updateForm]);

  return (
    <FormProvider {...methods}>
      <form
        action="#"
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        className="relative z-10"
      >
        <ZelleConfForm isLoading={isLoading} error={error} />
      </form>
    </FormProvider>
  );
}

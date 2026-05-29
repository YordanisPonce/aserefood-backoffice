"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { updateWhatsAppConfSchema } from "../utils/schema";
import { revalidateServerTags } from "@/lib/utils/cache";
import { UpdateWhatsAppConf, WhatsAppConf } from "@/lib/types/whatsappConf";
import { useCallback, useEffect, useState } from "react";
import { updateWhatsAppConf } from "@/lib/services/whatsappConf";
import WhatsAppConfForm from "../components/WhatsAppConfForm";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { ApiError, UnauthorizedClientError } from "@/lib/types/errors";
import { signOut } from "next-auth/react";
import { routes } from "@/lib/config/routes";
import { errorClientHandling } from "@/lib/utils/errorClientHandling";
import useAlertDialog from "@/components/partials/AlertDialog/hooks/useAlertDialog";

interface Props {
  whatsappConf: WhatsAppConf | undefined;
}

export default function WhatsAppConfFormContainer({ whatsappConf }: Props) {
  const { openSnackBar } = useSnackBar();
  const { openAlertDialog } = useAlertDialog();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  
  const formOptions: UseFormProps<UpdateWhatsAppConf> = {
    resolver: zodResolver(updateWhatsAppConfSchema()),
    defaultValues: {
      phoneNumber: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };

  const methods = useForm<UpdateWhatsAppConf>(formOptions);

  const onSubmit = async ({ phoneNumber }: UpdateWhatsAppConf) => {
    try {
      setIsLoading(true);
      setError(undefined);

      const response: ApiError = await updateWhatsAppConf({
        phoneNumber,
      });
      errorClientHandling(response);
      openSnackBar("WhatsApp Conf actualizada con éxito", "success");
      await revalidateServerTags("whatsapp-conf");
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
    async (whatsappConf: WhatsAppConf) => {
      methods.reset({
        phoneNumber: whatsappConf.phoneNumber,
      });
    },
    [methods]
  );

  useEffect(() => {
    if (whatsappConf) updateForm(whatsappConf);
  }, [whatsappConf, updateForm]);

  return (
    <FormProvider {...methods}>
      <form
        action="#"
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        className="relative z-10"
      >
        <WhatsAppConfForm isLoading={isLoading} error={error} />
      </form>
    </FormProvider>
  );
}
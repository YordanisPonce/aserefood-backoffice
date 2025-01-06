"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { updateZelleConfSchema } from "../utils/schema";
import { revalidateServerTags } from "@/lib/utils/cache";
import { base64ToFile, fileToBase64 } from "@/lib/utils/fileTransformers";
import { UpdateZelleConf, ZelleConf } from "@/lib/types/zelleConf";
import { useState } from "react";
import { updateZelleConf } from "@/lib/services/zelleConf";
import ZelleConfForm from "../components/ZelleConfForm";

interface Props {
  zellConf: ZelleConf | undefined;
}

export default function ZelleConfFormContainer({ zellConf }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const formOptions: UseFormProps<UpdateZelleConf> = {
    resolver: zodResolver(updateZelleConfSchema()),
    defaultValues: zellConf
      ? {
          phoneNumber: zellConf.phoneNumber,
          qr: zellConf.qr ? base64ToFile(zellConf.qr, "qr") : null,
        }
      : {
          phoneNumber: "Introduzca por primera vez el número telefónico",
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
      const image = file ? await fileToBase64(file) : null;
      await updateZelleConf({
        phoneNumber,
        qr: image,
      });
      await revalidateServerTags("zelle-conf");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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

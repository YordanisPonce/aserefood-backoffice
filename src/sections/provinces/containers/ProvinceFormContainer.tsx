"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
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
import useModal from "@/components/partials/Modal/hooks/useModal";
import LoadingScreen from "@/components/common/loading/LoadingScreen";

export const ProvinceFormContainer: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const { entityId: provinceId, handleCloseModal } = useModal();
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

  const onSubmit = async ({ name }: CreateProvince) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const createProvinceDto: CreateProvinceDTO = {
        name: name,
      };
      if (!provinceId) await createProvince(createProvinceDto);
      else await updateProvince(provinceId, createProvinceDto);
      await revalidateServerTags("provinces");
      handleCloseModal();
      methods.reset();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
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

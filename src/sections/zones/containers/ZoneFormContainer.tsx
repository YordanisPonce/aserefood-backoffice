"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { revalidateServerTags } from "@/lib/utils/cache";
import { createZoneSchema } from "../utils/schema";
import { CreateZone, CreateZoneDTO } from "@/lib/types/zone";
import { createZone, getZone, updateZone } from "@/lib/services/zones";
import useModal from "@/components/partials/Modal/hooks/useModal";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import { ZoneForm } from "../components/ZoneForm";

export const ZoneFormContainer: FunctionComponent = () => {
  const { entityId: zoneId, handleCloseModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

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

  const onSubmit = async ({
    name,
    municipalities,
    description,
  }: CreateZone) => {
    setIsLoading(true);
    try {
      const createZoneDto: CreateZoneDTO = {
        name,
        description,
        municipalityIds: municipalities.map((municipality) => municipality.id),
      };
      if (!zoneId) await createZone(createZoneDto);
      else await updateZone(zoneId, createZoneDto);
      await revalidateServerTags("zones");
      handleCloseModal();
    } catch (error) {
      console.log(error);
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
  }, []);

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
          <ZoneForm isLoading={isLoading} isUpdate={zoneId !== null} />
        )}
      </form>
    </FormProvider>
  );
};

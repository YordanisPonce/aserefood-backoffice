"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { revalidateServerTags } from "@/lib/utils/cache";
import { createDeliveryMethodSchema } from "../utils/schema";
import useModal from "@/components/partials/Modal/hooks/useModal";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import {
  CreateDeliveryMethod,
  CreateDeliveryMethodDTO,
} from "@/lib/types/deliveryMethod";
import {
  createDeliveryMethod,
  getDeliveryMethod,
  updateDeliveryMethod,
} from "@/lib/services/deliveryMethods";
import { DeliveryMethodForm } from "../components/DeliveryMethodForm";

export const DeliveryMethodFormContainer: FunctionComponent = () => {
  const { entityId: deliveryMethodId, handleCloseModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const formOptions: UseFormProps<CreateDeliveryMethod> = {
    resolver: zodResolver(createDeliveryMethodSchema()),
    defaultValues: {
      name: undefined,
      cost: 1,
      estimatedArrivalTime: undefined,
      isFree: false,
      minimalDeliveryPrice: 1,
      municipality: null,
      pickUpDirection: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateDeliveryMethod>(formOptions);

  const onSubmit = async ({
    name,
    cost,
    estimatedArrivalTime,
    isFree,
    minimalDeliveryPrice,
    municipality,
    pickUpDirection,
  }: CreateDeliveryMethod) => {
    setIsLoading(true);
    try {
      const createDeliveryMethodDTO: CreateDeliveryMethodDTO = {
        name: name,
        cost,
        isFree,
        estimatedArrivalTime,
        minimalDeliveryPrice,
        municipalityId: municipality?.id ?? 0,
        pickUpDirection,
      };
      if (!deliveryMethodId)
        await createDeliveryMethod(createDeliveryMethodDTO);
      else
        await updateDeliveryMethod(deliveryMethodId, createDeliveryMethodDTO);
      await revalidateServerTags("delivery-methods");
      handleCloseModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = useCallback(
    async (deliveryMethodId: string) => {
      setLoadingData(true);
      try {
        const deliveryMethod = await getDeliveryMethod(deliveryMethodId);
        methods.reset({
          name: deliveryMethod.name,
          cost: deliveryMethod.cost,
          estimatedArrivalTime: deliveryMethod.estimatedArrivalTime,
          isFree: deliveryMethod.isFree,
          minimalDeliveryPrice: deliveryMethod.minimalDeliveryPrice,
          municipality: {
            id: deliveryMethod.municipality.id,
            name: deliveryMethod.municipality.name,
          },
          pickUpDirection: deliveryMethod.pickUpDirection,
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
    if (deliveryMethodId) updateForm(deliveryMethodId);
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
          <DeliveryMethodForm
            isLoading={isLoading}
            isUpdate={deliveryMethodId !== null}
          />
        )}
      </form>
    </FormProvider>
  );
};

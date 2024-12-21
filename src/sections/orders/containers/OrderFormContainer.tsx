"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { revalidateServerTags } from "@/lib/utils/cache";
import useModal from "@/components/partials/Modal/hooks/useModal";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import { updateOrderSchema } from "../utils/schemas";
import {
  orderStatusMap,
  orderStatusMapInverted,
  UpdateOrder,
} from "@/lib/types/order";
import { getOrder, updateOrder } from "@/lib/services/orders";
import { OrderForm } from "../components/OrderForm";

export const OrderFormContainer: FunctionComponent = () => {
  const { entityId: orderId, handleCloseModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const formOptions: UseFormProps<UpdateOrder> = {
    resolver: zodResolver(updateOrderSchema()),
    defaultValues: {
      status: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<UpdateOrder>(formOptions);

  const onSubmit = useCallback(
    async ({ status }: UpdateOrder) => {
      setIsLoading(true);
      setError(undefined);

      try {
        if (orderId) {
          const orderStatus = orderStatusMapInverted.get(status);
          if (orderStatus)
            await updateOrder(orderId, {
              status: orderStatus,
            });
        }
        await revalidateServerTags("orders");
        handleCloseModal();
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [orderId]
  );

  const updateForm = useCallback(
    async (orderId: string) => {
      setLoadingData(true);
      try {
        const order = await getOrder(orderId);
        methods.reset({
          status: orderStatusMap.get(order.status),
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
    if (orderId) updateForm(orderId);
  }, [orderId, updateForm]);

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
          <OrderForm isLoading={isLoading} error={error} />
        )}
      </form>
    </FormProvider>
  );
};

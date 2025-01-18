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
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import { updateOrderSchema } from "../utils/schemas";
import {
  orderStatusMap,
  orderStatusMapInverted,
  UpdateOrder,
} from "@/lib/types/order";
import { getOrder, updateOrder } from "@/lib/services/orders";
import { OrderForm } from "../components/OrderForm";
import useAlertDialog from "@/components/partials/AlertDialog/hooks/useAlertDialog";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";
import { ApiError, UnauthorizedClientError } from "@/lib/types/errors";
import { signOut } from "next-auth/react";
import { routes } from "@/lib/config/routes";
import { errorClientHandling } from "@/lib/utils/errorClientHandling";

export const OrderFormContainer: FunctionComponent = () => {
  const {
    entityId: orderId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openAlertDialog } = useAlertDialog();
  const { openSnackBar } = useSnackBar();
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

  const {
    formState: { errors, isValid },
  } = methods;

  const onSubmit = async ({ status }: UpdateOrder) => {
    setIsLoading(true);
    setError(undefined);

    try {
      let response: ApiError;
      if (orderId) {
        const orderStatus = orderStatusMapInverted.get(status);
        if (orderStatus) {
          response = await updateOrder(orderId, {
            status: orderStatus,
          });
          errorClientHandling(response);
          openSnackBar("La orden ha sido actualizada con éxito", "success");
        }
      }
      await revalidateServerTags("orders");
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
          <OrderForm isLoading={isLoading} error={error} />
        )}
      </form>
    </FormProvider>
  );
};

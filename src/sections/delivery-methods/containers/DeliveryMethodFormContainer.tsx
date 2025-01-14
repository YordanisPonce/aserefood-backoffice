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
import { createDeliveryMethodSchema } from "../utils/schema";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import {
  CreateDeliveryMethod,
  CreateDeliveryMethodDTO,
  StatesDeliveryMethods,
} from "@/lib/types/deliveryMethod";
import {
  createDeliveryMethod,
  getDeliveryMethod,
  updateDeliveryMethod,
} from "@/lib/services/deliveryMethods";
import { DeliveryMethodForm } from "../components/DeliveryMethodForm";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

export const DeliveryMethodFormContainer: FunctionComponent = () => {
  const {
    entityId: deliveryMethodId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const formOptions: UseFormProps<CreateDeliveryMethod> = {
    resolver: zodResolver(createDeliveryMethodSchema()),
    defaultValues: {
      name: undefined,
      cost: 1,
      estimatedArrivalTime: undefined,
      isFree: StatesDeliveryMethods.PAYMENT,
      minimalDeliveryPrice: 1,
      municipality: null,
      pickUpDirection: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateDeliveryMethod>(formOptions);
  const {
    formState: { errors, isValid },
  } = methods;

  const onSubmit = async ({
    name,
    cost,
    estimatedArrivalTime,
    isFree: state,
    minimalDeliveryPrice,
    municipality,
    pickUpDirection,
  }: CreateDeliveryMethod) => {
    setIsLoading(true);
    try {
      const createDeliveryMethodDTO: CreateDeliveryMethodDTO = {
        name: name,
        cost,
        isFree: state === StatesDeliveryMethods.FREE ? true : false,
        estimatedArrivalTime,
        minimalDeliveryPrice,
        municipalityId: municipality?.id ?? 0,
        pickUpDirection,
      };
      if (!deliveryMethodId) {
        await createDeliveryMethod(createDeliveryMethodDTO);
        openSnackBar("Método de entrega creado con éxito", "success");
      } else {
        await updateDeliveryMethod(deliveryMethodId, createDeliveryMethodDTO);
        openSnackBar(
          `Método de entrega con identificador ${deliveryMethodId} actualizado con éxito`,
          "success"
        );
      }

      await revalidateServerTags("delivery-methods");
      handleCloseModal();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setError(error.message);
        openSnackBar(error.message, "error");
      }
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
          isFree: deliveryMethod.isFree
            ? StatesDeliveryMethods.FREE
            : StatesDeliveryMethods.PAYMENT,
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
  }, [deliveryMethodId, updateForm]);

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
          <DeliveryMethodForm
            isLoading={isLoading}
            isUpdate={deliveryMethodId !== null}
            error={error}
          />
        )}
      </form>
    </FormProvider>
  );
};

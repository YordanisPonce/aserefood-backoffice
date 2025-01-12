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
import {
  CreateInventoryEntry,
  UpdateInventoryEntry,
} from "@/lib/types/inventory";
import {
  createInventoryEntry,
  getInventoryEntry,
  updateInventoryEntry,
} from "@/lib/services/inventory";
import {
  createInventoryEntrySchema,
  updateInventoryEntrySchema,
} from "../utils/schema";
import { InventoryEntryForm } from "../components/InventoryEntryForm";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

export const InventoryEntryFormContainer: FunctionComponent = () => {
  const {
    entityId: inventoryEntryId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const formOptions: UseFormProps<CreateInventoryEntry | UpdateInventoryEntry> =
    {
      resolver: zodResolver(
        !inventoryEntryId
          ? createInventoryEntrySchema()
          : updateInventoryEntrySchema()
      ),
      defaultValues: !inventoryEntryId
        ? {
            quantity: 1,
            price: 1,
            product: null,
            zone: null,
          }
        : {
            quantity: 1,
            price: 1,
          },
      mode: "onSubmit",
      reValidateMode: "onChange",
    };

  const methods = useForm<CreateInventoryEntry | UpdateInventoryEntry>(
    formOptions
  );

  const onSubmit = async (
    inventoryEntry: CreateInventoryEntry | UpdateInventoryEntry
  ) => {
    setIsLoading(true);
    setError(undefined);
    try {
      if (!inventoryEntryId) {
        const { price, product, quantity, zone } =
          inventoryEntry as CreateInventoryEntry;
        await createInventoryEntry([
          {
            price,
            quantity,
            productId: product?.id ?? 0,
            zoneId: zone?.id ?? 0,
          },
        ]);
        openSnackBar("Entrada de inventario creada con éxito", "success");
      } else {
        const { price, quantity } = inventoryEntry as UpdateInventoryEntry;
        await updateInventoryEntry(inventoryEntryId, { price, quantity });
        openSnackBar(
          `Entrada de inventario con identificador ${inventoryEntryId} actualizada con éxito`,
          "success"
        );
      }
      await revalidateServerTags("inventory");
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
    async (inventoryEntryId: string) => {
      setLoadingData(true);
      try {
        const inventoryEntry = await getInventoryEntry(inventoryEntryId);
        methods.reset({
          price: inventoryEntry.price,
          quantity: inventoryEntry.quantity,
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
    if (inventoryEntryId) updateForm(inventoryEntryId);
  }, [inventoryEntryId, updateForm]);

  useEffect(() => {
    if (error && contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

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
          <InventoryEntryForm
            isLoading={isLoading}
            isUpdate={inventoryEntryId !== null}
            error={error}
          />
        )}
      </form>
    </FormProvider>
  );
};

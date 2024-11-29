"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";

import { revalidateServerTags } from "@/lib/utils/cache";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import useModal from "@/components/partials/Modal/hooks/useModal";
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

export const InventoryEntryFormContainer: FunctionComponent = () => {
  const { entityId: inventoryEntryId, handleCloseModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

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
      } else {
        const { price, quantity } = inventoryEntry as UpdateInventoryEntry;
        await updateInventoryEntry(inventoryEntryId, { price, quantity });
      }
      await revalidateServerTags("inventory");
      handleCloseModal();
    } catch (error) {
      console.log(error);
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
          <InventoryEntryForm
            isLoading={isLoading}
            isUpdate={inventoryEntryId !== null}
          />
        )}
      </form>
    </FormProvider>
  );
};

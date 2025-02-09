"use client";
import { getInventoryEntry } from "@/lib/services/inventory";
import { InventoryEntryDetails } from "@/lib/types/inventory";
import { useCallback, useEffect, useState } from "react";
interface Props {
  inventoryEntryId: string | null;
}
export default function useInventoryEntry({ inventoryEntryId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [inventoryEntry, setInventoryEntry] = useState<
    InventoryEntryDetails | undefined
  >(undefined);

  const fetchInventoryEntry = useCallback(async () => {
    if (inventoryEntryId) {
      setLoadingData(true);
      try {
        setInventoryEntry(await getInventoryEntry(inventoryEntryId));
        setError(undefined);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }
  }, [inventoryEntryId]);
  useEffect(() => {
    fetchInventoryEntry();
  }, [fetchInventoryEntry]);
  return { inventoryEntry, loadingData, error, fetchInventoryEntry };
}

"use client";
import { getPromotion } from "@/lib/services/promotions";
import { PromotionDetails } from "@/lib/types/promotion";
import { useEffect, useState } from "react";
interface Props {
  promotionId: string | null;
}
export default function usePromotion({ promotionId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [promotion, setPromotion] = useState<PromotionDetails | undefined>(
    undefined
  );

  const fetchPromotion = async () => {
    if (promotionId) {
      setLoadingData(true);
      try {
        setPromotion(await getPromotion(promotionId));
        setError(undefined);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    } else throw new Error("promotionId undefined");
  };
  useEffect(() => {
    fetchPromotion();
  }, []);
  return { promotion, loadingData, error, fetchPromotion };
}

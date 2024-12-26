"use client";
import { getContactInfo } from "@/lib/services/contactInfos";
import { ContactInfoDetails } from "@/lib/types/contactInfo";
import { useCallback, useEffect, useState } from "react";
interface Props {
  contactInfoId: string | null;
}
export default function useContactInfo({ contactInfoId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [contactInfo, setContactInfo] = useState<
    ContactInfoDetails | undefined
  >(undefined);

  const fetchContactInfo = useCallback(async () => {
    if (contactInfoId) {
      setLoadingData(true);
      try {
        setContactInfo(await getContactInfo(contactInfoId));
        setError(undefined);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    } else throw new Error("contactInfoId undefined");
  }, [contactInfoId]);
  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);
  return { contactInfo, loadingData, error, fetchContactInfo };
}

"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import { getContactInfos } from "@/lib/services/contactInfos";
import { ContactInfo, ContactInfosFilters } from "@/lib/types/contactInfo";
import useClientPagination from "@/sections/hooks/useClientPagination";

interface Props {
  userId: string | null;
  filters: ContactInfosFilters;
}

export default function useContactInfos({ userId, filters }: Props) {
  const isFirstRender = useRef(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [contactInfos, setContactInfos] = useState<ContactInfo[]>([]);
  const [searchParams, setSearchParams] = useState<ContactInfosFilters>({
    page: 1,
    pageSize: 10,
  });

  const {
    pagination,
    setPagination,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  } = useClientPagination({ setSearchParams: setSearchParams });

  const fetchContactInfos = useCallback(async () => {
    if (userId) {
      setLoadingData(true);
      setError(undefined);
      try {
        const { data, page, total } = await getContactInfos(
          searchParams,
          userId
        );
        setPagination((pagination) => ({ ...pagination, page, total }));
        setContactInfos(data);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }
  }, [searchParams, setPagination, userId]);

  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      search: filters.search,
      municipalityId: filters.municipalityId
        ? filters.municipalityId
        : undefined,
      provinceId: filters.provinceId ? filters.provinceId : undefined,
      page: 1,
    }));
  }, [filters]);

  useEffect(() => {
    const handler = debounce(() => {
      fetchContactInfos();
    }, 500);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchContactInfos();
    } else {
      handler();
    }
    return () => handler.cancel();
  }, [searchParams, fetchContactInfos]);

  return {
    contactInfos,
    loadingData,
    error,
    fetchContactInfos,
    pagination,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  };
}

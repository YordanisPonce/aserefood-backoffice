"use client";

import FetchingDataError from "@/components/common/errors/fetching-data-error-view";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return <FetchingDataError />;
}

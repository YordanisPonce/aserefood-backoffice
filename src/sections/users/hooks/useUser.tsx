"use client";
import { getUser } from "@/lib/services/user";
import { User } from "@/lib/types/users";
import { useCallback, useEffect, useState } from "react";
interface Props {
  userId: string | null;
}
export default function useUser({ userId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const fetchUser = useCallback(async () => {
    if (userId) {
      setLoadingData(true);
      try {
        setUser(await getUser(userId));
        setError(undefined);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }
  }, [userId]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return { user, loadingData, error, fetchUser };
}

"use client";
import { getAllUsers } from "@/lib/services/user";
import { User } from "@/lib/types/users";
import { useCallback, useEffect, useState } from "react";

export default function useAllUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      setUsers(await getAllUsers());
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, isLoading, error, fetchUsers };
}

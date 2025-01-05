"use client";
import { Role } from "@/lib/types/users";
import { useEffect, useState } from "react";

interface Props {
  role?: Role;
}

export default function useUsersRolesOptions({ role }: Props) {
  const usersRoles = [
    {
      value: 0,
      name: "Sin Filtros",
    },
    {
      value: 1,
      name: Role.Admin,
    },
    {
      value: 2,
      name: Role.Customer,
    },
  ];
  const [selectRole, setSelectRole] = useState(0);

  useEffect(() => {
    setSelectRole(role === undefined ? 0 : role === Role.Admin ? 1 : 2);
  }, [role]);
  return { usersRoles, selectRole };
}

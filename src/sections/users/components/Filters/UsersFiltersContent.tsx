import SelectInputFilter from "@/components/common/input/SelectInputFilter";
import { Box } from "@mui/material";
import React from "react";
import useUsersStatesOptions from "./hooks/useUsersStatesOptions";
import { Role, UsersFilters } from "@/lib/types/users";
import useUsersRolesOptions from "./hooks/useUsersRolesOptions";

interface Props {
  filters: UsersFilters;
  handleFilterChange: (filters: UsersFilters) => void;
}

export default function UsersFiltersContent({
  filters,
  handleFilterChange,
}: Props) {
  const { selectRole, usersRoles } = useUsersRolesOptions({
    role: filters.role,
  });
  const { selectState, usersStates } = useUsersStatesOptions({
    isActive: filters.isActive,
  });
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <SelectInputFilter
        value={selectRole}
        label="Rol"
        options={usersRoles}
        onChange={(e) => {
          const value = Number(e.target.value);
          handleFilterChange({
            role:
              value === 0
                ? undefined
                : value === 1
                ? Role.Admin
                : Role.Customer,
          });
        }}
      />

      <SelectInputFilter
        value={selectState}
        label="Estado de la cuenta"
        options={usersStates}
        onChange={(e) => {
          const value = Number(e.target.value);
          handleFilterChange({
            isActive: value === 0 ? undefined : value === 1 ? true : false,
          });
        }}
      />
    </Box>
  );
}

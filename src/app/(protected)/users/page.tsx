"use client";

import React from "react";
import { Container, useMediaQuery, Theme, Box } from "@mui/material";

import GenericTable, {
  Column,
} from "@/components/partials/GenericTable/GenericTable";
import useUsersFilters from "@/components/partials/UsersFilters/hooks/useUsersFilters";
import CardList from "@/components/partials/CardList/CardList";
import UserCard from "@/components/partials/CardList/UserCard/UserCard";
import AppBarSections from "@/components/partials/AppBarSections/AppBarSections";
import Filters from "@/components/partials/Filters/Filters";
import UsersFilters from "@/components/partials/UsersFilters/UsersFilters";
import useUsers, { User } from "@/components/hooks/useUsers";

const columns: Column<User>[] = [
  { id: "username", label: "Nombre de Usuario", numeric: false },
  { id: "email", label: "Email", numeric: false },
  { id: "name", label: "Nombre", numeric: false },
  { id: "lastnames", label: "Apellidos", numeric: false },
  { id: "role", label: "Rol", numeric: false },
  {
    id: "isActive",
    label: "Activa",
    numeric: false,
    bool: {
      // meaning
      true: "Activa",
      false: "No Activa",
    },
  },
  { id: "phoneNumber", label: "Número Telefónico", numeric: false },
];

export default function UserManagementPage() {
  const { filters, handleFilterChange, handleApply, handleReset } =
    useUsersFilters();
  const { users } = useUsers();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const filtersUsers = (
    <Filters
      contentFilters={
        <UsersFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      }
      handleApply={handleApply}
      handleReset={handleReset}
    />
  );

  return (
    <>
      <AppBarSections title="Gestión de Usuarios" />

      <Box  sx={{ mt: 4, maxWidth: "100%" }}>
        {isMobile ? (
          // Mobile View
          <CardList
            items={users}
            CardComponent={UserCard}
            onAddCard={() => {}}
            filters={filtersUsers}
          />
        ) : (
          // Desktop View
          <GenericTable
            columns={columns}
            rows={users}
            onRowEdit={(row) => console.log("Edit", row)}
            onRowDelete={(row) => console.log("Delete", row)}
            title="Usuarios"
            filters={filtersUsers}
          />
        )}
      </Box>
    </>
  );
}

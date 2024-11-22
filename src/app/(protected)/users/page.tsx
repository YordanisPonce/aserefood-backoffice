"use client";

import React from "react";
import { Container, useMediaQuery, Theme, Box } from "@mui/material";

import GenericTable from "@/components/partials/GenericTable/GenericTable";
import useUsersFilters from "@/components/partials/UsersFilters/hooks/useUsersFilters";
import CardList from "@/components/partials/CardList/CardList";
import UserCard from "@/components/partials/CardList/UserCard/UserCard";
import AppBarSections from "@/components/partials/AppBarSections/AppBarSections";
import Filters from "@/components/partials/Filters/Filters";
import UsersFilters from "@/components/partials/UsersFilters/UsersFilters";
import useUsers from "@/components/hooks/useUsers";
import { UserDTO } from "@/lib/dto/UserDTO";
import { Column } from "@/components/partials/GenericTable/types/Column";
import { TextColumn } from "@/components/partials/GenericTable/types/TextColumn";
import { BoolColumn } from "@/components/partials/GenericTable/types/BoolColumn";

const columns: Column<UserDTO>[] = [
  new TextColumn("username", "Nombre de Usuario"),
  new TextColumn("email", "Email"),
  new TextColumn("name", "Nombre"),
  new TextColumn("lastnames", "Apellidos"),
  new TextColumn("role", "Rol"),
  new BoolColumn("isActive", "Activa", false, "Activa", "No Activa"),
  new TextColumn("phoneNumber", "Número Telefónico"),
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

      <Box sx={{ mt: 4, maxWidth: "100%" }}>
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

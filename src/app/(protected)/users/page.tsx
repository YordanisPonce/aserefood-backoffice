import React from "react";
import { Paper } from "@mui/material";
import { UsersList } from "@/sections/users/components/UsersList";
import { getUsers } from "@/lib/services/user";
import { SearchParams } from "@/lib/types/pagination";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { AddUserContainer } from "@/sections/users/containers/AddUserContainer";

type UsersPageProps = {
  searchParams: SearchParams;
};

export default async function UserManagementPage({
  searchParams,
}: UsersPageProps) {
  const { data, page, total, pageSize } = await getUsers(searchParams);

  return (
    <Paper sx={{ p: 2 }}>
      <SectionHeader
        titleSection="Usuarios"
        titleButton="Crear Usuario"
        createAction="create-user"
      />
      <UsersList pagination={{ page, total, pageSize }} users={data} />
      <AddUserContainer currentModal={searchParams.currentModal} />
    </Paper>
  );
}

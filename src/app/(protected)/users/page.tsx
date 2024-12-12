import React from "react";
import { Paper } from "@mui/material";
import { UsersList } from "@/sections/users/components/UsersList";
import { getUsers } from "@/lib/services/user";
import { SearchParams } from "@/lib/types/pagination";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import Modal from "@/components/partials/Modal/Modal";
import { UserFormContainer } from "@/sections/users/containers/UserFormContainer";
import UserDetailsContainer from "@/sections/users/containers/UserDetailsContainer";
import DeleteEntityContainer from "@/components/containers/DeleteEntityContainer";

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
        createAction={modalTypes.users.form.name}
      />
      <UsersList pagination={{ page, total, pageSize }} users={data} />
      <Modal
        formPath={[modalTypes.users.form.name]}
        titleModal={modalTypes.users.form.title}
      >
        <UserFormContainer />
      </Modal>
      <Modal
        formPath={[modalTypes.users.details.name]}
        titleModal={modalTypes.users.details.title}
      >
        <UserDetailsContainer />
      </Modal>
      <Modal
        formPath={[modalTypes.users.delete.name]}
        titleModal={modalTypes.users.delete.title}
      >
        <DeleteEntityContainer
          message={modalTypes.users.delete.message}
          title={modalTypes.users.delete.subTitle}
        />
      </Modal>
    </Paper>
  );
}

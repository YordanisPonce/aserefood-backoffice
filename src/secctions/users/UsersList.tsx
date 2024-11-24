import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { Pagination } from "@/lib/types/pagination";
import { User } from "@/lib/types/users";
import { GridColDef } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type UserListProps = {
  users: User[];
  pagination: Pagination;
};

export const UsersList: FunctionComponent<UserListProps> = ({
  users,
  pagination,
}) => {
  const colDef: GridColDef<User>[] = [
    {
      field: "username",
      headerName: "Nombre de usuario",
      sortable: false,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      flex: 2,
    },
    {
      field: "name",
      headerName: "Nombre",
      sortable: false,
      flex: 2,
    },
    {
      field: "lastnames",
      headerName: "Apellidos",
      sortable: false,
      flex: 0.8,
    },
    {
      field: "role",
      headerName: "Rol",
      sortable: false,
      flex: 0.8,
    },
    {
      field: "isActive",
      headerName: "Activa?",
      sortable: false,
      flex: 0.8,
    },
    {
      field: "phoneNumber",
      headerName: "Número de Teléfono",
      sortable: false,
      flex: 0.8,
    },
  ];

  return (
    <RootDataGrid
      columns={colDef}
      data={users}
      pagination={pagination}
      disableSelection
    />
  );
};

import React from "react";
import { Box } from "@mui/material";
import { UsersList } from "@/secctions/users/UsersList";
import { getUsers } from "@/lib/services/user";
import { SearchParams } from "@/lib/types/pagination";

type UsersPageProps = {
  searchParams: SearchParams;
};

export default async function UserManagementPage({
  searchParams,
}: UsersPageProps) {
  const { data, page, total, pageSize } = await getUsers(searchParams);

  return (
    <Box sx={{ mt: 4, maxWidth: "100%" }}>
      <UsersList pagination={{ page, total, pageSize }} users={data} />
    </Box>
  );
}

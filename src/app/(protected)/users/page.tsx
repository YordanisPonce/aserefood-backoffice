import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { UsersList } from "@/sections/users/UsersList";
import { getUsers } from "@/lib/services/user";
import { SearchParams } from "@/lib/types/pagination";
import { Add as AddIcon } from "@mui/icons-material";

type UsersPageProps = {
  searchParams: SearchParams;
};

export default async function UserManagementPage({
  searchParams,
}: UsersPageProps) {
  const { data, page, total, pageSize } = await getUsers(searchParams);

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "row",
          mb: 2,
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          textTransform="capitalize"
          color="text.primary"
          fontWeight="700"
        >
          Usuarios
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Crear Usuario
        </Button>
      </Box>
      <UsersList pagination={{ page, total, pageSize }} users={data} />
    </Box>
  );
}

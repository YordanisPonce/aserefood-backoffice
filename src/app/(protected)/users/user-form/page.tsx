"use client";
import Form from "@/components/partials/Form/Form";
import UserForm from "@/components/partials/UserForm/UserForm";
import { Box, Button } from "@mui/material";
import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import Link from "next/link";
import { routes } from "@/lib/config/routes";

export default function UserFormPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button>
        <Link href={routes.users.path}>Volver a Gestión de Usuarios</Link>
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",

          padding: { xs: 1, sm: 2 },
        }}
      >
        <Form
          title="Registro de Usuario"
          icon={<PersonAddIcon sx={{ fontSize: 40, color: "white" }} />}
        >
          <UserForm />
        </Form>
      </Box>
    </Box>
  );
}

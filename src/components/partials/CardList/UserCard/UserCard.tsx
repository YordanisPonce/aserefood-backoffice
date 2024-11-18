"use client";
import { User } from "@/app/(protected)/users/page";
import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  data: User;
}

export default function UserCard({ data: user }: Props) {
  return (
    <Card key={user.username} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{`${user.name} ${user.lastnames}`}</Typography>
        <Typography color="text.secondary">{user.email}</Typography>
        <Typography variant="body2">Username: {user.username}</Typography>
        <Typography variant="body2">Role: {user.role}</Typography>
        <Typography variant="body2">Phone: {user.phoneNumber}</Typography>
        <Typography variant="body2">
          Status: {user.isActive ? "Active" : "Inactive"},{" "}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small" color="primary">
          <Edit />
        </IconButton>
        <IconButton size="small" color="error">
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}

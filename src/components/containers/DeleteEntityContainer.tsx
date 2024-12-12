"use client";
import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Warning } from "@mui/icons-material";
import React from "react";
import useModal from "../partials/Modal/hooks/useModal";
import useDeleteEntity from "@/lib/hooks/useDeleteEntity";

interface Props {
  title: string;
  message: string;
}

export default function DeleteEntityContainer({
  message,
  title,
}: Props) {
  const { entityId, handleCloseModal, currentModal } = useModal();
  const { deleteAction, isLoading, error } = useDeleteEntity({
    entityId,
    handleCloseModal,
    currentModal,
  });

  return (
    <>
      <DialogContent sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, sm: 3 }} sx={{ textAlign: "center" }}>
            <Warning sx={{ fontSize: 80, color: "warning.main" }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 9 }}>
            <Typography variant="h6" component="div" gutterBottom>
              {title}
            </Typography>
            <Alert
              severity="warning"
              sx={{ mt: 2, backgroundColor: "warning.lighter" }}
            >
              {message}
            </Alert>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, justifyContent: "flex-end", gap: 1 }}>
        <Button
          variant="outlined"
          onClick={handleCloseModal}
          sx={{ minWidth: 100 }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
          onClick={deleteAction}
          autoFocus
          sx={{ minWidth: 100 }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </>
  );
}

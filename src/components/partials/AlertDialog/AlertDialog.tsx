"use client";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useAlertDialog from "./hooks/useAlertDialog";

export type AltertDialogSeverity = "info" | "warning" | "error" | "success";

export default function AlertDialog() {
  const { data } = useAlertDialog();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data.message !== "") setOpen(true);
  }, [data]);

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Alerta</DialogTitle>
      <DialogContent>
        <Alert severity={data.severity}>{data.message}</Alert>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            data.action();
            setOpen(false);
          }}
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

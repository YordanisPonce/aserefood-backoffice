"use client";
import { useEffect, useState } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useSnackBar from "./hooks/useSnackBar";

export type SnackBarSeverity = "info" | "warning" | "error" | "success";

export default function AutohideSnackbar() {
  const { data } = useSnackBar();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data.message !== "") setOpen(true);
  }, [data]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getIcon = (severity: SnackBarSeverity) => {
    switch (severity) {
      case "info":
        return <InfoIcon />;
      case "warning":
        return <WarningIcon />;
      case "error":
        return <ErrorIcon />;
      case "success":
        return <CheckCircleIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={data.severity as SnackBarSeverity}
        variant="filled"
        icon={getIcon(data.severity as SnackBarSeverity)}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {data.message}
      </Alert>
    </Snackbar>
  );
}


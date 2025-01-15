import { SnackBarSeverity } from "@/components/partials/SnackBar/SnackBar";
import * as types from "./types";
import { AltertDialogSeverity } from "@/components/partials/AlertDialog/AlertDialog";

export type ToggleDrawer = {
  type: types.TOGGLE_DRAWER_OPEN;
  payload: boolean;
};

export type SnackBarOpen = {
  type: types.SNACKBAR_OPEN;
  payload: {
    message: string;
    severity: SnackBarSeverity;
  };
};

export type AlertDialogOpen = {
  type: types.ALERTDIALOG_OPEN;
  payload: {
    message: string;
    severity: AltertDialogSeverity;
    action: () => void;
  };
};

export type TAction = ToggleDrawer | SnackBarOpen | AlertDialogOpen;

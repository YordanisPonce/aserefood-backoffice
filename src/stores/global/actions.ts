import { SnackBarSeverity } from "@/components/partials/SnackBar/SnackBar";
import * as types from "./types";

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

export type TAction = ToggleDrawer | SnackBarOpen;

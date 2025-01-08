"use client"
import { useGlobalContext } from "@/stores/global";
import { SNACKBAR_OPEN } from "@/stores/global/types";
import { SnackBarSeverity } from "../SnackBar";

export default function useSnackBar() {
  const { state, dispatch } = useGlobalContext();

  function openSnackBar(message: string, severity: SnackBarSeverity) {
    dispatch({
      type: SNACKBAR_OPEN,
      payload: {
        message,
        severity,
      },
    });
  }
  return { data: state.snackBarOpen, openSnackBar };
}

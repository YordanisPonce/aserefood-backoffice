"use client";
import { useGlobalContext } from "@/stores/global";
import { ALERTDIALOG_OPEN } from "@/stores/global/types";
import { AltertDialogSeverity } from "../AlertDialog";

export default function useAlertDialog() {
  const { state, dispatch } = useGlobalContext();

  function openAlertDialog(
    message: string,
    severity: AltertDialogSeverity,
    action: () => void
  ) {
    dispatch({
      type: ALERTDIALOG_OPEN,
      payload: {
        message,
        severity,
        action,
      },
    });
  }
  return { data: state.alertDialogOpen, openAlertDialog };
}

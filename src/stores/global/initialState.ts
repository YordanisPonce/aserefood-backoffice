import { AltertDialogSeverity } from "@/components/partials/AlertDialog/AlertDialog";
import { SnackBarSeverity } from "@/components/partials/SnackBar/SnackBar";

export interface IGlobalState {
  isDrawerOpen: boolean;
  snackBarOpen: {
    message: string;
    severity: SnackBarSeverity;
  };
  alertDialogOpen: {
    message: string;
    severity: AltertDialogSeverity;
    action: () => void;
  };
}

const initialState: IGlobalState = {
  isDrawerOpen: false,
  snackBarOpen: {
    message: "",
    severity: "success",
  },
  alertDialogOpen: {
    message: "",
    severity: "success",
    action: () => {},
  },
};

export default initialState;

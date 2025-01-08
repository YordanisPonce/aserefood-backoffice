import { SnackBarSeverity } from "@/components/partials/SnackBar/SnackBar";

export interface IGlobalState {
  isDrawerOpen: boolean;
  snackBarOpen: {
    message: string;
    severity: SnackBarSeverity;
  };
}

const initialState: IGlobalState = {
  isDrawerOpen: false,
  snackBarOpen: {
    message: "",
    severity: "success",
  },
};

export default initialState;

import * as types from "./types";

export type ToggleDrawer = {
  type: types.TOGGLE_DRAWER_OPEN;
  payload: boolean;
};

export type TAction = ToggleDrawer;

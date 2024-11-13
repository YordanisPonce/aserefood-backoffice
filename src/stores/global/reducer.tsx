import { TAction } from "./actions";
import { IGlobalState } from "./initialState";

const reducer = (state: IGlobalState, action: TAction): IGlobalState => {
  const { type } = action;
  switch (type) {
    case "TOGGLE_DRAWER_OPEN": {
      return {
        ...state,
        isDrawerOpen: action.payload,
      };
    }

    default:
      return state;
  }
};
export default reducer;

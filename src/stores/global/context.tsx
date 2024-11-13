import { Dispatch, createContext } from "react";
import { TAction } from "./actions";
import initialState, { IGlobalState } from "./initialState";

interface IContextProps {
  state: IGlobalState;
  dispatch: Dispatch<TAction>;
}
const GlobalContext = createContext<IContextProps>({
  state: initialState,
  dispatch: () => {},
});
export default GlobalContext;

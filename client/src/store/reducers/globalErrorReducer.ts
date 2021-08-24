import { GlobalErrorWasThrownAction } from "store/actions/globalErrorActions";
import { GlobalErrorActionType } from "store/actions/actionTypes";
import BaseAction from "store/actions/BaseAction";

export interface GlobalErrorStoreState {
  error: string | null;
}

export const initialState: GlobalErrorStoreState = {
  error: null,
};

const globalError = (
  state: GlobalErrorStoreState = initialState,
  action: BaseAction<GlobalErrorActionType>
): GlobalErrorStoreState => {
  switch (action.type) {
    case GlobalErrorActionType.ERROR_WAS_THROWN:
      return {
        ...state,
        error: (action as GlobalErrorWasThrownAction).error,
      };
    default:
      return state;
  }
};

export default globalError;

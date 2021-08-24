import { GlobalErrorActionType } from "./actionTypes";
import BaseAction from "./BaseAction";
import GlobalErrorsModel from "models/GlobalErrorModel";
import store from "store";

export interface GlobalErrorWasThrownAction
  extends BaseAction<GlobalErrorActionType> {
  error: string | null;
}

export const globalErrorWasThrown = (
  payload: string | null
): GlobalErrorWasThrownAction => ({
  error: payload,
  type: GlobalErrorActionType.ERROR_WAS_THROWN,
});

export interface GlobalErrorActionArgs {
  error: string;
}

export function setError(args: GlobalErrorActionArgs): (dispatch: any) => void {
  return async (dispatch) => {
    dispatch(globalErrorWasThrown(args.error));
  };
}
export function clearError(): (dispatch: any) => void {
  return async (dispatch) => {
    dispatch(globalErrorWasThrown(null));
  };
}

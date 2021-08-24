import {
  ConfirmEmailHasErroredAction,
  ConfirmEmailIsLoadingAction,
  ConfirmEmailSuccessAction,
} from "store/actions/confirmEmailActions";

import BaseAction from "store/actions/BaseAction";
import { ConfirmEmailActionType } from "store/actions/actionTypes";
import ConfirmEmailModel from "models/ConfirmEmailModel";

export interface ConfirmEmailStoreState {
  eMail: ConfirmEmailModel;
  isLoading: boolean;
  error: string | null;
}

export const initialState: ConfirmEmailStoreState = {
  eMail: {
    createdAt: "",
  },
  isLoading: false,
  error: null,
};
const confirmEmail = (
  state: ConfirmEmailStoreState = initialState,
  action: BaseAction<ConfirmEmailActionType>
): ConfirmEmailStoreState => {
  switch (action.type) {
    case ConfirmEmailActionType.CONFIRM_EMAIL_HAS_ERRORED:
      return {
        ...state,
        error: (action as ConfirmEmailHasErroredAction).error,
      };
    case ConfirmEmailActionType.CONFIRM_EMAIL_IS_LOADING:
      return {
        ...state,
        isLoading: (action as ConfirmEmailIsLoadingAction).isLoading,
      };
    case ConfirmEmailActionType.CONFIRM_EMAIL_HAS_SUCCESS:
      return {
        ...state,
        eMail: (action as ConfirmEmailSuccessAction).eMail,
      };
    default:
      return state;
  }
};

export default confirmEmail;

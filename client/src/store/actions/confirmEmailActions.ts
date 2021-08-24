import BaseAction from "./BaseAction";
import store from "store";
import * as emailService from "services/email.service";
import ConfirmEmailModel from "models/ConfirmEmailModel";
import CreateProjectModel from "models/CreateProjectModel";
import { createProjectOnboardingGoNext } from "./createProjectOnboardingAction";
import { ConfirmEmailActionType } from "./actionTypes";
import { updateProject } from "./createProjectActions";

//FIXME: Ivan -> Error handling possible like this?
export interface ConfirmEmailHasErroredAction
  extends BaseAction<ConfirmEmailActionType> {
  error: string | null;
}

const confirmEmailHasErrored = (
  payload: string | null
): ConfirmEmailHasErroredAction => ({
  error: payload,
  type: ConfirmEmailActionType.CONFIRM_EMAIL_HAS_ERRORED,
});

export interface ConfirmEmailIsLoadingAction
  extends BaseAction<ConfirmEmailActionType> {
  isLoading: boolean;
}

const confirmEmailIsLoading = (
  payload: boolean
): ConfirmEmailIsLoadingAction => ({
  isLoading: payload,
  type: ConfirmEmailActionType.CONFIRM_EMAIL_IS_LOADING,
});

export interface ConfirmEmailSuccessAction
  extends BaseAction<ConfirmEmailActionType> {
  eMail: ConfirmEmailModel;
}

const confirmEmailSuccess = (
  eMail: ConfirmEmailModel
): ConfirmEmailSuccessAction => ({
  eMail,
  type: ConfirmEmailActionType.CONFIRM_EMAIL_HAS_SUCCESS,
});

export interface ConfirmEmailActionArgs {
  mailToken: string;
  mailCode: number;
}

const eMailNetworkRequest = async (data: any) => {
  const res: any = await emailService.eMailConfirmation(data);
  return res;
};

export function confirmEmail(
  args: ConfirmEmailActionArgs
): (dispatch: any) => void {
  return async (dispatch) => {
    dispatch(confirmEmailHasErrored(null));
    dispatch(confirmEmailIsLoading(true));
    const model: emailService.eMailData = {
      mailToken: args.mailToken,
      mailCode: args.mailCode,
    };

    try {
      const res: any = await eMailNetworkRequest(model);
      if (res.response) {
        dispatch(confirmEmailHasErrored(res.response.data.error));
        dispatch(confirmEmailIsLoading(false));
        return;
      } else if (res.request) {
        dispatch(confirmEmailHasErrored("Network Error"));
        dispatch(confirmEmailIsLoading(false));
        return;
      }
      const eMail: ConfirmEmailModel = {
        createdAt: res.createdAt,
      };
      let project: CreateProjectModel = store.getState().createProject.project;
      project.adminLink = res.project.projectLinks[1].link;
      dispatch(confirmEmailIsLoading(false));
      dispatch(confirmEmailSuccess(eMail as ConfirmEmailModel));
      updateProject(project as CreateProjectModel);
      dispatch(createProjectOnboardingGoNext());
    } catch (err) {
      dispatch(confirmEmailIsLoading(false));
      return err;
    }
  };
}

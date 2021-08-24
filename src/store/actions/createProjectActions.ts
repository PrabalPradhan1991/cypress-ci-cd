import * as ProjectService from "services/project.service";
import { CreateProjectActionType } from "./actionTypes";
import BaseAction from "./BaseAction";
import CreateProjectModel from "models/CreateProjectModel";
import { createProjectOnboardingGoNext } from "./createProjectOnboardingAction";

export interface CreateProjectHasErroredAction
  extends BaseAction<CreateProjectActionType> {
  hasErrored: boolean;
}

const createProjectHasErrored = (
  payload: boolean
): CreateProjectHasErroredAction => ({
  hasErrored: payload,
  type: CreateProjectActionType.CREATE_PROJECT_HAS_ERRORED,
});

export interface CreateProjectIsLoadingAction
  extends BaseAction<CreateProjectActionType> {
  isLoading: boolean;
}

const createProjectIsLoading = (
  payload: boolean
): CreateProjectIsLoadingAction => ({
  isLoading: payload,
  type: CreateProjectActionType.CREATE_PROJECT_IS_LOADING,
});

export interface CreateProjectSuccessAction
  extends BaseAction<CreateProjectActionType> {
  project: CreateProjectModel;
}

const createProjectSuccess = (
  project: CreateProjectModel
): CreateProjectSuccessAction => ({
  project,
  type: CreateProjectActionType.CREATE_PROJECT_HAS_SUCCESS,
});

export const clearProject = (): BaseAction<CreateProjectActionType> => ({
  type: CreateProjectActionType.CLEAR_PROJECT,
});

export interface CreateProjectActionArgs {
  companyName: string;
  projectName: string;
  username: string;
  email: string;
}

const mockNetworkRequest: any = async (data: any) => {
  // Pause for 3 seconds then return
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const res: any = await ProjectService.postProject(data);
  return res.data;
};

export function createProject(
  args: CreateProjectActionArgs
): (dispatch: any) => void {
  return async (dispatch) => {
    dispatch(createProjectHasErrored(false));
    dispatch(createProjectIsLoading(true));
    const model: ProjectService.ProjectData = {
      companyName: args.companyName,
      projectName: args.projectName,
      username: args.username,
      email: args.email,
    };
    try {
      // Mock api call to create a project
      const res: any = await mockNetworkRequest(model);
      const project: CreateProjectModel = {
        id: res.id,
        companyName: res.companyName,
        projectName: res.projectName,
        username: res.username,
        email: res.email,
        mailToken: res.emailToken.mailToken,
        adminLink: "",
      };
      dispatch(createProjectIsLoading(false));
      dispatch(createProjectSuccess(project as CreateProjectModel));
      dispatch(createProjectOnboardingGoNext());
    } catch (err) {
      dispatch(createProjectHasErrored(true));
      dispatch(createProjectIsLoading(false));
      return err;
    }
  };
}

export function updateProject(
  project: CreateProjectModel
): (dispatch: any) => void {
  return (dispatch) => {
    dispatch(createProjectSuccess(project));
  };
}

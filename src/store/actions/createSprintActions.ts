import BaseAction from "./BaseAction";
import store from "store";
import * as sprintService from "services/sprint.service";
import CreateSprintModel from "models/CreateSprintModel";
import { createProjectOnboardingGoNext } from "./createProjectOnboardingAction";
import { CreateSprintActionType } from "./actionTypes";
import history from "router-history";

export interface CreateSprintHasErroredAction
  extends BaseAction<CreateSprintActionType> {
  hasErrored: boolean;
}

const createSprintHasErrored = (
  payload: boolean
): CreateSprintHasErroredAction => ({
  hasErrored: payload,
  type: CreateSprintActionType.CREATE_SPRINT_HAS_ERRORED,
});

export interface CreateSprintIsLoadingAction
  extends BaseAction<CreateSprintActionType> {
  isLoading: boolean;
}

const createSprintIsLoading = (
  payload: boolean
): CreateSprintIsLoadingAction => ({
  isLoading: payload,
  type: CreateSprintActionType.CREATE_SPRINT_IS_LOADING,
});

export interface CreateSprintSuccessAction
  extends BaseAction<CreateSprintActionType> {
  sprint: CreateSprintModel;
}

const createSprintSuccess = (
  sprint: CreateSprintModel
): CreateSprintSuccessAction => ({
  sprint,
  type: CreateSprintActionType.CREATE_SPRINT_HAS_SUCCESS,
});

export const clearSprint = (): BaseAction<CreateSprintActionType> => ({
  type: CreateSprintActionType.CLEAR_SPRINT,
});

export interface CreateSprintActionArgs {
  intervalTime: { label: string; value: number };
  sprintStartDate: Date;
  projectId: number | null;
  mailToken: string;
}

const mockNetworkRequest = async (data: any) => {
  // Pause for 3 seconds then return
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const res: any = await sprintService.postSprint(data);
  return res.data;
};

const getProjectPath = (): string => {
  const adminLink: string = store.getState().createProject.project.adminLink;
  const projectId: string = String(store.getState().createProject.project.id);
  const projectPath: string = `/project/link/${projectId}?projectLink=${adminLink}`;
  return projectPath;
};

export function createSprint(
  args: CreateSprintActionArgs
): (dispatch: any) => void {
  return async (dispatch) => {
    dispatch(createSprintHasErrored(false));
    dispatch(createSprintIsLoading(true));
    const model: sprintService.SprintData = {
      sprintInterval: args.intervalTime,
      sprintStart: args.sprintStartDate,
      projectId: args.projectId,
      mailToken: args.mailToken,
    };
    try {
      // Mock api call to create a project
      const res: any = await mockNetworkRequest(model);
      const sprint: CreateSprintModel = {
        intervalTime: res.sprints[res.sprints.length - 1].intervalTime,
        sprintStartDate: res.sprints[res.sprints.length - 1].sprintDate,
      };

      dispatch(createSprintIsLoading(false));
      dispatch(createSprintSuccess(sprint as CreateSprintModel));
      dispatch(createProjectOnboardingGoNext());
      // history.push(getProjectPath());
    } catch (err) {
      dispatch(createSprintHasErrored(true));
      return err;
    }
  };
}

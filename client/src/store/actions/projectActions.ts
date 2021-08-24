import BaseAction from "./BaseAction";
import store from "store";
import * as ProjectModel from "models/ProjectModel";
import * as ProjectService from "services/project.service";
import * as UserService from "services/user.service";
import * as SprintService from "services/sprint.service";
import { ProjectActionType } from "./actionTypes";
import * as PreferenceService from "services/preference.service";
import { CapaContributionResponse } from "models/ResponseModel";

import { EventBus } from "Event";
export interface projectHasErroredAction extends BaseAction<ProjectActionType> {
  hasErrored: boolean;
}

const projectHasErrored = (payload: boolean): projectHasErroredAction => ({
  hasErrored: payload,
  type: ProjectActionType.PROJECT_HAS_ERRORED,
});

export interface projectIsLoadingAction extends BaseAction<ProjectActionType> {
  isLoading: boolean;
}
export const projectIsLoading = (payload: boolean): projectIsLoadingAction => ({
  isLoading: payload,
  type: ProjectActionType.PROJECT_IS_LOADING,
});

export interface projectHasSuccessAction extends BaseAction<ProjectActionType> {
  project: ProjectModel.Project;
}
const projectHasSuccess = (
  project: ProjectModel.Project
): projectHasSuccessAction => ({
  project,
  type: ProjectActionType.PROJECT_HAS_SUCCESS,
});

export interface projectPreferenceHasSuccessAction
  extends BaseAction<ProjectActionType> {
  user2projects: ProjectModel.User2projects[];
}
const projectPreferenceHasSuccess = (
  user2projects: ProjectModel.User2projects[]
): projectPreferenceHasSuccessAction => ({
  user2projects,
  type: ProjectActionType.PROJECT_PREFERENCE_FETCHED,
});

export interface GetProjectActionArgs {
  projectLink: string;
  projectId: number;
}

const getApiProject: any = async (args: GetProjectActionArgs) => {
  const serviceArgs: ProjectService.getProjectArgs = {
    projectLink: args.projectLink,
    projectId: args.projectId,
  };
  const res: any = await ProjectService.getProject(serviceArgs);
  return res.data;
};
export function getProject(
  args: GetProjectActionArgs
): (dispatch: any) => void {
  return async (dispatch) => {
    dispatch(projectHasErrored(false));
    dispatch(projectIsLoading(true));
    try {
      const res: any = await getApiProject(args);

      // find the relevant project link of the user from response
      const link = res.projectLinks.find((item: any) => {
        return item.link === args.projectLink;
      });

      const projectLink: ProjectModel.ProjectLink = link;

      let project: ProjectModel.Project = {
        id: res.id,
        users: res.user2projects,
        companyName: res.companyName,
        projectName: res.projectName,
        sprints: res.sprints,
        projectLink: projectLink,
      };

      dispatch(projectHasSuccess(project as ProjectModel.Project));
      dispatch(projectIsLoading(false));
    } catch (err) {
      dispatch(projectHasErrored(true));
      dispatch(projectIsLoading(false));
      return err;
    }
  };
}

export interface AddUserActionArgs {
  userData: UserService.UserData;
}

const postUser: any = async (args: AddUserActionArgs) => {
  const res: any = await UserService.postUser(args.userData);
  return res.data;
};

export function addUser(args: AddUserActionArgs): (dispatch: any) => void {
  return async (dispatch) => {
    dispatch(projectHasErrored(false));
    dispatch(projectIsLoading(true));

    try {
      const res: any = await postUser(args);

      let project: ProjectModel.Project = {
        ...store.getState().project.project,
      };

      project.users = res.user2projects;

      dispatch(projectHasSuccess(project as ProjectModel.Project));
      dispatch(projectIsLoading(false));
    } catch (err) {
      dispatch(projectIsLoading(false));
      return err;
    }
  };
}

export const updateSprint = async (
  sprintId: number,
  projectLink: string,
  args: SprintService.addSprintInfoInterface
) => {
  const project: ProjectModel.Project = {
    ...store.getState().project.project,
  };

  const newSprintData = await SprintService?.addSprintInfo(
    sprintId,
    projectLink,
    args
  );

  const index = project?.sprints?.findIndex((el: any) => el?.id === sprintId);

  if (index !== 0 && !index) {
    return projectHasSuccess(project as ProjectModel.Project);
  }
  project.sprints[index] = newSprintData;
  return projectHasSuccess(project as ProjectModel.Project);
};

export const editUser = async (args: UserService.UserInfo) => {
  const project: ProjectModel.Project = {
    ...store.getState().project.project,
  };
  const projectLink = project.projectLink.link;

  try {
    await UserService.editTeamMember({ projectLink, ...args });
    const index = project?.users?.findIndex((e: any) => e?.id === args?.userId);
    const updatedUser = { ...project?.users?.[index] };

    if (updatedUser?.user?.username) {
      updatedUser.user.username = args?.username;
      updatedUser.role.projectRole = args?.role;
    }
    project.users[index] = { ...updatedUser };
    return projectHasSuccess(project as ProjectModel.Project);
  } catch (err) {
    throw err;
  }
};

const updatePreferences: any = async (
  args: PreferenceService.PreferenceDataArgs
): Promise<CapaContributionResponse> => {
  const serviceArgs: PreferenceService.PreferenceDataArgs = {
    projectId: args?.projectId,
    sprintId: args?.sprintId,
    projectLink: args?.projectLink,
    userId: args?.userId,
    relevant: args?.relevant,
  };
  const result: CapaContributionResponse =
    await PreferenceService.updateCapaContributionOfProject(serviceArgs);
  return result;
};

export function updateProjectCalculationPreferences(
  args: PreferenceService.PreferenceDataArgs
): (dispatch: any) => void {
  return async (dispatch) => {
    dispatch(projectHasErrored(false));
    try {
      await updatePreferences(args);
      const project = store.getState()?.project?.project;

      // update the project state to include the latest change in users sprint contribution value
      const res: any = await getApiProject({
        projectId: project?.id,
        projectLink: project?.projectLink?.link,
      });
      // find the relevant project link of the user from response
      const link = res.projectLinks.find((item: any) => {
        return item.link === args.projectLink;
      });

      const projectLink: ProjectModel.ProjectLink = link;

      const updatedProject: ProjectModel.Project = {
        id: res.id,
        users: res.user2projects,
        companyName: res.companyName,
        projectName: res.projectName,
        sprints: res.sprints,
        projectLink: projectLink,
      };

      dispatch(projectHasSuccess(updatedProject as ProjectModel.Project));
      // @FIXME TEMP FIX
      // fetch/update the sprint capacity of that sprint
      // since those functions are attached to event bus
      // emit that event with the arguments
      // add all the slots and sprints data in redux store
      EventBus.emit(`${project?.projectName}-sprint${args?.sprintId}`, {
        sprintId: args?.sprintId,
        projectLink: args?.projectLink,
      });
      dispatch(projectIsLoading(false));
    } catch (err) {
      dispatch(projectIsLoading(false));
      return err;
    }
  };
}

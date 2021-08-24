import { ProjectActionType } from "store/actions/actionTypes";
import {
  projectHasErroredAction,
  projectHasSuccessAction,
  projectIsLoadingAction,
  projectPreferenceHasSuccessAction,
} from "store/actions/projectActions";
import BaseAction from "store/actions/BaseAction";
import * as ProjectModel from "models/ProjectModel";

export interface ProjectStoreState {
  project: ProjectModel.Project;
  hasErrored: boolean;
  isLoading: boolean;
}

export const initialState: ProjectStoreState = {
  project: {
    id: 0,
    users: [],
    companyName: "",
    projectName: "",
    sprints: [],
    projectLink: { id: -1, link: "", type: "" },
  },
  hasErrored: false,
  isLoading: true,
};

const project = (
  state: ProjectStoreState = initialState,
  action: BaseAction<ProjectActionType>
): ProjectStoreState => {
  switch (action.type) {
    case ProjectActionType.PROJECT_HAS_ERRORED:
      return {
        ...state,
        hasErrored: (action as projectHasErroredAction).hasErrored,
      };
    case ProjectActionType.PROJECT_IS_LOADING:
      return {
        ...state,
        isLoading: (action as projectIsLoadingAction).isLoading,
      };
    case ProjectActionType.PROJECT_HAS_SUCCESS:
      return {
        ...state,
        project: (action as projectHasSuccessAction).project,
      };
    case ProjectActionType.PROJECT_PREFERENCE_FETCHED:
      const prevState = { ...state };
      prevState.project.users = (
        action as projectPreferenceHasSuccessAction
      ).user2projects;
      return {
        ...prevState,
      };
    default:
      return state;
  }
};

export default project;

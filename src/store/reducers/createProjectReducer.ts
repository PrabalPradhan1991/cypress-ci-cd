import {
  CreateProjectHasErroredAction,
  CreateProjectIsLoadingAction,
  CreateProjectSuccessAction,
} from "store/actions/createProjectActions";
import BaseAction from "store/actions/BaseAction";
import { CreateProjectActionType } from "store/actions/actionTypes";
import CreateProjectModel from "models/CreateProjectModel";

export interface CreateProjectStoreState {
  project: CreateProjectModel;
  hasErrored: boolean;
  isLoading: boolean;
}

export const initialState: CreateProjectStoreState = {
  project: {
    id: null,
    companyName: "",
    projectName: "",
    username: "",
    email: "",
    mailToken: "",
    adminLink: "",
  },
  hasErrored: false,
  isLoading: false,
};

const createProject = (
  state: CreateProjectStoreState = initialState,
  action: BaseAction<CreateProjectActionType>
): CreateProjectStoreState => {
  switch (action.type) {
    case CreateProjectActionType.CREATE_PROJECT_HAS_ERRORED:
      return {
        ...state,
        hasErrored: (action as CreateProjectHasErroredAction).hasErrored,
      };
    case CreateProjectActionType.CREATE_PROJECT_IS_LOADING:
      return {
        ...state,
        isLoading: (action as CreateProjectIsLoadingAction).isLoading,
      };
    case CreateProjectActionType.CREATE_PROJECT_HAS_SUCCESS:
      return {
        ...state,
        project: (action as CreateProjectSuccessAction).project,
      };
    case CreateProjectActionType.CLEAR_PROJECT:
      return initialState;
    default:
      return state;
  }
};

export default createProject;

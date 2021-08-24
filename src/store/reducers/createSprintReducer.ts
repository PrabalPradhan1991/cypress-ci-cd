import {
  CreateSprintHasErroredAction,
  CreateSprintIsLoadingAction,
  CreateSprintSuccessAction,
} from "store/actions/createSprintActions";
import BaseAction from "store/actions/BaseAction";
import { CreateSprintActionType } from "store/actions/actionTypes";
import CreateSprintModel from "models/CreateSprintModel";

export interface CreateSprintStoreState {
  sprint: CreateSprintModel;
  hasErrored: boolean;
  isLoading: boolean;
}

export const initialState: CreateSprintStoreState = {
  sprint: {
    intervalTime: "",
    sprintStartDate: "",
  },
  hasErrored: false,
  isLoading: false,
};

const createSprint = (
  state: CreateSprintStoreState = initialState,
  action: BaseAction<CreateSprintActionType>
): CreateSprintStoreState => {
  switch (action.type) {
    case CreateSprintActionType.CREATE_SPRINT_HAS_ERRORED:
      return {
        ...state,
        hasErrored: (action as CreateSprintHasErroredAction).hasErrored,
      };
    case CreateSprintActionType.CREATE_SPRINT_IS_LOADING:
      return {
        ...state,
        isLoading: (action as CreateSprintIsLoadingAction).isLoading,
      };
    case CreateSprintActionType.CREATE_SPRINT_HAS_SUCCESS:
      return { ...state, sprint: (action as CreateSprintSuccessAction).sprint };
    case CreateSprintActionType.CLEAR_SPRINT:
      return initialState;
    default:
      return state;
  }
};

export default createSprint;

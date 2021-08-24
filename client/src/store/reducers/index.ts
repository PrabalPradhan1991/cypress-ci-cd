import { combineReducers } from "redux";
import createProject, {
  CreateProjectStoreState,
  initialState as createProjectInitialState,
} from "./createProjectReducer";
import createSprint, {
  CreateSprintStoreState,
  initialState as createSprintInitialState,
} from "./createSprintReducer";
import confirmEmail, {
  ConfirmEmailStoreState,
  initialState as confirmEmailInitialState,
} from "./confirmEmailReducer";
import createProjectOnboarding, {
  CreateProjectOnboardingStoreState,
  initialState as createProjectOnboardingInitialState,
} from "./createProjectOnboardingReducer";
import project, {
  ProjectStoreState,
  initialState as projectInitialState,
} from "./projectReducer";
import globalError, {
  GlobalErrorStoreState,
  initialState as globalErrorInitialState,
} from "./globalErrorReducer";
import locale, {
  localState,
  initialState as localeInitialState,
} from "./localeReducer";

export interface initialStoreInterface {
  createProject: CreateProjectStoreState;
  createSprint: CreateSprintStoreState;
  confirmEmail: ConfirmEmailStoreState;
  createProjectOnboarding: CreateProjectOnboardingStoreState;
  project: ProjectStoreState;
  globalError: GlobalErrorStoreState;
  locale: localState;
}

export const initialStoreState = {
  createProject: createProjectInitialState,
  createSprint: createSprintInitialState,
  confirmEmail: confirmEmailInitialState,
  createProjectOnboarding: createProjectOnboardingInitialState,
  project: projectInitialState,
  globalError: globalErrorInitialState,
  locale: localeInitialState,
};
export default combineReducers({
  createProject,
  createSprint,
  confirmEmail,
  createProjectOnboarding,
  project,
  globalError,
  locale,
});

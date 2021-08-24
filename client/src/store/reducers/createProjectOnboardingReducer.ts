import { CreateProjectOnboardingActionType } from "store/actions/actionTypes";
import {
  CreateProjectOnboardingNextAction,
  CreateProjectOnboardingPrevAction,
} from "store/actions/createProjectOnboardingAction";
import BaseAction from "store/actions/BaseAction";

export interface CreateProjectOnboardingStoreState {
  selectedIndex: number;
}

export const initialState: CreateProjectOnboardingStoreState = {
  selectedIndex: 0,
};

const createProjectOnboarding = (
  state: CreateProjectOnboardingStoreState = initialState,
  action: BaseAction<CreateProjectOnboardingActionType>
): CreateProjectOnboardingStoreState => {
  switch (action.type) {
    case CreateProjectOnboardingActionType.CREATE_PROJECT_ONBOARDING_NEXT:
      return {
        ...state,
        selectedIndex: (action as CreateProjectOnboardingNextAction).goNext
          ? state.selectedIndex + 1
          : state.selectedIndex,
      };
    case CreateProjectOnboardingActionType.CREATE_PROJECT_ONBOARDING_PREV:
      return {
        ...state,
        selectedIndex:
          (action as CreateProjectOnboardingPrevAction).goPrev &&
          state?.selectedIndex > 0
            ? state.selectedIndex - 1
            : state.selectedIndex,
      };
    default:
      return state;
  }
};

export default createProjectOnboarding;

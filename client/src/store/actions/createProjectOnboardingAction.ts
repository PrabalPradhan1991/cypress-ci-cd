import store from "store";
import { CreateProjectOnboardingActionType } from "./actionTypes";
import BaseAction from "./BaseAction";

export interface CreateProjectOnboardingNextAction
  extends BaseAction<CreateProjectOnboardingActionType> {
  goNext: boolean;
}

export interface CreateProjectOnboardingPrevAction
  extends BaseAction<CreateProjectOnboardingActionType> {
  goPrev: boolean;
}

const createProjectOnboardingNext = (
  payload: boolean
): CreateProjectOnboardingNextAction => ({
  goNext: payload,
  type: CreateProjectOnboardingActionType.CREATE_PROJECT_ONBOARDING_NEXT,
});

const createProjectOnboardingPrev = (
  payload: boolean
): CreateProjectOnboardingPrevAction => ({
  goPrev: payload,
  type: CreateProjectOnboardingActionType.CREATE_PROJECT_ONBOARDING_PREV,
});

export const createProjectOnboardingGoPrev = () => {
  return createProjectOnboardingPrev(true);
};

export const createProjectOnboardingGoNext = () => {
  return createProjectOnboardingNext(true);
};

// export function createProjectOnboardingGoNext(): (dispatch: any) => void {
//   return async (dispatch) => {
//     dispatch(createProjectOnboardingNext(true));
//   };
// }

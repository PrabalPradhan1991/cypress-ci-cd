import { LocaleActionType } from "./actionTypes";
import BaseAction from "./BaseAction";

export interface UpdateLocaleAction extends BaseAction<LocaleActionType> {
  language: string;
}

export const localeUpdate = (payload: string): UpdateLocaleAction => {
  return {
    language: payload,
    type: LocaleActionType.UPDATE_LOCALE,
  };
};

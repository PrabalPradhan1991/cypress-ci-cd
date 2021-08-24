import { UpdateLocaleAction } from "store/actions/localeActions";
import { LocaleActionType } from "store/actions/actionTypes";
import BaseAction from "store/actions/BaseAction";
import LocalizedStrings from "react-localization";
import english from "locales/en";
import deutsch from "locales/de";

export interface localState {
  language: string;
  strings: Record<string, string>;
}

export const strings: any = new LocalizedStrings({
  de: deutsch,
  en: english,
});

const DEFAULT_LOCALE = "de";

function getClientLanguagePreference(): string {
  return localStorage.getItem("locale") || DEFAULT_LOCALE;
}

function setClientLanguagePreference(locale: string): void {
  localStorage.setItem("locale", locale);
}

export const initialState: localState = {
  language: getClientLanguagePreference(),
  strings: strings,
};

const locale = (
  state: localState = initialState,
  action: BaseAction<LocaleActionType>
): localState => {
  switch (action.type) {
    case LocaleActionType.UPDATE_LOCALE:
      const locale: string = (action as UpdateLocaleAction).language;
      setClientLanguagePreference(locale);
      strings.setLanguage(locale);
      return {
        ...state,
        language: (action as UpdateLocaleAction).language,
      };
    default:
      return state;
  }
};

export default locale;

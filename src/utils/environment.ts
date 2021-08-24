import { ENVIRONMENT, ENV_TYPES } from "types/environment";

const APP_ENVIRONMENTS: ENVIRONMENT = {
  development: {
    API_BASE_URL:
      process.env.REACT_APP_API_BASE_URL ||
      "https://api.dev.app.capa.team/api/",
    PUBLIC_URL: process.env.REACT_APP_PUBLIC_URL,
  },
  staging: {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
    PUBLIC_URL: process.env.REACT_APP_PUBLIC_URL,
  },
  production: {
    API_BASE_URL:
      process.env.REACT_APP_API_BASE_URL ||
      "https://api.dev.app.capa.team/api/",
    PUBLIC_URL: process.env.REACT_APP_PUBLIC_URL,
  },
};

export const environment = {
  ...process.env,
  ...APP_ENVIRONMENTS[process.env.NODE_ENV as ENV_TYPES],
};

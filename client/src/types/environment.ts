export enum ENV_TYPES {
  DEVELOPMENT = "development",
  STAGING = "staging",
  PRODUCTION = "production",
}

export type ENVIRONMENT = Record<ENV_TYPES, any>;

export const DEFAULT_CONFIG = {
  API_URL: 'http://localhost:3000/graphql',
  BATCH_SIZE: 10,
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

export const FILE_PATHS = {
  ACCOUNTS_DIR: './data',
  LOGS_DIR: './logs',
  DEFAULT_ACCOUNTS_FILE: './data/accounts.json',
} as const;

export const ACCOUNT_DEFAULTS = {
  PREFIX: 'loadTest',
  PASSWORD: 'LoadTest123!',
} as const;

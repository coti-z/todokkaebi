export interface Account {
  index: number;
  userId: string;
  email: string;
  nickname: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  createdAt: string;
}

export interface CreateAccountInput {
  email: string;
  nickname: string;
  password: string;
}

export interface AccountCreationResult {
  accounts: Account[];
  errors: string[];

  startTime: number;
  endTime: number;
}

export interface AccountStatistics {
  totalAccounts: number;
  newlyCreated: number;

  failed: number;

  duration: number;

  averageSpeed: number;
}

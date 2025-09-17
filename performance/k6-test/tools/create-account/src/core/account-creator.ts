import { GraphQLClient } from '../graphql/client.ts';
import { mutations } from '../graphql/mutations.ts';
import {
  Account,
  AccountCreationResult,
  CreateAccountInput,
} from '../types/account-types.ts';
import { CreateUserResponse, LoginResponse } from '../types/graphql.types.ts';
import { Logger } from '../utils/logger.ts';
import pLimit from 'p-limit';
import { ProgressManager } from '../utils/progress-manager.ts';
export interface AccountCreatorOptions {
  apiUrl: string;
  batchSize: number;

  prefix: string;

  password: string;
}

export class AccountCreator {
  private client: GraphQLClient;
  private logger: Logger;

  constructor(private options: AccountCreatorOptions) {
    this.client = new GraphQLClient(options.apiUrl);
    this.logger = new Logger('AccountCreator');
  }

  async createSingleAccount(
    index: number,
    timestamp: number,
  ): Promise<Account> {
    const email = `${this.options.prefix}-${index}-${timestamp}@test.com`;
    const nickname = `${this.options.prefix}-user-${index}`;
    const password = this.options.password;

    this.logger.debug(`Creating account: ${email}`);

    try {
      const createResponse = await this.client.request<CreateUserResponse>(
        mutations.CREATE_USER,
        {
          input: {
            email,
            nickname,
            password,
          } as CreateAccountInput,
        },
      );

      if (!createResponse.data?.createUser?.success) {
        throw new Error(
          createResponse.data?.createUser?.message || 'User creation failed',
        );
      }
      const loginResponse = await this.client.request<LoginResponse>(
        mutations.LOGIN,
        {
          input: { email, password },
        },
      );

      if (!loginResponse.data?.basicLogin.success) {
        throw new Error(
          loginResponse.data?.basicLogin?.message || 'Login failed',
        );
      }

      const loginData = loginResponse.data.basicLogin.data!;
      this.logger.debug(`Account created successfully: ${email}`);

      return {
        index,
        userId: loginData.userId,
        email,
        nickname,
        password,
        accessToken: loginData.accessToken,
        refreshToken: loginData.refreshToken,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`Failed to create account ${index}: ${error}`);
      throw new Error(
        `Account ${index} creation failed: ${(error as Error).message}`,
      );
    }
  }

  async createBatch(
    count: number,
    startIndex: number = 0,
  ): Promise<AccountCreationResult> {
    const timestamp = Date.now();
    const limit = pLimit(this.options.batchSize);
    const progress = new ProgressManager('Creating accounts');

    progress.start(count);

    const startTime = Date.now();

    const promises = Array.from({ length: count }, (_, i) => {
      const index = startIndex + i;
      return limit(async () => {
        try {
          const account = await this.createSingleAccount(index, timestamp);
          progress.increment();
          return account;
        } catch (error) {
          const errorMessage = (error as Error).message;
          this.logger.error(`Account ${index} failed: ${errorMessage}`);
          progress.increment();
          return { error: errorMessage };
        }
      });
    });

    const results = await Promise.all(promises);
    
    const accounts: Account[] = [];
    const errors: string[] = [];
    
    results.forEach(result => {
      if (result && 'error' in result) {
        errors.push(result.error);
      } else if (result) {
        accounts.push(result);
      }
    });
    progress.stop();
    const endTime = Date.now();

    return {
      accounts: accounts.filter((a): a is Account => a !== null),
      errors,
      startTime,
      endTime,
    };
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.client.request(`{__typename}`);
      this.logger.info('API connection successful');
      return true;
    } catch (error) {
      this.logger.error(`API connection failed: ${error}`);
      return false;
    }
  }
}

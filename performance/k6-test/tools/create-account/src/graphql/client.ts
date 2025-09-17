import axios, { AxiosError, AxiosInstance } from 'axios';
import { Logger } from '../utils/logger.ts';
import { DEFAULT_CONFIG } from '../config/constants.ts';
import { GraphQLResponse } from '../types/graphql.types.ts';

export class GraphQLClient {
  private client: AxiosInstance;
  private logger: Logger;

  constructor(
    url: string = DEFAULT_CONFIG.API_URL,
    private authToken?: string,
  ) {
    this.logger = new Logger('GraphQLClient');
    this.client = axios.create({
      baseURL: url,
      headers: this.buildHeaders(),
      timeout: DEFAULT_CONFIG.TIMEOUT,
    });

    this.setupInterceptors();
  }

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }
  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      config => {
        this.logger.debug(
          `GraphQL Request: ${config.data?.query?.split('\n')[0]}`,
        );
        return config;
      },
      error => {
        this.logger.error('Request error:', error);
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      response => {
        if (response.data.errors) {
          this.logger.warn('GraphQL errors', response.data.errors);
        }
        return response;
      },
      error => {
        this.logger.error('Response error:', error);
        return Promise.reject(error);
      },
    );
  }

  async request<T = any>(
    query: string,
    variables: Record<string, any> = {},
    retries: number = DEFAULT_CONFIG.RETRY_ATTEMPTS,
  ): Promise<GraphQLResponse<T>> {
    try {
      const response = await this.client.post<GraphQLResponse<T>>('', {
        query,
        variables,
      });

      if (response.data.errors && response.data.errors.length > 0) {
        throw new Error(response.data.errors[0]?.message);
      }
      return response.data;
    } catch (error) {
      if (retries > 0 && this.isRetryAbleError(error)) {
        this.logger.warn(`Retrying... (${retries} attempts left)`);
        await this.delay(DEFAULT_CONFIG.RETRY_DELAY);
        return this.request(query, variables, retries - 1);
      }

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(
          `API Error: ${axiosError.response?.status} - ${axiosError.response?.statusText}`,
        );
      }
      throw error;
    }
  }

  private isRetryAbleError(error: any): boolean {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      return status === 429 || status === 503 || status === 504;
    }

    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    this.client.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

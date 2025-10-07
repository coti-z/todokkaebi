export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// 제네릭 헬퍼 타입
export type MutationResponse<T, K extends string> = {
  [P in K]: ApiResponse<T>;
};

export type HealthCheckResponse = { healthCheck: string };

export interface ErrorResponse {
  error: Array<{
    message: string;
    extensions?: {
      code: string;
      statusCode: number;
    };
  }>;
  data: null;
}

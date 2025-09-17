export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    extensions?: any;
  }>;
}

export interface CreateUserResponse {
  createUser: {
    success: boolean;
    message?: string;
    data?: {
      id: string;
      email: string;
      nickname: string;
      createdAt: string;
    };
  };
}

export interface LoginResponse {
  basicLogin: {
    success: boolean;
    message?: string;
    data?: {
      userId: string;
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface VerifyTokenResponse {
  me: {
    id: string;
    email: string;
  };
}

export interface DeleteUserResponse {
  deleteUser: {
    success: boolean;
    message?: string;
  };
}

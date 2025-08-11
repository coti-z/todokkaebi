import { ApiResponse } from '@libs/response';

export interface CreateTaskData {
  id: string;
  title: string;
  taskStatus: string;

  check: boolean;

  categoryId: string;
}

export interface DeleteTaskData {
  id: string;
}

export interface UpdateTaskData {
  id: string;
  title: string;
  taskStatus: string;
  categoryId: string;
}

export interface QueryTaskByIdData {
  id: string;
  title: string;
  taskStatus: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface QueryTasksByCategoryIdData {
  tasks: QueryTaskByIdData[];
}

export type CreateTaskResponse = {
  createTask: ApiResponse<CreateTaskData>;
};

export type DeleteTaskResponse = {
  deleteTask: ApiResponse<DeleteTaskData>;
};

export type UpdateTaskResponse = {
  updateTask: ApiResponse<UpdateTaskData>;
};

export type QueryTaskByIdResponse = {
  queryTaskById: ApiResponse<QueryTaskByIdData>;
};

export type QueryTasksByCategoryIdResponse = {
  queryTasksByCategoryId: ApiResponse<QueryTasksByCategoryIdData>;
};

import { ApiResponse } from '@libs/response';

export interface CreateProjectData {
  id: string;
  adminId: string;
  name: string;
}

export interface DeleteProjectData {
  id: string;
}

export interface UpdateProjectData {
  id: string;
  adminId: string;
  name: string;
}

export interface QueryProjectData {
  id: string;
  adminId: string;

  name: string;
  updatedAt: string;
  createdAt: string;
  memberships: any[];
  categories: any[];
  projectInvitations: any[];
}

export interface QueryProjectsData {
  projects: QueryProjectData[];
}

export type CreateProjectResponse = {
  createProject: ApiResponse<CreateProjectData>;
};
export type DeleteProjectResponse = {
  deleteProject: ApiResponse<DeleteProjectData>;
};

export type UpdateProjectResponse = {
  updateProject: ApiResponse<UpdateProjectData>;
};

export type QueryProjectResponse = {
  queryProject: ApiResponse<QueryProjectData>;
};

export type QueryProjectsResponse = {
  queryProjects: ApiResponse<QueryProjectsData>;
};

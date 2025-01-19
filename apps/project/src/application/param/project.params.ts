export interface ProjectParams {
  userId: string;
  projectId: string;
  name: string;
}
export type CreateProjectParam = Pick<ProjectParams, 'userId' | 'name'>;

export type DeleteProjectParam = Pick<ProjectParams, 'userId' | 'projectId'>;

export type UpdateProjectParam = Pick<
  ProjectParams,
  'userId' | 'name' | 'projectId'
>;

export type QueryProjectsParam = Pick<ProjectParams, 'userId'>;

export type QueryProjectParam = Pick<ProjectParams, 'projectId'>;

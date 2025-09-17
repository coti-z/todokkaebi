export enum MembershipRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

export class ProjectMembershipReadModel {
  id: string;

  projectId: string;

  userId: string;

  role: MembershipRole;

  updatedAt: Date;
  createdAt: Date;
}

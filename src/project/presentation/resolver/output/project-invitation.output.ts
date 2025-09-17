import { ObjectType } from '@nestjs/graphql';
import { ProjectInvitationType } from '../type/project-invitation.type';

@ObjectType()
export class CreateProjectInvitationOutput extends ProjectInvitationType {}

@ObjectType()
export class UpdateProjectInvitationOutput extends ProjectInvitationType {}

@ObjectType()
export class AcceptProjectInvitationOutput extends ProjectInvitationType {}

@ObjectType()
export class RejectProjectInvitationOutput extends ProjectInvitationType {}

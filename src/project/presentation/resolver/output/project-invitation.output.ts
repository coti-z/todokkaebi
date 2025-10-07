import { ObjectType } from '@nestjs/graphql';

import { ProjectInvitationType } from '@project/presentation/resolver/type/project-invitation.type';

@ObjectType()
export class CreateProjectInvitationOutput extends ProjectInvitationType {}

@ObjectType()
export class UpdateProjectInvitationOutput extends ProjectInvitationType {}

@ObjectType()
export class AcceptProjectInvitationOutput extends ProjectInvitationType {}

@ObjectType()
export class RejectProjectInvitationOutput extends ProjectInvitationType {}

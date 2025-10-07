import { ObjectType } from '@nestjs/graphql';

import { ApiResponseOf } from '@libs/response';

import {
  AcceptProjectInvitationOutput,
  CreateProjectInvitationOutput,
  RejectProjectInvitationOutput,
  UpdateProjectInvitationOutput,
} from '@project/presentation/resolver/output/project-invitation.output';

@ObjectType()
export class CreateProjectInvitationResponse extends ApiResponseOf(
  CreateProjectInvitationOutput,
) {}

@ObjectType()
export class UpdateProjectInvitationResponse extends ApiResponseOf(
  UpdateProjectInvitationOutput,
) {}

@ObjectType()
export class RejectProjectInvitationResponse extends ApiResponseOf(
  RejectProjectInvitationOutput,
) {}

@ObjectType()
export class AcceptProjectInvitationResponse extends ApiResponseOf(
  AcceptProjectInvitationOutput,
) {}

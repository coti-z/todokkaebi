import { ObjectType } from '@nestjs/graphql';
import {
  AcceptProjectInvitationOutput,
  CreateaProjectInvitationOutput,
  RejectProjectInvitationOutput,
  UpdateProjectInvitationOutput,
} from '../output/project-invitation.output';
import { ApiResponseOf } from '@libs/response';

@ObjectType()
export class CreateProjectInvitationResponse extends ApiResponseOf(
  CreateaProjectInvitationOutput,
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

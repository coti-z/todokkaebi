import { ApiResponseOf } from '@libs/response';
import { ObjectType } from '@nestjs/graphql';
import {
  CreateaProjectInvitationOutput,
  UpdateProjectInvitationOutput,
} from '../output/project-invitation.output';

@ObjectType()
export class CreateProjectInvitationResponse extends ApiResponseOf(
  CreateaProjectInvitationOutput,
) {}

@ObjectType()
export class UpdateProjectInvitationResponse extends ApiResponseOf(
  UpdateProjectInvitationOutput,
) {}

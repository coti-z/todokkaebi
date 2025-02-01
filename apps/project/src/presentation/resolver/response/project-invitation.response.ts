import { ApiResponseOf } from '@libs/response';
import { ObjectType } from '@nestjs/graphql';
import { CreateaProjectInvitationOutput } from '../output/project-invitation.output';

@ObjectType()
export class CreateProjectInvitationResponse extends ApiResponseOf(
  CreateaProjectInvitationOutput,
) {}

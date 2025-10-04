import { CommandBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectInvitationPresentationMapper } from '../mapper/project-invitation.presentation.mapper';
import {
  CreateProjectInvitationInput,
  UpdateProjectInvitationStatusInput,
} from './input/project-invitation.input';
import {
  AcceptProjectInvitationResponse,
  CreateProjectInvitationResponse,
  RejectProjectInvitationResponse,
  UpdateProjectInvitationResponse,
} from './response/project-invitation.response';
import { ProjectInvitationType } from './type/project-invitation.type';
import { ResponseManager } from '@libs/response';
import { RequestContextExtractor } from '@libs/exception';
import { UseGuards } from '@nestjs/common';
import { JwtAuthWithAccessTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-access-token.guard';
import { TokenInfo } from '@libs/decorators';
import { JwtPayloadWithToken } from '@libs/jwt';

@Resolver(() => ProjectInvitationType)
export class ProjectInvitationResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => CreateProjectInvitationResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async createProjectInvitation(
    @Args('input') input: CreateProjectInvitationInput,
    @TokenInfo() payload: JwtPayloadWithToken,
    @Context() gqlContext: any,
  ): Promise<CreateProjectInvitationResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command =
      ProjectInvitationPresentationMapper.createProjectInvitationInputToCommand(
        input,
        payload.userId,
        requestContext,
      );
    const result = await this.commandBus.execute(command);
    const output =
      ProjectInvitationPresentationMapper.readModelToCreateProjectInvitationOutput(
        result,
      );
    return ResponseManager.success(output);
  }

  @Mutation(() => UpdateProjectInvitationResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async updateProjectInvitationStatus(
    @Args('input') input: UpdateProjectInvitationStatusInput,
    @TokenInfo() payload: JwtPayloadWithToken,
    @Context() gqlContext: any,
  ): Promise<UpdateProjectInvitationResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command =
      ProjectInvitationPresentationMapper.updateProjectInvitationInputToCommand(
        input,
        payload.userId,
        requestContext,
      );
    const result = await this.commandBus.execute(command);
    const output =
      ProjectInvitationPresentationMapper.readModelToUpdateProjectInvitationOutput(
        result,
      );

    return ResponseManager.success(output);
  }
}

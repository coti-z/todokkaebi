import { CommandBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectInvitationPresentationMapper } from '../mapper/project-invitation.presentation.mapper';
import {
  AcceptProjectInvitationInput,
  CreateProjectInvitationInput,
  RejectProjectInvitationInput,
  UpdateProjectInvitationInput,
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
import { RateLimit, TokenInfo } from '@libs/decorators';
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
      ProjectInvitationPresentationMapper.entityToCreateProjectInvitationOutput(
        result,
      );
    return ResponseManager.success(output);
  }

  @Mutation(() => UpdateProjectInvitationResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async updateProjectInvitation(
    @Args('input') input: UpdateProjectInvitationInput,
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
      ProjectInvitationPresentationMapper.entityToUpdateProjectInvitationOutput(
        result,
      );

    return ResponseManager.success(output);
  }

  @Mutation(() => AcceptProjectInvitationResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async acceptProjectInvitation(
    @Args('input') input: AcceptProjectInvitationInput,
    @TokenInfo() payload: JwtPayloadWithToken,
    @Context() gqlContext: any,
  ): Promise<AcceptProjectInvitationResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);

    const command =
      ProjectInvitationPresentationMapper.acceptProjectInvitationInputToCommand(
        input,
        payload.userId,
        requestContext,
      );
    const result = await this.commandBus.execute(command);
    const output =
      ProjectInvitationPresentationMapper.entityToAcceptProjectInvitationOutput(
        result,
      );
    return ResponseManager.success(output);
  }

  @Mutation(() => RejectProjectInvitationResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async rejectProjectInvitation(
    @Args('input') input: RejectProjectInvitationInput,
    @TokenInfo() payload: JwtPayloadWithToken,
    @Context() gqlContext: any,
  ): Promise<RejectProjectInvitationResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command =
      ProjectInvitationPresentationMapper.rejectProjectInvitationInputToCommand(
        input,
        payload.userId,
        requestContext,
      );
    const result = await this.commandBus.execute(command);
    const output =
      ProjectInvitationPresentationMapper.entityToRejectProjectInvitationOutput(
        result,
      );
    return ResponseManager.success(output);
  }
}

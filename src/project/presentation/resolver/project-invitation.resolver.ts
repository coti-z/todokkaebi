import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { TokenInfo } from '@libs/decorators';
import { RequestContextExtractor } from '@libs/exception';
import { JwtPayloadWithToken } from '@libs/jwt';
import { ResponseManager } from '@libs/response';

import { JwtAuthWithAccessTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-access-token.guard';

import { ProjectInvitationPresentationMapper } from '@project/presentation/mapper/project-invitation.presentation.mapper';
import {
  CreateProjectInvitationInput,
  UpdateProjectInvitationStatusInput,
} from '@project/presentation/resolver/input/project-invitation.input';
import {
  CreateProjectInvitationResponse,
  UpdateProjectInvitationResponse,
} from '@project/presentation/resolver/response/project-invitation.response';
import { ProjectInvitationType } from '@project/presentation/resolver/type/project-invitation.type';

/**
 * project invitation Graphql Resolver
 *
 * @remarks
 * - API endpoints responsible
 * - createProjectInvitation/updateProjectInvitationStatus : Jwt authentication required
 * **Business rules:**
 * - New invitations start with PENDING status
 * - Self-invitation is prevented
 * - Duplicate active invitations are blocked
 */
@Resolver(() => ProjectInvitationType)
export class ProjectInvitationResolver {
  constructor(private readonly commandBus: CommandBus) {}

  // ─────────────────────────────────────
  // Mutation
  // ─────────────────────────────────────

  /**
   * Create new project invitation
   *
   * @remarks
   * **Security:**
   * - JWT authentication required
   * - Only OWNER can invite users to project
   * - Inviter cannot invite themselves (business rule)
   * - Invitation starts with PENDING status
   * - Duplicate active invitations are prevented
   */
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

  /**
   * Update invitation status (Accept/Project/Cancel)
   *
   * @remarks
   * - JWT authentication required
   * - Only the invitee can accept or reject invitation
   * - Only the inviter (OWNER) can cancel invitation
   * - Status transitions: PENDING -> ACCEPTED/REJECTED/CANCELLED
   * - Accepted invitations create project membership
   */
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

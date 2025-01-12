import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiResponseOfReissueTokenOutput,
  ReissueTokenOutput,
} from '@auth/presentation/resolver/dto/output/reissue-token.output';
import { ApiResponse, ResponseManager } from '@libs/response';
import { ReissueTokenInput } from '@auth/presentation/resolver/dto/input/reissue-token.input';
import { ReissueTokenCommand } from '@auth/application/commands/reissue-token.command';
import { HttpStatus } from '@nestjs/common';

@Resolver()
export class TokenResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => ApiResponseOfReissueTokenOutput)
  async reissueToken(
    @Args('input') input: ReissueTokenInput,
  ): Promise<ApiResponse<ReissueTokenOutput>> {
    const command = new ReissueTokenCommand(input.refreshToken);
    const data = await this.commandBus.execute(command);
    return ResponseManager.success(data, HttpStatus.OK);
  }
}

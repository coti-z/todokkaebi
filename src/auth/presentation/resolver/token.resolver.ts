import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiResponseOfReissueTokenOutput,
  ReissueTokenOutput,
} from '@auth/presentation/resolver/dto/output/reissue-token.output';
import { ReissueTokenInput } from '@auth/presentation/resolver/dto/input/reissue-token.input';
import { TokenPresentationMapper } from '@auth/presentation/mapper/token-presentation.mapper';
import { ApiResponse } from '@libs/response';
import { ResponseManager } from '@libs/response';

@Resolver()
export class TokenResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => ApiResponseOfReissueTokenOutput)
  async reissueToken(
    @Args('input') input: ReissueTokenInput,
  ): Promise<ApiResponse<ReissueTokenOutput>> {
    const command = TokenPresentationMapper.toReissueTokenCommand(input);
    const result = await this.commandBus.execute(command);
    const output = TokenPresentationMapper.resultToTokenReissueOutput(result);
    return ResponseManager.success(output);
  }
}

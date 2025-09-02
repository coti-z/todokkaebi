import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CategoryPresentationMapper } from '@project/presentation/mapper/category.presentation.mapper';
import {
  ChangeCategoryNameInput,
  CreateCategoryInput,
  DeleteCategoryInput,
  QueryCategoryByIdInput,
} from '@project/presentation/resolver/input/category.input';
import {
  ChangeCategoryNameResponse,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  QueryCategoryByIdResponse,
} from '@project/presentation/resolver/response/category.response';

import { TokenInfo } from '@libs/decorators';
import { JwtPayload } from '@libs/jwt';
import { ResponseManager } from '@libs/response';
import { JwtAuthWithAccessTokenGuard } from '@auth/infrastructure/guard/jwt-auth-with-access-token.guard';
import { RequestContextExtractor } from '@libs/exception';

@Resolver('category')
export class CategoryResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Mutation(() => CreateCategoryResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async createCategory(
    @Args('input') input: CreateCategoryInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<CreateCategoryResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);
    const command =
      CategoryPresentationMapper.createCategoryInputToCreateCategoryCommand(
        input,
        payload.userId,
        requestContext,
      );
    const result = await this.commandBus.execute(command);
    const output =
      CategoryPresentationMapper.entityToCreateCategoryOutput(result);
    return ResponseManager.success(output);
  }

  @Mutation(() => DeleteCategoryResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async deleteCategory(
    @Args('input') input: DeleteCategoryInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<DeleteCategoryResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);

    const command =
      CategoryPresentationMapper.deleteCategoryInputToDeleteCategoryCommand(
        input,
        payload.userId,
        requestContext,
      );
    const result = await this.commandBus.execute(command);
    const output =
      CategoryPresentationMapper.entityToDeleteCategoryOutput(result);
    return ResponseManager.success(output);
  }

  @Mutation(() => ChangeCategoryNameResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async changeCategoryName(
    @Args('input') input: ChangeCategoryNameInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<ChangeCategoryNameResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);

    const command =
      CategoryPresentationMapper.changeCategoryNameInputToUpdateCategoryCommand(
        input,
        payload.userId,
        requestContext,
      );
    const result = await this.commandBus.execute(command);
    const output =
      CategoryPresentationMapper.entityToUpdateCategoryOutput(result);
    return ResponseManager.success(output);
  }

  @Query(() => QueryCategoryByIdResponse)
  @UseGuards(JwtAuthWithAccessTokenGuard)
  async queryCategoryById(
    @Args('input') input: QueryCategoryByIdInput,
    @TokenInfo() payload: JwtPayload,
    @Context() gqlContext: any,
  ): Promise<QueryCategoryByIdResponse> {
    const requestContext =
      RequestContextExtractor.fromGraphQLContext(gqlContext);

    const query =
      CategoryPresentationMapper.queryCategoryByIdInputToQueryCategory(
        input,
        payload.userId,
        requestContext,
      );
    const result = await this.queryBus.execute(query);
    const output =
      CategoryPresentationMapper.entityToQueryCategoryByIdOutput(result);
    return ResponseManager.success(output);
  }
}

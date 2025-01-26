import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateCategoryInput,
  DeleteCategoryInput,
  QueryCategoryByIdInput,
  UpdateCategoryInput,
} from '@project/presentation/resolver/input/category.input';
import {
  CreateCategoryResponse,
  DeleteCategoryResponse,
  QueryCategoryByIdResponse,
  UpdateCategoryResponse,
} from '@project/presentation/resolver/response/category.response';
import { CategoryPresentationMapper } from '@project/presentation/mapper/category.presentation.mapper';
import { ResponseManager } from '@libs/response';

@Resolver('category')
export class CategoryResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Mutation(() => CreateCategoryResponse)
  async createCategory(
    @Args('input') input: CreateCategoryInput,
  ): Promise<CreateCategoryResponse> {
    const command =
      CategoryPresentationMapper.createCategoryInputToCreateCategoryCommand(
        input,
      );
    const result = await this.commandBus.execute(command);
    const output =
      CategoryPresentationMapper.entityToCreateCategoryOutput(result);
    return ResponseManager.success(output);
  }

  @Mutation(() => DeleteCategoryResponse)
  async deleteCategory(
    @Args('input') input: DeleteCategoryInput,
  ): Promise<DeleteCategoryResponse> {
    const command =
      CategoryPresentationMapper.deleteCategoryInputToDeleteCategoryCommand(
        input,
        'test',
      );
    const result = await this.commandBus.execute(command);
    const output =
      CategoryPresentationMapper.entityToDeleteCategoryOutput(result);
    return ResponseManager.success(output);
  }

  @Mutation(() => UpdateCategoryResponse)
  async updateCategory(
    @Args('input') input: UpdateCategoryInput,
  ): Promise<UpdateCategoryResponse> {
    const command =
      CategoryPresentationMapper.updateCategoryInputToUpdateCategoryCommand(
        input,
        'test',
      );
    const result = await this.commandBus.execute(command);
    const output =
      CategoryPresentationMapper.entityToUpdateCategoryOutput(result);
    return ResponseManager.success(output);
  }

  @Query(() => QueryCategoryByIdResponse)
  async queryCategoryById(
    @Args('input') input: QueryCategoryByIdInput,
  ): Promise<QueryCategoryByIdResponse> {
    const query =
      CategoryPresentationMapper.queryCategoryByIdInputToQueryCategory(
        input,
        'test',
      );
    const result = await this.queryBus.execute(query);
    const output =
      CategoryPresentationMapper.entityToQueryCategoryByIdOutput(result);
    return ResponseManager.success(output);
  }
}

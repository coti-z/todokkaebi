import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import {
  CreateCategoryInput,
  DeleteCategoryInput,
  UpdateCategoryInput,
} from '@project/presentation/resolver/input/category.input';
import {
  CreateCategoryResponse,
  DeleteCategoryResponse,
  UpdateCategoryResponse,
} from '@project/presentation/resolver/response/category.response';
import { CategoryPresentationMapper } from '@project/presentation/mapper/category.presentation.mapper';
import { ResponseManager } from '@libs/response';

@Resolver('category')
export class CategoryResolver {
  constructor(private readonly commandBus: CommandBus) {}

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
}

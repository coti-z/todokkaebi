import { CreateCategoryInput } from '@/todo/presentation/resolvers/dto/inputs/create-category.input';
import { DeleteCategoryInput } from '@/todo/presentation/resolvers/dto/inputs/delete-category.input';
import { GetAllCategoriesInput } from '@/todo/presentation/resolvers/dto/inputs/get-all-categories.input';
import { GetCategoryInput } from '@/todo/presentation/resolvers/dto/inputs/get-category.input';
import { UpdateCategoryInput } from '@/todo/presentation/resolvers/dto/inputs/update-category.input';
import { CategoryResponse } from '@/todo/presentation/resolvers/dto/objects/category-response.object';
import { GetAllCategoryResponse } from '@/todo/presentation/resolvers/dto/objects/get-all-category.object';
import { TokenInfo } from '@/utils/decorators/token-info.decorator';
import { JwtAuthGuard } from '@/utils/guard/jwt-auth.guard';
import { JwtPayload } from '@/utils/jwt/jwt-token.interface';
import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

@Resolver()
export class CategoryResolver {
  @UseGuards(JwtAuthGuard)
  @Mutation(() => CategoryResponse)
  async createCategory(
    @Args('input') input: CreateCategoryInput,
    @TokenInfo() payload: JwtPayload,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CategoryResponse)
  async getCategory(
    @Args('input') input: GetCategoryInput,
    @TokenInfo() payload: JwtPayload,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => GetAllCategoryResponse)
  async getAllCategories(
    @Args('input') input: GetAllCategoriesInput,
    @TokenInfo() payload: JwtPayload,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CategoryResponse)
  async updateCategory(
    @Args('input') input: UpdateCategoryInput,
    @TokenInfo() payload: JwtPayload,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CategoryResponse)
  async deleteCategory(
    @Args('input') input: DeleteCategoryInput,
    @TokenInfo() payload: JwtPayload,
  ) {}
}

import { CreateProjectInput } from '@/todo/presentation/resolvers/dto/input/create-project.input';
import { GetProjectInput } from '@/todo/presentation/resolvers/dto/input/get-project.input';
import { UpdateProjectInput } from '@/todo/presentation/resolvers/dto/input/update-project.input';
import { TokenInfo } from '@/utils/decorators/token-info.decorator';
import { JwtAuthGuard } from '@/utils/guard/jwt-auth.guard';
import { JwtPayload } from '@/utils/jwt/jwt-token.interface';
import { UseGuards } from '@nestjs/common';
import { Args, Resolver } from '@nestjs/graphql';

@Resolver()
export class ProjectResolver {
  @UseGuards(JwtAuthGuard)
  async createProject(@Args('input') input: CreateProjectInput) {}

  async getProject(@Args('input') input: GetProjectInput) {}

  @UseGuards(JwtAuthGuard)
  async getAllProjects(@TokenInfo() payload: JwtPayload) {}

  @UseGuards(JwtAuthGuard)
  async deleteProject(@TokenInfo() payload: JwtPayload) {}

  @UseGuards(JwtAuthGuard)
  async updateProject(
    @Args('input') input: UpdateProjectInput,
    @TokenInfo() payload: JwtPayload,
  ) {}
}

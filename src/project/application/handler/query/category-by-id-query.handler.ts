import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CategoryByIdQuery } from '../../port/in/query/category/category-by-id.query';
import { Injectable } from '@nestjs/common';
import { CategoryService } from '@project/application/service/category.service';
import { ProjectService } from '@project/application/service/project.service';
import { ErrorHandlingStrategy } from '@libs/exception';
import { CategoryReadModel } from '@project/application/dto/category-read.model';
import { CategoryApplicationMapper } from '@project/application/mapper/category.application.mapper';
import { Cache } from '@libs/decorators';
import { RedisService } from '@libs/redis';
import { CategoryOrganizationPolicy } from '@project/domain/logic/category-management/category-organization.policy';

@QueryHandler(CategoryByIdQuery)
@Injectable()
export class CategoryByIdHandler implements IQueryHandler<CategoryByIdQuery> {
  constructor(
    private readonly projectService: ProjectService,
    private readonly categoryService: CategoryService,

    private readonly errorHandlingStrategy: ErrorHandlingStrategy,

    private readonly redisService: RedisService,
  ) {}

  @Cache({
    key: args => `entity:task:${args[0].id}`,
    ttl: 300,
  })
  async execute(query: CategoryByIdQuery): Promise<CategoryReadModel> {
    try {
      await this.authorize(query.categoryId, query.userId);
      return await this.process(query);
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, query.context);
    }
  }

  private async authorize(categoryId: string, reqUserId: string) {
    const project = await this.projectService.queryProjectByCategoryId({
      categoryId,
    });

    CategoryOrganizationPolicy.canQueryCategory(project, reqUserId);
  }

  private async process(query: CategoryByIdQuery): Promise<CategoryReadModel> {
    const category = await this.categoryService.queryCategoryById({
      id: query.categoryId,
    });

    return CategoryApplicationMapper.entityToCategoryReadModel(category);
  }
}

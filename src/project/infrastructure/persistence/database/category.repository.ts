import { Injectable } from '@nestjs/common';

import {
  BaseRepository,
  PrismaService,
  TransactionContext,
} from '@libs/database';

import { ICategoryRepository } from '@project/application/port/out/category-repository.port';
import { Category } from '@project/domain/entity/category.entity';
import {
  CategoryInfraMapper,
  CategoryRecord,
} from '@project/infrastructure/mapper/category.infrastructure.mapper';

@Injectable()
export class CategoryRepositoryImpl
  extends BaseRepository
  implements ICategoryRepository
{
  async storeCategory(entity: Category): Promise<void> {
    const client = this.getPrismaClient();
    const data = CategoryInfraMapper.createToPersistence(entity);
    await client.category.create({ data });
  }

  async deleteCategoryById(entityId: string): Promise<void> {
    const client = this.getPrismaClient();
    client.category.delete({
      where: { id: entityId },
    });
  }

  async updateCategory(entity: Category): Promise<void> {
    const client = this.getPrismaClient();
    const data = CategoryInfraMapper.updateToPersistence(entity);
    await client.category.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async findCategoryById(entityId: string): Promise<Category | null> {
    const client = this.getPrismaClient();
    const data: CategoryRecord | null = await client.category.findUnique({
      where: { id: entityId },
      include: {
        tasks: true,
      },
    });
    if (!data) {
      return null;
    }
    return CategoryInfraMapper.categoryToDomain(data);
  }
}

import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '@project/application/port/out/category-repository.port';
import { PrismaService } from '@libs/database';
import { Category } from '@project/domain/entity/category.entity';
import { CategoryInfraMapper } from '@project/infrastructure/mapper/category.infrastructure.mapper';

@Injectable()
export class CategoryRepositoryImpl implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async storeCategory(entity: Category): Promise<void> {
    const data = CategoryInfraMapper.createToPersistence(entity);
    await this.prisma.category.create({ data });
  }

  async deleteCategoryById(entityId: string): Promise<void> {
    this.prisma.category.delete({
      where: { id: entityId },
    });
  }

  async findCategoryById(entityId: string): Promise<Category | null> {
    const data = await this.prisma.category.findUnique({
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

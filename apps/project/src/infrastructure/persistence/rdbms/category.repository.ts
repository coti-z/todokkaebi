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
    this.prisma.category.create({ data });
  }
}

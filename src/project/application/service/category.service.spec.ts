import { ApplicationException, ErrorCode } from '@libs/exception';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ChangeCategoryNameParams,
  CreateCategoryParams,
  DeleteCategoryParams,
  QueryCategoryByIdParams,
} from '@project/application/param/category.params';
import {
  CategoryRepositorySymbol,
  ICategoryRepository,
} from '@project/application/port/out/category-repository.port';
import { CategoryService } from '@project/application/service/category.service';
import { Category } from '@project/domain/entity/category.entity';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: jest.Mocked<ICategoryRepository>;

  beforeEach(async () => {
    const mockCategoryRepository: jest.Mocked<ICategoryRepository> = {
      deleteCategoryById: jest.fn(),
      findCategoryById: jest.fn(),
      storeCategory: jest.fn(),
      updateCategory: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepositorySymbol,
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get(CategoryRepositorySymbol);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCategory', () => {
    it('should create a new category with valid parameters', async () => {
      // Arrange
      const params: CreateCategoryParams = {
        name: 'New Category',
        projectId: 'project-123',
      };

      categoryRepository.storeCategory.mockResolvedValue(undefined);

      // Act
      const result = await service.createCategory(params);

      // Assert
      expect(result).toBeInstanceOf(Category);
      expect(result.name).toBe(params.name);
      expect(result.projectId).toBe(params.projectId);
    });
  });

  describe('deleteCategory', () => {
    it('should delete an existing category successfully', async () => {
      // Arrange
      const category = Category.create({
        name: 'Test Category',
        projectId: 'project-123',
      });

      const params: DeleteCategoryParams = {
        id: category.id,
      };
      categoryRepository.findCategoryById.mockResolvedValue(category);
      categoryRepository.deleteCategoryById.mockResolvedValue(undefined);

      // Act
      const result = await service.deleteCategory(params);

      // Assert
      expect(result).toBe(category);
      expect(categoryRepository.findCategoryById).toHaveBeenCalledWith(params.id);
      expect(categoryRepository.deleteCategoryById).toHaveBeenCalledWith(params.id);
    });

    it('should throw NOT_FOUND exception when category does not exist', async () => {
      // Arrange
      const params: DeleteCategoryParams = {
        id: 'non-existent-id',
      };
      categoryRepository.findCategoryById.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.deleteCategory(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });
  describe('changeName', () => {
    it('should change category name successfully when category exists', async () => {
      // Arrange
      const category = Category.create({
        name: 'Original Name',
        projectId: 'project-123',
      });

      const changeNameSpy = jest.spyOn(category, 'changeName');
      const params: ChangeCategoryNameParams = {
        id: category.id,
        name: 'Updated Name',
      };

      categoryRepository.findCategoryById.mockResolvedValue(category);

      categoryRepository.updateCategory.mockResolvedValue(undefined);
      // Act
      const result = await service.changeName(params);

      // Assert
      expect(result.name).toBe(params.name);
      expect(changeNameSpy).toHaveBeenCalledWith(params.name);
      expect(categoryRepository.updateCategory).toHaveBeenCalledWith(category);
    });

    it('should throw NOT_FOUND exception when category does not exist', async () => {
      // Arrange
      const params: ChangeCategoryNameParams = {
        id: 'non-existent-id',
        name: 'New Name',
      };

      categoryRepository.findCategoryById.mockResolvedValue(null);
      // Act & Assert
      try {
        await service.changeName(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.ErrorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });

  describe('queryCategoryById', () => {
    it('should return category when category exists', async () => {
      // Arrange
      const category = Category.create({
        name: 'Test Category',
        projectId: 'project-123',
      });

      const params: QueryCategoryByIdParams = {
        id: category.id,
      };

      categoryRepository.findCategoryById.mockResolvedValue(category);

      // Act
      const result = await service.queryCategoryById(params);
      expect(result).toBe(category);
      expect(categoryRepository.findCategoryById).toHaveBeenCalledWith(params.id);
    });
    it('should return category when category exists', async () => {
      // Arrange
      const params: ChangeCategoryNameParams = {
        id: 'non-existent-id',
        name: 'New Name',
      };

      categoryRepository.findCategoryById.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.changeName(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });
});

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectModule } from '../src/project.module';
import {
  CategoryMutations,
  CreateCategoryVariables,
  CreateProjectVariables,
  DeleteCategoryVariables,
  ProjectMutations,
  UpdateCategoryVariables,
} from './helpers/graphql-resolver.enum';
import { GraphQLTestHelper } from './helpers/graphql.helper';

describe('Category Resolver (e2e)', () => {
  let app: INestApplication;
  let graphqlHelper: GraphQLTestHelper;
  let projectId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProjectModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    graphqlHelper = new GraphQLTestHelper(app);
    await app.init();

    // Create a project first since categories need a project
    const { createProject } = await graphqlHelper.mutation<
      any,
      CreateProjectVariables
    >(ProjectMutations.CREATE_PROJECT, {
      input: {
        name: 'Test Project for Categories',
      },
    });
    projectId = createProject.data.id;
  });

  describe('create category', () => {
    it('should create a new category', async () => {
      // When: create category
      const result = await graphqlHelper.mutation<any, CreateCategoryVariables>(
        CategoryMutations.CREATE_CATEGORY,
        {
          input: {
            name: 'Test Category',
            projectId: projectId,
          },
        },
      );

      // Then
      expect(result.createCategory.success).toBe(true);
      expect(result.createCategory.data).toMatchObject({
        name: 'Test Category',
        projectId: projectId,
      });
    });
  });

  describe('update category', () => {
    it('should update category name', async () => {
      // Given: Create a category first
      const { createCategory } = await graphqlHelper.mutation<
        any,
        CreateCategoryVariables
      >(CategoryMutations.CREATE_CATEGORY, {
        input: {
          name: 'Original Category Name',
          projectId: projectId,
        },
      });

      // When: Update the category
      const result = await graphqlHelper.mutation<any, UpdateCategoryVariables>(
        CategoryMutations.UPDATE_CATEGORY,
        {
          input: {
            id: createCategory.data.id,
            name: 'Updated Category Name',
            projectId: projectId,
          },
        },
      );
      // Then: Verify update was successful
      expect(result.updateCategory.success).toBe(true);
      expect(result.updateCategory.data).toMatchObject({
        id: createCategory.data.id,
        name: 'Updated Category Name',
        projectId: projectId,
      });
    });
  });

  describe('delete category', () => {
    it('should delete a category successfully', async () => {
      // Given: Create a category to delete
      const { createCategory } = await graphqlHelper.mutation<
        any,
        CreateCategoryVariables
      >(CategoryMutations.CREATE_CATEGORY, {
        input: {
          name: 'Category to Delete',
          projectId: projectId,
        },
      });

      // When: Delete the category
      const result = await graphqlHelper.mutation<any, DeleteCategoryVariables>(
        CategoryMutations.DELETE_CATEGORY,
        {
          input: {
            id: createCategory.data.id,
          },
        },
      );

      // Then: Verify deletion was successful
      expect(result.deleteCategory.success).toBe(true);
      expect(result.deleteCategory.data.id).toBe(createCategory.data.id);
    });

    it('should fail when deleting non-existent category', async () => {
      // When, Then
      await expect(
        graphqlHelper.mutation<any, DeleteCategoryVariables>(
          CategoryMutations.DELETE_CATEGORY,
          {
            input: {
              id: 'non-existent-id',
            },
          },
        ),
      ).rejects.toThrow();
    });
  });
});

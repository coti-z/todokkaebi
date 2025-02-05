import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectModule } from '@project/project.module';
import { GraphQLTestHelper } from './graphql-helper/graphql.helper';
import { ProjectTestHelper } from './graphql-helper/operations/project.operations';
import { CategoryTestHelper } from './graphql-helper/operations/category.operations';

describe('Category resolver (e2e)', () => {
  let app: INestApplication;
  let graphQLTestHelper: GraphQLTestHelper;
  let projectTestHelper: ProjectTestHelper;
  let categoryTestHelper: CategoryTestHelper;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProjectModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    graphQLTestHelper = new GraphQLTestHelper(app);
    projectTestHelper = new ProjectTestHelper(graphQLTestHelper);
    categoryTestHelper = new CategoryTestHelper(graphQLTestHelper);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Create category', () => {
    let projectId: string;
    beforeAll(async () => {
      const projectResponse = await projectTestHelper.createProject({
        input: {
          name: 'test project name',
        },
      });
      projectId = projectResponse.data.id;
    });

    it('should create category', async () => {
      const categoryName = 'test category name';
      const categoryResponse = await categoryTestHelper.createCategory({
        input: {
          name: categoryName,
          projectId: projectId,
        },
      });

      expect(categoryResponse.data).toHaveProperty('name', categoryName);
    });
  });

  describe('Delete category', () => {
    let projectId: string;
    let categoryId: string;

    const projectName = 'test project name';
    const categoryName = 'test category name';
    beforeEach(async () => {
      const projectResponse = await projectTestHelper.createProject({
        input: {
          name: projectName,
        },
      });

      projectId = projectResponse.data.id;

      const categoryResponse = await categoryTestHelper.createCategory({
        input: {
          name: categoryName,
          projectId: projectId,
        },
      });

      categoryId = categoryResponse.data.id;
    });

    it('should delete category', async () => {
      const deleteCategoryResponse = await categoryTestHelper.deleteCategory({
        input: {
          id: categoryId,
        },
      });

      expect(deleteCategoryResponse.success).toBe(true);
    });
  });

  describe('Update category', () => {
    let projectId: string;
    let categoryId: string;

    const projectName = 'test project name';
    const categoryName = 'test category name';
    beforeEach(async () => {
      const projectResponse = await projectTestHelper.createProject({
        input: {
          name: projectName,
        },
      });

      projectId = projectResponse.data.id;

      const categoryResponse = await categoryTestHelper.createCategory({
        input: {
          name: categoryName,
          projectId: projectId,
        },
      });

      categoryId = categoryResponse.data.id;
    });

    it('should update category', async () => {
      const updateCategoryName = 'test updated category name';
      const updateCategoryResponse =
        await categoryTestHelper.changeCategoryNameChange({
          input: {
            id: categoryId,
            name: updateCategoryName,
          },
        });

      expect(updateCategoryResponse.success).toBe(true);
      expect(updateCategoryResponse.data).toHaveProperty(
        'name',
        updateCategoryName,
      );
    });
  });

  describe('Query category', () => {
    let projectId: string;
    let categoryId: string;

    const projectName = 'test project name';
    const categoryName = 'test category name for query';
    beforeEach(async () => {
      const projectResponse = await projectTestHelper.createProject({
        input: {
          name: projectName,
        },
      });

      projectId = projectResponse.data.id;

      const categoryResponse = await categoryTestHelper.createCategory({
        input: {
          name: categoryName,
          projectId: projectId,
        },
      });

      categoryId = categoryResponse.data.id;
    });

    it('should query category', async () => {
      const categoryResponse = await categoryTestHelper.queryCategoryById({
        input: {
          id: categoryId,
        },
      });

      expect(categoryResponse.success).toBe(true);
      expect(categoryResponse.data).toHaveProperty('name', categoryName);
    });
  });
});

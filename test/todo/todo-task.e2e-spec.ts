import { AppModule } from '@/app.module';
import { CreateCategoryInput } from '@/todo/presentation/resolvers/dto/inputs/create-category.input';
import { CreateProjectInput } from '@/todo/presentation/resolvers/dto/inputs/create-project.input';
import { CreateTaskInput } from '@/todo/presentation/resolvers/dto/inputs/create-task.input';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as uuid from 'uuid';
import { DateUtils } from '../utils/date';
import {
  CreateUserInput,
  executeGraphql,
  GraphQLResolverEnum,
} from '../utils/graphql.helper';

describe('Todo Project Resolver (e2e)', () => {
  let app: INestApplication;

  let accessToken: string;
  let projectId: string;
  let categoryId: string;

  const createUserInput: { input: CreateUserInput } = {
    input: {
      email: uuid.v4() + '@email.com',
      password: 'password',
      nickname: 'nickname',
    },
  };

  const createProjectinput: { input: CreateProjectInput } = {
    input: {
      name: 'project',
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const res1 = await executeGraphql(
      app,
      GraphQLResolverEnum.CREATE_USER,
      createUserInput,
    );
    const data1 = res1.body.data;
    accessToken = data1.createUser.accessToken;

    const res2 = await executeGraphql(
      app,
      GraphQLResolverEnum.CREATE_PROJECT,
      createProjectinput,
      accessToken,
    );
    const data2 = res2.body.data.createProject.project;
    projectId = data2.id;

    const createCategoryInputData: { input: CreateCategoryInput } = {
      input: {
        name: 'category_name2',
        projectId,
      },
    };
    const res1 = await executeGraphql(
      app,
      GraphQLResolverEnum.CREATE_CATEGORY,
      createCategoryInputData,
      accessToken,
    );
    const data = res1.body.data.createCategory.category;
    categoryId = data.id;
  });

  describe('create task resolver (e2e)', () => {
    it('should create task', async () => {
      const inputDate: { input: CreateTaskInput } = {
        input: {
          categoryId,
          endDate: DateUtils.createDate(2024, 10, 3),
          startDate: DateUtils.createDate(2024, 8, 3),
          title: 'test',
        },
      };
    });
  });
});

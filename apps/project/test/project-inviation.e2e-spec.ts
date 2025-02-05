import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectModule } from '@project/project.module';
import { GraphQLTestHelper } from './graphql-helper/graphql.helper';
import { ProjectInvitationTestHelper } from './graphql-helper/operations/project-invitation.operations';
import { ProjectTestHelper } from './graphql-helper/operations/project.operations';

describe('ProjectInviationResolver (e2e)', () => {
  let app: INestApplication;
  let graphQLTestHelper: GraphQLTestHelper;
  let projectTestHelper: ProjectTestHelper;
  let projectInvitationTestHelper: ProjectInvitationTestHelper;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProjectModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    graphQLTestHelper = new GraphQLTestHelper(app);
    projectInvitationTestHelper = new ProjectInvitationTestHelper(
      graphQLTestHelper,
    );
    projectTestHelper = new ProjectTestHelper(graphQLTestHelper);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Create project invitation ', () => {});

  describe('Accept project invitation ', () => {});

  describe('Reject project invitation ', () => {});
});

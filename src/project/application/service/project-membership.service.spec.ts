import { Test, TestingModule } from '@nestjs/testing';
import { EnrollProjectMembershipParams } from '@project/application/param/project-membership.params';
import { IProjectInvitationRepository } from '@project/application/port/out/project-invitation-repository.port';
import {
  IProjectMembershipRepository,
  ProjectMembershipRepositorySymbol,
} from '@project/application/port/out/project-membership-repository.port';
import { ProjectMembershipService } from '@project/application/service/project-membership.service';
import { ProjectMembership } from '@project/domain/entity/project-membership.entity';
import { MembershipRole } from '@project/domain/value-objects/membership-role.vo';
import { ProjectMembershipRepositoryImpl } from '@project/infrastructure/persistence/database/project-membership.repository';

describe('ProjectMembershipService', () => {
  let service: ProjectMembershipService;
  let projectMembershipRepository: jest.Mocked<IProjectMembershipRepository>;

  beforeEach(async () => {
    const mockProjectMembershipRepository: jest.Mocked<IProjectMembershipRepository> = {
      findProjectMembershipByUserIdAndProjectId: jest.fn(),
      storeProjectMembership: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectMembershipService,
        {
          provide: ProjectMembershipRepositorySymbol,
          useValue: mockProjectMembershipRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectMembershipService>(ProjectMembershipService);
    projectMembershipRepository = module.get(ProjectMembershipRepositorySymbol);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('enrollProjectMembership', () => {
    it('should enroll a new project member successfully', async () => {
      // Arrange
      const params: EnrollProjectMembershipParams = {
        projectId: 'project-123',
        userId: 'user-456',
        role: MembershipRole.MEMBER,
      };
      const membership = ProjectMembership.create({
        projectId: params.projectId,
        role: MembershipRole.MEMBER,
        userId: 'user-456',
      });
      projectMembershipRepository.storeProjectMembership.mockResolvedValue(undefined);

      // Act
      await service.enrollProjectMembership(params);

      // Assert
      expect(projectMembershipRepository.storeProjectMembership).toHaveBeenCalledTimes(1);
    });
  });
});

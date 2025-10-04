import { ApplicationException, ErrorCode } from '@libs/exception';
import { Test, TestingModule } from '@nestjs/testing';
import { FindProjectInvitationByIdParams } from '@project/application/param/find-project-inviation-by-id.param';
import {
  CreateProjectInvitationParams,
  UpdateProjectInvitationParams,
} from '@project/application/param/project-invitation.params';
import {
  IProjectInvitationRepository,
  ProjectInvitationRepositorySymbol,
} from '@project/application/port/out/project-invitation-repository.port';
import { ProjectInvitationService } from '@project/application/service/project-invitation.service';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { InvitationStatus } from '@project/domain/value-objects/invation-status.vo';

describe('ProjectInvitationService', () => {
  let service: ProjectInvitationService;
  let projectInvitationRepository: jest.Mocked<IProjectInvitationRepository>;

  beforeEach(async () => {
    const mockProjectInvitationRepository: jest.Mocked<IProjectInvitationRepository> = {
      findProjectInvitationById: jest.fn(),
      storeProjectInvitation: jest.fn(),
      updateProjectInvitation: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectInvitationService,
        {
          provide: ProjectInvitationRepositorySymbol,
          useValue: mockProjectInvitationRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectInvitationService>(ProjectInvitationService);
    projectInvitationRepository = module.get(ProjectInvitationRepositorySymbol);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProjectInvitation', () => {
    it('should create a new project invitation with PENDING status', async () => {
      // Arrange
      const params: CreateProjectInvitationParams = {
        projectId: 'project-123',
        inviteeUserId: 'invitee-456',
        inviterUserId: 'inviter-789',
      };

      projectInvitationRepository.storeProjectInvitation.mockResolvedValue(undefined);

      // Act
      const result = await service.createProjectInvitation(params);

      // Assert
      expect(result).toBeInstanceOf(ProjectInvitation);
      expect(result.projectId).toBe(params.projectId);
      expect(result.inviterUserId).toBe(params.inviterUserId);
      expect(result.inviteeUserId).toBe(params.inviteeUserId);
    });
  });

  describe('updateProjectInvitation', () => {
    it('should update invitation status to ACCEPTED successfully', async () => {
      // Arrange
      const invitation = ProjectInvitation.create({
        projectId: 'project-123',
        inviteeUserId: 'invitee-456',
        inviterUserId: 'inviter-789',
      });
      const changeStatusSpy = jest.spyOn(invitation, 'changeInvitationStatus');
      const params: UpdateProjectInvitationParams = {
        id: invitation.id,
        status: InvitationStatus.ACCEPTED,
      };

      projectInvitationRepository.findProjectInvitationById.mockResolvedValue(invitation);
      projectInvitationRepository.updateProjectInvitation.mockResolvedValue(undefined);

      // Act
      const result = await service.updateProjectInvitation(params);
      // Assert
      expect(result).toBe(invitation);
      expect(result.status).toBe(InvitationStatus.ACCEPTED);

      expect(changeStatusSpy).toHaveBeenCalledWith(InvitationStatus.ACCEPTED);
    });
    it('should update invitation status to REJECTED successfully', async () => {
      // Arrange
      const invitation = ProjectInvitation.create({
        projectId: 'project-123',
        inviteeUserId: 'invitee-456',
        inviterUserId: 'inviter-789',
      });

      const changeStatusSpy = jest.spyOn(invitation, 'changeInvitationStatus');
      const params: UpdateProjectInvitationParams = {
        id: invitation.id,
        status: InvitationStatus.REJECTED,
      };

      projectInvitationRepository.findProjectInvitationById.mockResolvedValue(invitation);
      projectInvitationRepository.updateProjectInvitation.mockResolvedValue(undefined);

      // Act
      const result = await service.updateProjectInvitation(params);

      // Assert
      expect(result).toBe(invitation);
      expect(result.status).toBe(InvitationStatus.REJECTED);
      expect(changeStatusSpy).toHaveBeenCalledWith(InvitationStatus.REJECTED);
    });

    it('should throw NOT_FOUND exception when invitation does not exist', async () => {
      // Arrange
      const params: UpdateProjectInvitationParams = {
        id: 'non-existent-id',
        status: InvitationStatus.ACCEPTED,
      };

      projectInvitationRepository.findProjectInvitationById.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.updateProjectInvitation(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });

  describe('findProjectInvitationById', () => {
    it('should return invitation when it exists', async () => {
      // Arrange
      const invitation = ProjectInvitation.create({
        projectId: 'project-123',
        inviteeUserId: 'invitee-456',
        inviterUserId: 'inviter-789',
      });

      const params: FindProjectInvitationByIdParams = {
        id: invitation.id,
      };
      projectInvitationRepository.findProjectInvitationById.mockResolvedValue(invitation);

      // Act
      const result = await service.findProjectInvitationById(params);

      // Assert
      expect(result).toBe(invitation);
    });

    it('should throw NOT_FOUND exception when invitation does not exist', async () => {
      // Arrange
      const params: FindProjectInvitationByIdParams = {
        id: 'non-existent-id',
      };
      projectInvitationRepository.findProjectInvitationById.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.findProjectInvitationById(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });

  describe('findProjectInvitationById', () => {
    it('should return invitation when it exists', async () => {
      // Arrange
      const invitation = ProjectInvitation.create({
        projectId: 'project-123',
        inviteeUserId: 'inviter-456',
        inviterUserId: 'invitee-789',
      });

      const params: FindProjectInvitationByIdParams = {
        id: invitation.id,
      };
      projectInvitationRepository.findProjectInvitationById.mockResolvedValue(invitation);

      // Act
      const result = await service.findProjectInvitationById(params);

      // Assert
      expect(result).toBe(invitation);
      expect(projectInvitationRepository.findProjectInvitationById).toHaveBeenCalledWith(params.id);
    });

    it('should throw NOT_FOUND exception when invitation does not exist', async () => {
      // Arrange
      const params: FindProjectInvitationByIdParams = {
        id: 'non-existent-id',
      };
      projectInvitationRepository.findProjectInvitationById.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.findProjectInvitationById(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });
});

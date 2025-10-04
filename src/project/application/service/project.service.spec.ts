import { ApplicationException, ErrorCode } from '@libs/exception';
import { Param } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateProjectParams,
  DeleteProjectParams,
  QueryProjectByCategoryIdParams,
  QueryProjectByTaskIdParams,
  QueryProjectParams,
  QueryProjectsByUserIdParams,
  UpdateProjectParams,
} from '@project/application/param/project.params';
import {
  IProjectRepository,
  ProjectRepositorySymbol,
} from '@project/application/port/out/project-repository.port';
import { ProjectService } from '@project/application/service/project.service';
import { Project } from '@project/domain/entity/project.entity';

describe('ProjectService', () => {
  let service: ProjectService;
  let projectRepository: jest.Mocked<IProjectRepository>;

  beforeEach(async () => {
    const mockProjectRepository: jest.Mocked<IProjectRepository> = {
      createProject: jest.fn(),
      deleteProject: jest.fn(),
      findProjectByCategoryId: jest.fn(),
      findProjectById: jest.fn(),
      findProjectByTaskId: jest.fn(),
      findProjectsByUserId: jest.fn(),
      updateProject: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: ProjectRepositorySymbol,
          useValue: mockProjectRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    projectRepository = module.get(ProjectRepositorySymbol);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProject', () => {
    it('should create a new project successfully', async () => {
      // Arrange
      const params: CreateProjectParams = {
        adminId: 'admin-123',
        name: 'Test Project',
      };
      projectRepository.createProject.mockResolvedValue(undefined);
      // Act
      const result = await service.createProject(params);

      // Assert
      expect(result).toBeInstanceOf(Project);
      expect(result.name).toBe(params.name);
      expect(result.adminId).toBe(params.adminId);
    });
  });

  describe('deleteProject', () => {
    it('should delete an existing project successfully', async () => {
      // Arrange
      const project = Project.create({
        name: 'Test Project',
        adminId: 'admin-123',
      });
      const deleteParams: DeleteProjectParams = {
        id: project.id,
      };

      projectRepository.findProjectById.mockResolvedValue(project);
      projectRepository.deleteProject.mockResolvedValue(undefined);

      // Act
      const result = await service.deleteProject(deleteParams);

      // Assert
      expect(result).toBe(project);
      expect(projectRepository.findProjectById).toHaveBeenCalledWith(deleteParams.id);
      expect(projectRepository.deleteProject).toHaveBeenCalledWith(project);
    });
  });

  describe('updateProject', () => {
    it('should update project name successfully', async () => {
      // Arrange
      const project = Project.create({
        name: 'Original Name',
        adminId: 'admin-123',
      });
      const params: UpdateProjectParams = {
        id: project.id,
        name: 'Updated Project Name',
      };
      projectRepository.findProjectById.mockResolvedValue(project);

      const changeNameSpy = jest.spyOn(project, 'changeName');

      // Act
      const result = await service.updateProject(params);

      // Assert
      expect(result).toBe(project);

      // (1) repository
      expect(projectRepository.findProjectById).toHaveBeenCalledWith(params.id);

      // (2). domain
      expect(changeNameSpy).toHaveBeenCalledWith(params.name);
    });

    it('should throw NOT_FOUND exception when project does not exist', async () => {
      // Arrange
      const params: DeleteProjectParams = {
        id: 'non-existent-id',
      };
      projectRepository.findProjectById.mockResolvedValue(null);
      // Act & Assert
      await expect(service.deleteProject(params)).rejects.toThrow(ApplicationException);
      try {
        await service.deleteProject(params);
      } catch (error) {
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }

      expect(projectRepository.deleteProject).not.toHaveBeenCalled();
    });
  });

  describe('updateProject', () => {
    it('should update project name successfully when project exists', async () => {
      // Arrange
      const project = Project.create({
        name: 'Original Name',
        adminId: 'admin-123',
      });

      const changeNameSpy = jest.spyOn(project, 'changeName');
      const params: UpdateProjectParams = {
        id: project.id,
        name: 'Updated Name',
      };

      projectRepository.findProjectById.mockResolvedValue(project);
      projectRepository.updateProject.mockResolvedValue(undefined);

      // Act
      const result = await service.updateProject(params);

      // Assert
      expect(result).toBe(project);
      expect(result.name).toBe(params.name);

      expect(projectRepository.findProjectById).toHaveBeenCalledWith(project.id);
      expect(projectRepository.updateProject).toHaveBeenCalledWith(project);
    });

    it('should throw NOT_FOUND exception when project does not exist', async () => {
      // Arrange
      const params: UpdateProjectParams = {
        id: 'non-existent-id',
        name: 'New Name',
      };

      projectRepository.findProjectById.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.updateProject(params);
      } catch (error) {
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
      expect(projectRepository.updateProject).not.toHaveBeenCalled();
    });
  });

  describe('queryProjectById', () => {
    it('should return project when project exists', async () => {
      // Arrange
      const project = Project.create({
        name: 'Test Project',
        adminId: 'admin-123',
      });

      const params: QueryProjectParams = {
        id: project.id,
      };

      projectRepository.findProjectById.mockResolvedValue(project);

      // Act
      const result = await service.queryProjectById(params);

      // Assert
      expect(result).toBe(project);
      expect(projectRepository.findProjectById).toHaveBeenCalledWith(params.id);
    });

    it('should throw NOT_FOUND exception when project does not exist', async () => {
      // Arrange
      const params: QueryProjectParams = {
        id: 'non-existent-id',
      };
      projectRepository.findProjectById.mockResolvedValue(null);

      // Act && Assert
      await projectRepository.findProjectById.mockResolvedValue(null);
      try {
        await service.queryProjectById(params);
      } catch (error) {
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });

  describe('queryProjects', () => {
    it('should return all project for a given user', async () => {
      // Arrange
      const mockProjects = [
        Project.create({ name: 'Project 1', adminId: 'admin-123' }),
        Project.create({ name: 'Project 2', adminId: 'admin-123' }),
      ];
      const params: QueryProjectsByUserIdParams = {
        userId: 'admin-123',
      };

      projectRepository.findProjectsByUserId.mockResolvedValue(mockProjects);
      // Act
      const result = await service.queryProjects(params);

      // Assert
      expect(result).toBe(mockProjects);
      expect(projectRepository.findProjectsByUserId).toHaveBeenCalledWith(params.userId);
    });

    it('should return empty array when user has no projects', async () => {
      // Arrange
      const params: QueryProjectsByUserIdParams = {
        userId: 'user-with-no-projects',
      };

      projectRepository.findProjectsByUserId.mockResolvedValue([]);

      // Act
      const result = await service.queryProjects(params);

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('queryProjectByCategoryId', () => {
    it('should return project when category belongs to a project', async () => {
      // Arrange
      const project = Project.create({
        name: 'Test Project',
        adminId: 'admin-123',
      });

      const params: QueryProjectByCategoryIdParams = {
        categoryId: 'category-123',
      };
      projectRepository.findProjectByCategoryId.mockResolvedValue(project);

      // Act
      const result = await service.queryProjectByCategoryId(params);

      // Assert
      expect(result).toBe(project);
      expect(projectRepository.findProjectByCategoryId).toHaveBeenCalledWith(params.categoryId);
    });

    it('should throw NOT_FOUND exception when category does not belong to any project', async () => {
      // Arrange
      const params: QueryProjectByCategoryIdParams = {
        categoryId: 'non-existent-category',
      };
      projectRepository.findProjectByCategoryId.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.queryProjectByCategoryId(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });

  describe('queryProjectByTaskId', () => {
    it('should return project when task belongs to a project', async () => {
      const project = Project.create({
        name: 'Test Project',
        adminId: 'admin-123',
      });
      const params: QueryProjectByTaskIdParams = {
        taskId: 'task-123',
      };

      projectRepository.findProjectByTaskId.mockResolvedValue(project);

      // Act
      const result = await service.queryProjectByTaskId(params);

      // Assert
      expect(result).toBe(project);
    });

    it('should throw NOT_FOUND exception then task does not belong to any project', async () => {
      // Arrange
      const params: QueryProjectByTaskIdParams = {
        taskId: 'non-existent-task',
      };

      projectRepository.findProjectByTaskId.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.queryProjectByTaskId(params);
      } catch (error) {
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });
});

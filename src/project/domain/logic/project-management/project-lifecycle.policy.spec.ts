import { DomainException, ErrorCode } from '@libs/exception';
import { Project } from '@project/domain/entity/project.entity';
import { ProjectLifeCyclePolicy } from '@project/domain/logic/project-management/project-lifecycle.policy';

describe('ProjectLifeCyclePolicy', () => {
  let project: Project;
  let adminId: string;
  let projectName: string;

  beforeEach(() => {
    adminId = 'admin-1234-1234-1234-1234';
    projectName = 'test';
    project = Project.create({
      adminId: adminId,
      name: projectName,
    });
  });

  describe('canChangeProjectName', () => {
    it('should throw DomainException when project is null', () => {
      const testUserId = 'user-1234-1234-1234-1234';
      project = null as any;

      try {
        ProjectLifeCyclePolicy.canChangeProjectName(project, testUserId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
      }
    });

    it('should throw DomainException when userId is null', () => {
      const userId = null as any;
      try {
        ProjectLifeCyclePolicy.canChangeProjectName(project, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
      }
    });

    it('should pass when project, userId is valid', () => {
      expect(() => ProjectLifeCyclePolicy.canChangeProjectName(project, adminId)).not.toThrow(
        DomainException,
      );
    });
  });

  describe('canQueryProject', () => {
    it('should throw DomainException(BAD_REQUEST) when project is null', () => {
      const project = null as any;
      const userId = 'user-123';

      try {
        ProjectLifeCyclePolicy.canQueryProject(project, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });

    it('should throw DomainException(BAD_REQUEST) when userId is null', () => {
      const project = Project.create({
        adminId: 'admin-123',
        name: 'test',
      });
      const userId = null as any;

      try {
        ProjectLifeCyclePolicy.canQueryProject(project, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });

    it('should query project when parameter is valid', () => {
      const userId = 'user-123';
      const project = Project.create({
        adminId: userId,
        name: 'test',
      });

      expect(() => ProjectLifeCyclePolicy.canQueryProject(project, userId)).not.toThrow();
    });
  });

  describe('canDeleteProject', () => {
    it('should throw DomainException(BAD_REQUEST) when project is null', () => {
      const project = null as any;
      const userId = 'user-123';

      try {
        ProjectLifeCyclePolicy.canDeleteProject(project, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });

    it('should throw DomainException(BAD_REQUEST) when userId is null', () => {
      const project = Project.create({
        adminId: 'admin-123',
        name: 'test',
      });
      const userId = null as any;

      try {
        ProjectLifeCyclePolicy.canDeleteProject(project, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });

    it('should pass when parameters is valid', () => {
      const userId = 'user-123';
      const project = Project.create({
        adminId: userId,
        name: 'test title',
      });

      expect(() => ProjectLifeCyclePolicy.canDeleteProject(project, userId)).not.toThrow();
    });
  });
});

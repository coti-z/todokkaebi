import { DomainException } from '@libs/exception';
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

      expect(() => ProjectLifeCyclePolicy.canChangeProjectName(project, testUserId)).toThrow(
        DomainException,
      );
    });

    it('should throw DomainException when userId is null', () => {
      const userId = null as any;
      expect(() => ProjectLifeCyclePolicy.canChangeProjectName(project, userId)).toThrow(
        DomainException,
      );
    });

    it('should pass when project, userId is valid', () => {
      const testUserId = 'user-1234-1234-1234-1234';

      expect(() => ProjectLifeCyclePolicy.canChangeProjectName(project, testUserId)).not.toThrow(
        DomainException,
      );
    });
  });
});

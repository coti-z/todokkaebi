import { DomainException, ErrorCode } from '@libs/exception';
import {
  CreateProjectMembershipProps,
  ProjectMembership,
} from '@project/domain/entity/project-membership.entity';
import { MembershipRole } from '@project/domain/value-objects/membership-role.vo';

describe('ProjectMembership entity', () => {
  describe('constructor', () => {
    it('should create project membership entity with valid parameter', () => {
      const projectMembershipData: CreateProjectMembershipProps = {
        projectId: '1234-1234-1234-1234',
        userId: '4321-4321-4321-4321',
        role: MembershipRole.MEMBER,
      };

      const projectMembership = ProjectMembership.create(projectMembershipData);

      expect(projectMembership.projectId).toBe(projectMembershipData.projectId);
      expect(projectMembership.role).toBe(projectMembershipData.role);
      expect(projectMembership.userId).toBe(projectMembershipData.userId);
    });

    it('should throw error with invalid parameters', () => {
      expect(() => ProjectMembership.create(null as any)).toThrow();
    });
  });

  describe('method', () => {
    let projectMembership: ProjectMembership;

    beforeEach(() => {
      const projectMembershipData: CreateProjectMembershipProps = {
        projectId: '1234-1234-1234-1234',
        userId: '4321-4321-4321-4321',
        role: MembershipRole.MEMBER,
      };
      projectMembership = ProjectMembership.create(projectMembershipData);
    });

    it('should change role', () => {
      projectMembership.changeRole(MembershipRole.OWNER);
      expect(projectMembership.role).toBe(MembershipRole.OWNER);
    });

    it('should throw DomainException when membershipRole is null', () => {
      const role = null as any;

      try {
        projectMembership.changeRole(role);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });
  });
});

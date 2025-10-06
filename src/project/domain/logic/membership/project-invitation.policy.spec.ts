import { ApplicationException, DomainException, ErrorCode } from '@libs/exception';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
import { Project } from '@project/domain/entity/project.entity';
import { ProjectInvitationPolicy } from '@project/domain/logic/membership/project-invitation.policy';
import { InvitationStatus } from '@project/domain/value-objects/invation-status.vo';

describe('ProjectInvitationPolicy', () => {
  let testUserId: string;
  let testUserTargetId: string;
  let testProjectId: string;

  let projectInvitation: ProjectInvitation;

  beforeEach(() => {
    testUserId = '1234-1234-1234-1234';
    testUserTargetId = '4321-4321-4321';
    testProjectId = 'project-1234-1234-1234-1234';
    projectInvitation = ProjectInvitation.create({
      inviteeUserId: testUserId,
      inviterUserId: testUserTargetId,
      projectId: testProjectId,
    });
  });
  describe('canUpdateProjectInvitation', () => {
    it('should throw DomainException when projectInvitation is null', () => {
      projectInvitation = null as any;
      expect(() =>
        ProjectInvitationPolicy.canUpdateProjectInvitation(
          projectInvitation,
          InvitationStatus.ACCEPTED,
          testUserId,
        ),
      ).toThrow(DomainException);
    });

    it('should throw DomainException when invitation status is null', () => {
      const invitationStatus = InvitationStatus.ACCEPTED;
      expect(() =>
        ProjectInvitationPolicy.canUpdateProjectInvitation(
          null as any,
          invitationStatus,
          testUserId,
        ),
      ).toThrow(DomainException);
    });

    it('should throw DomainException when reqUserId is null', () => {
      const projectInvitation = {} as ProjectInvitation;
      const invitationStatus = InvitationStatus.ACCEPTED;
      expect(() =>
        ProjectInvitationPolicy.canUpdateProjectInvitation(
          projectInvitation,
          invitationStatus,
          testUserId,
        ),
      ).toThrow(DomainException);
    });

    it('should pass when valid projectInvitation, invitation, reqUserId', () => {
      const invitationStatus = InvitationStatus.ACCEPTED;

      expect(() =>
        ProjectInvitationPolicy.canUpdateProjectInvitation(
          projectInvitation,
          invitationStatus,
          testUserId,
        ),
      ).not.toThrow();
    });
  });

  describe('canCreateProjectInvitation', () => {
    it('should throw DomainException(BAD_REQUEST) when project is null', () => {
      const userId = 'user-123';
      const project = null as any;

      try {
        ProjectInvitationPolicy.canCreateProjectInvitation(project, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });

    it('should throw DomainException(BAD_REQUEST) when reqUserId is null', () => {
      const project = Project.create({
        adminId: 'user-123',
        name: 'test title',
      });

      const userId = null as any;
      try {
        ProjectInvitationPolicy.canCreateProjectInvitation(project, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });

    it('should pass when parameter is valid', () => {
      const userId = 'user-123';
      const project = Project.create({
        adminId: userId,
        name: 'test title',
      });

      expect(() =>
        ProjectInvitationPolicy.canCreateProjectInvitation(project, userId),
      ).not.toThrow();
    });
  });
});

import { DomainException } from '@libs/exception';
import { ProjectInvitation } from '@project/domain/entity/project-invitation.entity';
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
  describe('updateProjectInvitation', () => {
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
});

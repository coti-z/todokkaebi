import {
  CreateProjectInvitationProps,
  ProjectInvitation,
} from '@project/domain/entity/project-invitation.entity';
import { InvitationStatus } from '@project/domain/value-objects/invation-status.vo';

describe('ProjectInvitation Entity', () => {
  describe('constructor', () => {
    it('should create category with valid parameters', () => {
      const projectInvitationData: CreateProjectInvitationProps = {
        inviteeUserId: '1234-1234-1234-1234',
        inviterUserId: '4321-4321-4321-4321',
        projectId: '1111-1111-1111-1111',
      };

      const projectInvitation = ProjectInvitation.create(projectInvitationData);

      expect(projectInvitation.inviteeUserId).toBe(projectInvitationData.inviteeUserId);
      expect(projectInvitation.inviterUserId).toBe(projectInvitationData.inviterUserId);
      expect(projectInvitation.projectId).toBe(projectInvitationData.projectId);
      expect(projectInvitation.status).toBe(InvitationStatus.PENDING);
    });

    it('should throw error with invalid parameters', () => {
      expect(() => ProjectInvitation.create(null as any)).toThrow();
    });
  });
  describe('method', () => {
    let projectInvitation: ProjectInvitation;
    beforeEach(() => {
      const projectInvitationData: CreateProjectInvitationProps = {
        inviteeUserId: '1234-1234-1234-1234',
        inviterUserId: '4321-4321-4321-4321',
        projectId: '1111-1111-1111-1111',
      };
      projectInvitation = ProjectInvitation.create(projectInvitationData);
    });

    it('should change status', () => {
      projectInvitation.changeInvitationStatus(InvitationStatus.ACCEPTED);
      expect(projectInvitation.status).toBe(InvitationStatus.ACCEPTED);
    });
  });
});

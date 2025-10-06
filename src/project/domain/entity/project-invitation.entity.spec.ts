import { DomainException, ErrorCode } from '@libs/exception';
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

    it('should throw DomainException when props is null', () => {
      const projectInvitationData = null as any;
      try {
        ProjectInvitation.create(projectInvitationData);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });

    it('should throw DomainException when inviteeUserId is same with inviterUserId', () => {
      const projectInvitationData: CreateProjectInvitationProps = {
        inviteeUserId: '1234-1234-1234-1234',
        inviterUserId: '1234-1234-1234-1234',
        projectId: '1111-1111-1111-1111',
      };

      try {
        ProjectInvitation.create(projectInvitationData);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
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

    describe('changeInvitationStatus', () => {
      it('should change status', () => {
        projectInvitation.changeInvitationStatus(InvitationStatus.ACCEPTED);
        expect(projectInvitation.status).toBe(InvitationStatus.ACCEPTED);
      });

      it('should throw DomainException when change status is null', () => {
        const status = null as any;

        try {
          projectInvitation.changeInvitationStatus(status);
        } catch (error) {
          expect(error).toBeInstanceOf(DomainException);
          expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
        }
      });
    });
  });
});

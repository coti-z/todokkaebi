import { DomainException, ErrorCode } from '@libs/exception';

import { Project } from '@project/domain/entity/project.entity';
import { AuthorizationPolicy } from '@project/domain/logic/access-control/authorization.policy';

describe('AuthorizationPolicy', () => {
  describe('requireProjectAdmin', () => {
    it('should throw DomainException(BAD_REQUEST) when project is null', () => {
      const project = null as any;
      const userId = 'user-123';
      try {
        AuthorizationPolicy.requireProjectAdmin(project, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });

    it('should throw DomainException(BAD_REQUEST) when userId is null', () => {
      const project = Project.create({
        name: 'Test Project',
        adminId: 'admin-123',
      });

      const userId = null as any;

      try {
        AuthorizationPolicy.requireProjectAdmin(project, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });
    it('should throw DomainException(BAD_REQUEST) when userId not is adminId', () => {
      const userId = 'user-123';
      const project = Project.create({
        name: 'Test Project',
        adminId: 'admin-123',
      });

      try {
        AuthorizationPolicy.requireProjectAdmin(project, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.UNAUTHORIZED);
      }
    });

    it('should pass when parameter is valid', () => {
      const adminId = 'admin-123';
      const project = Project.create({
        name: 'Test Project',
        adminId: adminId,
      });

      expect(() => AuthorizationPolicy.requireProjectAdmin(project, adminId)).not.toThrow();
    });
  });

  describe('requireProjectMembership', () => {
    it('should throw DomainException(BAD_REQUEST) when project is null', () => {
      const project = null as any;
      const userId = 'user-123';
      try {
        AuthorizationPolicy.requireProjectMembership(project, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });

    it('should throw DomainException(BAD_REQUEST) when userId is null', () => {
      const project = Project.create({
        name: 'Test Project',
        adminId: 'admin-123',
      });

      const userId = null as any;

      try {
        AuthorizationPolicy.requireProjectMembership(project, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.BAD_REQUEST);
      }
    });
    it('should throw DomainException(BAD_REQUEST) when userId don`t have membership', () => {
      const userId = 'user-123';
      const project = Project.create({
        name: 'Test Project',
        adminId: 'admin-123',
      });

      try {
        AuthorizationPolicy.requireProjectMembership(project, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(DomainException);
        expect(error.errorCode).toBe(ErrorCode.UNAUTHORIZED);
      }
    });

    it('should pass when parameter is valid', () => {
      const adminId = 'admin-123';
      const project = Project.create({
        name: 'Test Project',
        adminId: adminId,
      });

      expect(() => AuthorizationPolicy.requireProjectMembership(project, adminId)).not.toThrow();
    });
  });
});

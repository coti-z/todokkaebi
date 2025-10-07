import { Test, TestingModule } from '@nestjs/testing';

import { ApplicationException, ErrorCode } from '@libs/exception';

import { CreateUserCredentialParam } from '@auth/application/dto/params/create-user-credential.param';
import { DeleteUserCredentialParam } from '@auth/application/dto/params/delete-user-credential.param';
import { FindCredentialByUserIdParam } from '@auth/application/dto/params/find-token-by-userid.param';
import { UpdateCredentialParam } from '@auth/application/dto/params/update-credential.param';
import {
  IUserCredentialRepository,
  UserCredentialRepositorySymbol,
} from '@auth/application/port/out/user-credential-repository.port';
import { UserCredentialService } from '@auth/application/service/user-credential.service';
import { UserCredential } from '@auth/domain/entity/user-credential.entity';

describe('UserCredentialService', () => {
  let service: UserCredentialService;
  let userCredentialRepository: jest.Mocked<IUserCredentialRepository>;
  beforeEach(async () => {
    const mockUserCredentialRepository: jest.Mocked<IUserCredentialRepository> = {
      createUserCredential: jest.fn(),
      deleteUserCredential: jest.fn(),
      findUserCredentials: jest.fn(),
      findUserCredentialsByEmail: jest.fn(),
      updateUserCredential: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCredentialService,
        {
          provide: UserCredentialRepositorySymbol,
          useValue: mockUserCredentialRepository,
        },
      ],
    }).compile();

    service = module.get<UserCredentialService>(UserCredentialService);
    userCredentialRepository = module.get(UserCredentialRepositorySymbol);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCredential', () => {
    it('should create a new user credential successfully', async () => {
      // Arrange
      const params: CreateUserCredentialParam = {
        userId: 'user-123',
        email: 'test@example.com',
        passwordHash: 'hashed-password-123',
      };

      userCredentialRepository.findUserCredentials.mockResolvedValue(null);
      userCredentialRepository.createUserCredential.mockResolvedValue(undefined);

      // Act
      const result = await service.createCredential(params);

      // Assert
      expect(result).toBeInstanceOf(UserCredential);
      expect(result.userId).toBe(params.userId);
      expect(result.email).toBe(params.email);
      expect(result.passwordHash).toBe(params.passwordHash);
    });

    it('should throw USER_ALREADY_EXISTS exception when user credential already exists', async () => {
      // Arrange
      const existingCredential = UserCredential.create({
        userId: 'user-123',
        email: 'existing@example.com',
        passwordHash: 'hashed-password',
      });

      const params: CreateUserCredentialParam = {
        userId: 'user-123',
        email: 'test@example.com',
        passwordHash: 'hashed-password-123',
      };

      userCredentialRepository.findUserCredentials.mockResolvedValue(existingCredential);

      // Act & Assert
      try {
        await service.createCredential(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.USER_ALREADY_EXISTS);
      }
    });
  });

  describe('updateCredential', () => {
    it('should update user credential successfully', async () => {
      // Arrange
      const credential = UserCredential.create({
        userId: 'user-123',
        email: 'test@example.com',
        passwordHash: 'old-hash',
      });

      const params: UpdateCredentialParam = {
        userId: 'user-123',
      };

      userCredentialRepository.findUserCredentials.mockResolvedValue(credential);
      userCredentialRepository.updateUserCredential.mockResolvedValue(undefined);

      // Act
      await service.updateCredential(params);

      // Assert
      expect(userCredentialRepository.updateUserCredential).toHaveBeenCalledWith(credential);
    });

    it('should throw NOT_FOUND exception when credential does not exist', async () => {
      // Arrange
      const params: UpdateCredentialParam = {
        userId: 'non-existent-user',
      };

      userCredentialRepository.findUserCredentials.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.updateCredential(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });

  describe('deleteCredential', () => {
    it('should delete user credential successfully', async () => {
      // Arrange
      const credential = UserCredential.create({
        userId: 'user-123',
        email: 'test@example.com',
        passwordHash: 'hashed-password',
      });

      const params: DeleteUserCredentialParam = {
        userId: 'user-123',
      };

      userCredentialRepository.findUserCredentials.mockResolvedValue(credential);
      userCredentialRepository.deleteUserCredential.mockResolvedValue(undefined);

      // Act
      await service.deleteCredential(params);

      // Assert
      expect(userCredentialRepository.deleteUserCredential).toHaveBeenCalledTimes(1);
    });

    it('should throw NOT_FOUND exception when credential does not exist', async () => {
      // Arrange
      const params: DeleteUserCredentialParam = {
        userId: 'non-existent-user',
      };
      userCredentialRepository.findUserCredentials.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.deleteCredential(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });

  describe('findCredentialByEmail', () => {
    it('should find user credential by email successfully', async () => {
      // Arrange
      const credential = UserCredential.create({
        email: 'test@example.com',
        passwordHash: 'hashed_password',
        userId: 'user-123',
      });

      const params: FindCredentialByUserIdParam = {
        email: credential.email,
      };

      userCredentialRepository.findUserCredentialsByEmail.mockResolvedValue(credential);

      // Act

      const result = await service.findCredentialByEmail({
        email: credential.email,
      });

      // Assert
      expect(result.email).toBe(params.email);
    });

    it('should throw NOT_FOUND exception when credential does not exist', async () => {
      // Arrange
      const params: FindCredentialByUserIdParam = {
        email: 'non-extent-email',
      };
      userCredentialRepository.findUserCredentialsByEmail.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.findCredentialByEmail(params);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.NOT_FOUND);
      }
    });
  });
});

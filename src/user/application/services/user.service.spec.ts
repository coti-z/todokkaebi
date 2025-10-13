import { Test, TestingModule } from '@nestjs/testing';

import { ApplicationException, ErrorCode } from '@libs/exception';

import {
  PASSWORD_HASHER_OUTBOUND_PORT,
  PasswordHasherOutboundPort,
} from '@auth/application/port/out/password-hasher.port';

import { CreateUserParam } from '@user/application/dto/param/create-user.param';
import { DeleteUserParam } from '@user/application/dto/param/delete-user.param';
import { UpdateUserParam } from '@user/application/dto/param/update-user.param';
import {
  IUserRepository,
  UserRepositorySymbol,
} from '@user/application/port/out/i-user-repository.port';
import { UserService } from '@user/application/services/user.service';
import { User } from '@user/domain/entity/user.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<IUserRepository>;
  let passwordHasher: jest.Mocked<PasswordHasherOutboundPort>;

  beforeEach(async () => {
    const mockUserRepository: jest.Mocked<IUserRepository> = {
      createUser: jest.fn(),
      deleteUser: jest.fn(),
      findUserByEmail: jest.fn(),
      findUserById: jest.fn(),
      updateUser: jest.fn(),
    };
    const mockPasswordHasher: jest.Mocked<PasswordHasherOutboundPort> = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepositorySymbol,
          useValue: mockUserRepository,
        },
        {
          provide: PASSWORD_HASHER_OUTBOUND_PORT,
          useValue: mockPasswordHasher,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(UserRepositorySymbol);
    passwordHasher = module.get(PASSWORD_HASHER_OUTBOUND_PORT);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      // Arrange
      const param = new CreateUserParam(
        'test@example.com',
        'testUser',
        'plain-password',
        new Date('1990-01-01'),
      );
      const hashedPassword = 'hashed-password-123';

      userRepository.findUserByEmail.mockResolvedValue(null);
      passwordHasher.hash.mockResolvedValue(hashedPassword);
      userRepository.createUser.mockResolvedValue(undefined);

      // Act
      const result = await service.createUser(param);

      // Assert

      expect(result).toBeInstanceOf(User);
      expect(result.email).toBe(param.email);
      expect(result.nickname).toBe(param.nickname);
      expect(result.hashedPassword).toBe(hashedPassword);
    });

    it('should create a user without birthday', async () => {
      // Arrange
      const param = new CreateUserParam('test@example.com', 'testUser', 'plain-password');
      const hashedPassword = 'hashed-password-123';

      userRepository.findUserByEmail.mockResolvedValue(null);
      passwordHasher.hash.mockResolvedValue(hashedPassword);
      userRepository.createUser.mockResolvedValue(undefined);

      // Act
      const result = await service.createUser(param);

      // Assert
      expect(result).toBeInstanceOf(User);
      expect(result.birthday).toBeUndefined();
      expect(passwordHasher.hash).toHaveBeenCalledWith(param.password);
    });

    it('should throw USER_ALREADY_EXISTS exception when user with email already exists', async () => {
      // Arrange
      const existingUser = User.create({
        email: 'existing@example.com',
        hashedPassword: 'hashed',
        nickname: 'existingUser',
      });

      const param = new CreateUserParam('existing@example.com', 'newUser', 'password');
      userRepository.findUserByEmail.mockResolvedValue(existingUser);

      // Act & Assert
      try {
        await service.createUser(param);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.USER_ALREADY_EXISTS);
      }
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      // Arrange
      const existingUser = User.create({
        email: 'old@example.com',
        hashedPassword: 'hash',
        nickname: 'oldNick',
        birthday: new Date('1991-01-01'),
      });

      const param = new UpdateUserParam(
        existingUser.id,
        'new@example.com',
        'newnick',
        new Date('1995-05-05'),
      );

      userRepository.findUserById.mockResolvedValue(existingUser);
      userRepository.updateUser.mockResolvedValue(undefined);

      // Act
      const result = await service.updateUser(param);

      // Assert
      expect(result).toBe(existingUser);
      expect(result.email).toBe(param.email);
      expect(result.nickname).toBe(param.nickname);
      expect(result.birthday).toEqual(param.birthday);
    });

    it('should update user with partial data', async () => {
      const existingUser = User.create({
        email: 'test@example.ocm',
        hashedPassword: 'hashed',
        nickname: 'oldNick',
      });

      const originalEmail = existingUser.email;
      const originalBirthday = existingUser.birthday;
      const param = new UpdateUserParam(existingUser.id, undefined, 'newnick');
      userRepository.findUserById.mockResolvedValue(existingUser);
      userRepository.updateUser.mockResolvedValue(undefined);

      // Act
      const result = await service.updateUser(param);

      // Assert
      expect(result.nickname).toBe(param.nickname);
      expect(result.email).toBe(originalEmail);
      expect(result.birthday).toBe(originalBirthday);
    });

    it('should throw USER_NOT_FOUND exception when user does not exist', async () => {
      // Arrange
      const param = new UpdateUserParam('non-existent-id', 'new@example.com', 'newnick');
      userRepository.findUserById.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.updateUser(param);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.USER_NOT_FOUND);
      }
    });

    it('should update the updateAt timestamp', async () => {
      // Arrange
      const existingUser = User.create({
        email: 'test@example.com',
        hashedPassword: 'hashed',
        nickname: 'old-nick',
      });
      const originalUpdatedAt = existingUser.updatedAt;

      const param = new UpdateUserParam(existingUser.id, undefined, 'old-nick');
      userRepository.findUserById.mockResolvedValue(existingUser);
      userRepository.updateUser.mockResolvedValue(undefined);

      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      // Act
      const result = await service.updateUser(param);

      // Assert
      expect(result.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      // Arrange
      const existingUser = User.create({
        email: 'test@example.com',
        nickname: 'test-user',
        hashedPassword: 'hashed',
      });

      const param = new DeleteUserParam(existingUser.id);

      userRepository.findUserById.mockResolvedValue(existingUser);
      userRepository.deleteUser.mockResolvedValue(undefined);

      // Act
      const result = await service.deleteUser(param);

      // Assert
      expect(result).toBe(existingUser);
    });

    it('should throw USER_NOT_FOUND exception when user does not exist', async () => {
      // Arrange
      const param = new DeleteUserParam('non-existent-id');
      userRepository.findUserById.mockResolvedValue(null);

      // Act & Assert
      try {
        await service.deleteUser(param);
      } catch (error) {
        expect(error).toBeInstanceOf(ApplicationException);
        expect(error.errorCode).toBe(ErrorCode.USER_NOT_FOUND);
      }
    });
  });
});

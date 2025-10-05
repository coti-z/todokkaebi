import { Inject, Injectable } from '@nestjs/common';
import { ValidateUserParams } from '@auth/application/dto/params/validate-user.param';
import { UpdateCredentialParam } from '@auth/application/dto/params/update-credential.param';
import {
  FindUserCredentialByEmailArgs,
  IUserCredentialRepository,
  UserCredentialRepositorySymbol,
} from '@auth/application/port/out/user-credential-repository.port';
import { CreateUserCredentialParam } from '@auth/application/dto/params/create-user-credential.param';
import { UserCredential } from '@auth/domain/entity/user-credential.entity';
import { DeleteUserCredentialParam } from '@auth/application/dto/params/delete-user-credential.param';
import { ApplicationException, ErrorCode } from '@libs/exception';
import { FindCredentialByUserIdParam } from '@auth/application/dto/params/find-token-by-userid.param';

/**
 * 사용자 인증 관련 서비스를 제공하는 클래스입니다.
 * 사용자 자격 정보의 생성, 삭제, 업데이트, 검증 기능을 담당합니다.
 */
@Injectable()
export class UserCredentialService {
  constructor(
    @Inject(UserCredentialRepositorySymbol)
    private readonly userCredentialRepository: IUserCredentialRepository,
  ) {}

  /**
   * 새로운 사용자 자격 증명을 생성합니다.
   *
   * @param param - 사용자 자격 증명 생성을 위한 정보를 담은 파라미터
   * @returns 사용자 자격 증명 엔티티
   * @throws {ErrorCode.USER_ALREADY_EXISTS} 해당 사용자의 ID에 자격증명이 생성이 된 경우
   */
  async createCredential(
    param: CreateUserCredentialParam,
  ): Promise<UserCredential> {
    // 중복 이메일 확인
    const userCredential =
      await this.userCredentialRepository.findUserCredentials({
        userId: param.userId,
      });
    if (userCredential) {
      throw new ApplicationException(ErrorCode.USER_ALREADY_EXISTS);
    }
    const createdUserCredential = UserCredential.create({
      email: param.email,
      userId: param.userId,
      passwordHash: param.passwordHash,
    });
    await this.userCredentialRepository.createUserCredential(
      createdUserCredential,
    );
    return createdUserCredential;
  }

  /**
   * 기존 사용자 자격 증명의 정보를 업데이트합니다.
   *
   * @param param - 업데이트가 필요한 자격 증명 정보를 담은 파라미터
   * @throws {ErrorCode.NOT_FOUND} 업데이트할 자격 증명이 존재하지 않는 경우
   */
  async updateCredential(param: UpdateCredentialParam): Promise<void> {
    const userCredential =
      await this.userCredentialRepository.findUserCredentials({
        userId: param.userId,
      });

    if (!userCredential) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }

    await this.userCredentialRepository.updateUserCredential(userCredential);
  }

  /**
   * 사용자 자격 증명의 정보를 삭제합니다.
   *
   * @param param - 삭제에 필요한 자격 증명 정보를 담은 파리미터
   * @throws {ErrorCode.NOT_FOUND} 삭제할 자격 증명이 존재하지 않는 경우
   */
  async deleteCredential(param: DeleteUserCredentialParam): Promise<void> {
    // 있는지 확인하고 삭제
    const userCredential =
      await this.userCredentialRepository.findUserCredentials({
        userId: param.userId,
      });
    if (!userCredential) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }

    await this.userCredentialRepository.deleteUserCredential({
      id: userCredential.id,
    });
  }

  async findCredentialByEmail(
    param: FindCredentialByUserIdParam,
  ): Promise<UserCredential> {
    const userCredential =
      await this.userCredentialRepository.findUserCredentialsByEmail({
        email: param.email,
      });
    if (!userCredential) {
      throw new ApplicationException(ErrorCode.NOT_FOUND);
    }

    return userCredential;
  }
}

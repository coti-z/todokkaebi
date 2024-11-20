import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserModel } from '@src/user/domain/model/user.model';
import { LoginUserQuery } from '@src/auth/application/queries/login-user.query';
import { UserAuthService } from '@src/auth/domain/services/user-auth.service';
import { LoginDto } from '@src/auth/domain/model/login-user.model';

@Injectable()
@QueryHandler(LoginUserQuery)
export class LoginUserHandler implements IQueryHandler {
  constructor(private readonly userAuthService: UserAuthService) {}
  async execute(query: LoginUserQuery): Promise<UserModel> {
    try {
      return await this.userAuthService.authenticate(
        new LoginDto(query.email, query.password),
      );
    } catch (e) {
      throw e;
    }
  }
}

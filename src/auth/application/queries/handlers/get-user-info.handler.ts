import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserAuthService } from '@src/auth/application/services/user-auth.service';
import { GetUserInfoQuery } from '@src/auth/application/queries/get-user-info.query';
import { UserModel } from '@src/auth/domain/model/user.model';

@Injectable()
@QueryHandler(GetUserInfoQuery)
export class GetUserInfoHandler implements IQueryHandler<GetUserInfoQuery> {
  constructor(private readonly userAuthService: UserAuthService) {}
  async execute(query: GetUserInfoQuery): Promise<UserModel> {
    return await this.userAuthService.getUser(query.id);
  }
}

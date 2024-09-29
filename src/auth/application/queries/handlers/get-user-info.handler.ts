import { GetUserInfoQuery } from '@/auth/application/queries/get-user-info.query';
import { UserAuthService } from '@/auth/application/services/user-auth.service';
import { UserModel } from '@/auth/domain/model/user.model';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@Injectable()
@QueryHandler(GetUserInfoQuery)
export class GetUserInfoHandler implements IQueryHandler<GetUserInfoQuery> {
  constructor(private readonly userAuthService: UserAuthService) {}
  async execute(query: GetUserInfoQuery): Promise<UserModel> {
    return await this.userAuthService.getUser(query.id);
  }
}

import { Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserModel } from '@src/auth/domain/model/user.model';

@Resolver(() => UserModel)
export class UserAuthResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => )
  async login() {}

  async logout() {}
}

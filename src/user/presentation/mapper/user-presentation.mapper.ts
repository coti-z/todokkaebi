import { RequestContext } from '@libs/exception';

import { CreateUserCommand } from '@user/application/port/in/create-user.command';
import { DeleteUserCommand } from '@user/application/port/in/delete-user.command';
import { UpdateUserCommand } from '@user/application/port/in/update-user.command';
import { User } from '@user/domain/entity/user.entity';
import { CreateUserInput } from '@user/presentation/dto/graphql/inputs/graphql/create-user.input';
import { UpdateUserInput } from '@user/presentation/dto/graphql/inputs/graphql/update-user.input';
import { CreateUserResponse } from '@user/presentation/dto/controller/c-user.response';
import { CreateUserOutput } from '@user/presentation/dto/graphql/output/graphql/create-user.output';
import { DeleteUserOutput } from '@user/presentation/dto/graphql/output/graphql/delete-user.output';
import { UpdateUserOutput } from '@user/presentation/dto/graphql/output/graphql/update-user.output';

export class UserPresentationMapper {
  static toCreateUserCommand(
    input: CreateUserInput,
    context: RequestContext,
  ): CreateUserCommand {
    return new CreateUserCommand(
      input.email,
      input.nickname,
      input.password,
      context,
      input.birthday,
    );
  }

  static toUpdateUserCommand(
    userid: string,
    input: UpdateUserInput,
    context: RequestContext,
  ): UpdateUserCommand {
    return new UpdateUserCommand(
      userid,
      context,
      input.nickname,
      input.email,
      input.password,
    );
  }

  static toDeleteUserCommand(
    userId: string,
    context: RequestContext,
  ): DeleteUserCommand {
    return new DeleteUserCommand(userId, context);
  }

  static resultToCreateUserOutput(result: User): CreateUserOutput {
    return {
      id: result.id,
      createdAt: result.createdAt,
      email: result.email.getValue(),
      nickname: result.nickname.getValue(),
      updatedAt: result.updatedAt,
      birthday: result.birthday,
    };
  }

  static resultToUpdateUserOutput(result: User): UpdateUserOutput {
    return {
      userId: result.id,
    };
  }

  static resultToDeleteUserOutput(result: User): DeleteUserOutput {
    return {
      userId: result.id,
    };
  }

  static resultToRestApiUserResponse(result: User): CreateUserResponse {
    return {
      createdAt: result.createdAt,
      id: result.id,
      nickname: result.nickname.getValue(),
      email: result.email.getValue(),
      updatedAt: result.updatedAt,
      birthday: result.birthday,
      password: result.hashedPassword,
    };
  }
}

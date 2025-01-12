import { CreateUserInput } from '@user/presentation/dto/inputs/create-user.input';
import { CreateUserCommand } from '@user/application/commands/create-user.command';
import { User } from '@user/domain/entity/user.entity';
import { CreateUserOutput } from '@user/presentation/dto/output/create-user.output';
import { UpdateUserOutput } from '@user/presentation/dto/output/update-user.output';
import { DeleteUserOutput } from '@user/presentation/dto/output/delete-user.output';
import { UpdateUserInput } from '@user/presentation/dto/inputs/update-user.input';
import { UpdateUserCommand } from '@user/application/commands/update-user.command';
import { DeleteUserCommand } from '@user/application/commands/delete-user.command';

export class UserPresentationMapper {
  static toCreateUserCommand(input: CreateUserInput): CreateUserCommand {
    return new CreateUserCommand(
      input.email,
      input.nickname,
      input.password,
      input.birthday,
    );
  }

  static toUpdateUserCommand(
    userid: string,
    input: UpdateUserInput,
  ): UpdateUserCommand {
    return new UpdateUserCommand(
      userid,
      input.nickname,
      input.email,
      input.password,
    );
  }

  static toDeleteUserCommand(userId: string): DeleteUserCommand {
    return new DeleteUserCommand(userId);
  }

  static resultToCreateUserOutput(result: User): CreateUserOutput {
    return {
      id: result.id,
      createdAt: result.createdAt,
      email: result.email,
      nickname: result.nickname,
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
}

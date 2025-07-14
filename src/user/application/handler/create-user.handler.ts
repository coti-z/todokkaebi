import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '@user/application/services/user.service';
import { User } from '@user/domain/entity/user.entity';
import { CreateUserCommand } from '@user/application/port/in/create-user.command';
import { CreateUserParam } from '@user/application/dto/param/create-user.param';
import { UserCredentialService } from '@auth/application/services/user-credential.service';
import {
  ITransactionManager,
  PrismaService,
  Transactional,
  TransactionContext,
  TransactionManagerSymbol,
} from '@libs/database';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly userCredentialService: UserCredentialService,
    @Inject(TransactionManagerSymbol)
    private readonly transactionManager: ITransactionManager,
  ) {}

  @Transactional()
  async execute(command: CreateUserCommand): Promise<User> {
    const user = await this.userService.createUser(
      new CreateUserParam(
        command.email,
        command.nickname,
        command.password,
        command.birthday,
      ),
    );
    await this.userCredentialService.createCredential({
      email: user.email,
      passwordHash: user.hashedPassword,
      userId: user.id,
    });
    return user;
  }
}

import { ResponseManager } from '@libs/response';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TaskPresentationMapper } from '../mapper/task.presentation.mapper';
import { CreateTaskInput } from './input/task.input';
import { CreateTaskResponse } from './response/task.response';

@Resolver()
export class TaskResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => CreateTaskResponse)
  async createTask(
    @Args('input') input: CreateTaskInput,
  ): Promise<CreateTaskResponse> {
    const command = TaskPresentationMapper.createInputToCreateTaskCommand(
      input,
      'test',
    );
    const result = await this.commandBus.execute(command);
    const output =
      await TaskPresentationMapper.entityToCreateTaskOutput(result);
    return ResponseManager.success(output);
  }
}

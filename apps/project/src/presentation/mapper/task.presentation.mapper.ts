import { Task } from '@project/domain/entity/task.entity';
import { TaskType } from '@project/presentation/resolver/type/task.type';
import { CreateTaskInput } from '../resolver/input/task.input';
import { CreateTaskCommand } from '@project/application/command/task/create-task.command';
import { CreateTaskOutput } from '../resolver/output/task.output';

export class TaskPresentationMapper {
  static entityToObjectType(entity: Task): TaskType {
    return {
      actualEndDate: entity.actualEndDate,
      actualStartDate: entity.actualStartDate,
      categoryId: entity.categoryId,
      check: entity.check,
      endDate: entity.endDate,
      createdAt: entity.createdAt,
      startDate: entity.startDate,
      status: entity.status,
      title: entity.title,
      updateAt: entity.updatedAt,
      id: entity.id,
    };
  }

  static entitiesToObjectType(entities: Task[]): TaskType[] {
    return entities.map(entity => this.entityToObjectType(entity));
  }

  static createInputToCreateTaskCommand(
    input: CreateTaskInput,
    reqUserId: string,
  ): CreateTaskCommand {
    return new CreateTaskCommand(
      input.title,
      input.categoryId,
      input.startDate,
      input.endDate,
      reqUserId,
    );
  }

  static entityToCreateTaskOutput(entity: Task): CreateTaskOutput {
    return this.entityToObjectType(entity);
  }
}

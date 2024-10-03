import { CreateTaskCommand } from '@/todo/application/commands/create-task.command';
import { DeleteTaskCommand } from '@/todo/application/commands/delete-task.command';
import { UpdateTaskCommand } from '@/todo/application/commands/update-task.command';
import { TaskModel } from '@/todo/domain/model/task.model';
import { TaskRepository } from '@/todo/infrastructure/database/repository/task.repository';
import { ErrorCode } from '@/utils/exception/error-code.enum';
import { errorFactory } from '@/utils/exception/error-factory.exception';
import { Injectable } from '@nestjs/common';
import { TaskState } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(command: CreateTaskCommand): Promise<TaskModel> {
    return await this.taskRepository.createTask({
      title: command.title,
      startDate: command.startDate,
      endDate: command.endDate,
      Category: {
        connect: {
          id: command.categoryId,
        },
      },
    });
  }

  async deleteTask(command: DeleteTaskCommand): Promise<TaskModel> {
    return await this.taskRepository.deleteTask(command.id);
  }

  async updateTask(command: UpdateTaskCommand): Promise<TaskModel> {
    if (command.check) {
      const task = await this.taskRepository.updateTask(command.id, {
        title: command.title,
        check: command.check,
        startDate: command.startDate,
        endDate: command.endDate,
        status: TaskState.COMPLETE,
        Category: {
          connect: {
            id: command.categoryId,
          },
        },
      });
      return task;
    }
    const task = await this.taskRepository.updateTask(command.id, {
      title: command.title,
      check: command.check,
      startDate: command.startDate,
      endDate: command.endDate,
      Category: {
        connect: {
          id: command.categoryId,
        },
      },
    });
    return task;
  }
  async getTaskWithTaskId(taskId: string): Promise<TaskModel> {
    const task = await this.taskRepository.getTask(taskId);
    if (!task) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }

    return task;
  }
  async getAllTasksWithCategoryId(categoryId: string): Promise<TaskModel[]> {
    return await this.taskRepository.getAllTasksWithCategoryId(categoryId);
  }

  async validateTaskWithUserId(taskId: string, userId: string): Promise<void> {
    const taskUserId =
      await this.taskRepository.getTaskUserIdWithTaskId(taskId);

    if (!taskUserId) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    if (taskUserId !== userId) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
  }
}

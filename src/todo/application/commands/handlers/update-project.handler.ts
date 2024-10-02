import { UpdateProjectCommand } from '@/todo/application/commands/update-project.command';
import { CategoryService } from '@/todo/application/services/category.service';
import { ProjectService } from '@/todo/application/services/project.serivce';
import { TaskService } from '@/todo/application/services/task.service';
import { TaskModel } from '@/todo/domain/model/task.model';
import { ProjectResponseObject } from '@/todo/presentation/resolvers/dto/objects/project-response.object';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly categoryService: CategoryService,
    private readonly taskService: TaskService,
  ) {}
  async execute(command: UpdateProjectCommand): Promise<ProjectResponseObject> {
    try {
      const project = await this.projectService.updateProject(command);

      return {
        success: true,
        project,
      };
    } catch (e) {
      throw e;
    }
  }
}

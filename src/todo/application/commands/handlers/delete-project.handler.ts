import { DeleteProjectCommand } from '@/todo/application/commands/delete-project.command';
import { ProjectService } from '@/todo/application/services/project.serivce';
import { ProjectResponse } from '@/todo/presentation/resolvers/dto/objects/project.response';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler
  implements ICommandHandler<DeleteProjectCommand>
{
  constructor(private readonly projectService: ProjectService) {}
  async execute(command: DeleteProjectCommand): Promise<ProjectResponse> {
    try {
      const project = await this.projectService.deleteProject(command);
      return {
        success: true,
        project,
      };
    } catch (e) {
      throw e;
    }
  }
}

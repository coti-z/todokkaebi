import { UpdateProjectCommand } from '@/todo/application/commands/update-project.command';
import { ProjectService } from '@/todo/application/services/project.serivce';
import { ProjectResponse } from '@/todo/presentation/resolvers/dto/objects/project.response';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(private readonly projectService: ProjectService) {}
  async execute(command: UpdateProjectCommand): Promise<ProjectResponse> {
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

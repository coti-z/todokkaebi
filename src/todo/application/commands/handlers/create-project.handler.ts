import { CreateProjectCommand } from '@/todo/application/commands/create-project.command';
import { ProjectService } from '@/todo/application/services/project.serivce';
import { ProjectResponse } from '@/todo/presentation/resolvers/dto/objects/project.response';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(private readonly projectService: ProjectService) {}
  async execute(command: CreateProjectCommand): Promise<ProjectResponse> {
    try {
      const project = await this.projectService.createProject(command);
      return {
        success: true,
        project,
      };
    } catch (e) {
      throw e;
    }
  }
}

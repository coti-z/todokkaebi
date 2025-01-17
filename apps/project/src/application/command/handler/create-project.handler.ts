import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectService } from '@project/application/service/project.service';
import { Injectable } from '@nestjs/common';
import { Project } from '@project/domain/entity/project.entity';
import { CreateProjectCommand } from '@project/application/command/create-project.command';

@Injectable()
@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(private readonly projectService: ProjectService) {}
  async execute(command: CreateProjectCommand): Promise<Project> {
    try {
      return await this.projectService.createProject({
        name: command.name,
        userId: command.userId,
      });
    } catch (error) {
      throw error;
    }
  }
}

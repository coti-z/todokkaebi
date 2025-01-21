import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProjectCommand } from '@project/application/command/unit-project/update-project.command';
import { Project } from '@project/domain/entity/project.entity';
import { ProjectService } from '@project/application/service/project.service';

@Injectable()
@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(private readonly projectService: ProjectService) {}
  async execute(command: UpdateProjectCommand): Promise<Project> {
    return await this.projectService.updateProject({
      projectId: command.projectId,
      userId: command.userId,
      name: command.projectName,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProjectCommand } from '@project/application/command/unit-project/delete-project.command';
import { ProjectService } from '@project/application/service/project.service';
import { Project } from '@project/domain/entity/project.entity';

@Injectable()
@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler
  implements ICommandHandler<DeleteProjectCommand>
{
  constructor(private readonly projectService: ProjectService) {}
  async execute(command: DeleteProjectCommand): Promise<Project> {
    return await this.projectService.deleteProject({
      adminId: command.projectId,
      id: command.adminId,
    });
  }
}

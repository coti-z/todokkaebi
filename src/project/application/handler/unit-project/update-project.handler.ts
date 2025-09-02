import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Project } from '@project/domain/entity/project.entity';
import { ProjectService } from '@project/application/service/project.service';
import { UpdateProjectCommand } from '@project/application/port/in/command/unti-project/update-project.command';
import { ErrorHandlingStrategy } from '@libs/exception';

@Injectable()
@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(
    private readonly projectService: ProjectService,
    private readonly errorHandlingStrategy: ErrorHandlingStrategy,
  ) {}
  async execute(command: UpdateProjectCommand): Promise<Project> {
    try {
      return await this.projectService.updateProject({
        name: command.projectName,
        id: command.projectId,
        adminId: command.userId,
      });
    } catch (error) {
      this.errorHandlingStrategy.handleError(error, command.context);
    }
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectService } from '@project/application/service/project.service';
import { Injectable } from '@nestjs/common';
import { Project } from '@project/domain/entity/project.entity';
import { CreateProjectCommand } from '@project/application/port/in/command/unti-project/create-project.command';
import { ErrorHandlingStrategy } from '@libs/exception';
import { ProjectMembershipService } from '@project/application/service/project-membership.service';
import { MembershipRole } from '@project/domain/value-objects/membership-role.vo';

@Injectable()
@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(
    private readonly projectMembershipService: ProjectMembershipService,
    private readonly projectService: ProjectService,
  ) {}
  async execute(command: CreateProjectCommand): Promise<Project> {
    try {
      const project = await this.projectService.createProject({
        name: command.name,
        adminId: command.userId,
      });
      await this.projectMembershipService.enrollProjectMembership({
        projectId: project.id,
        role: MembershipRole.OWNER,
        userId: command.userId,
      });

      return project;
    } catch (error) {
      ErrorHandlingStrategy.handleError(error);
    }
  }
}

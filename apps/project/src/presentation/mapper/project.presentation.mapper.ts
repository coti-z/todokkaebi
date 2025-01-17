import { CreateProjectInput } from '@project/presentation/resolver/project/input/create-project.input';
import { CreateProjectCommand } from '@project/application/command/create-project.command';
import { Project } from '@project/domain/entity/project.entity';
import { CreateProjectOutput } from '@project/presentation/resolver/project/output/create-prioject.output';
import { DeleteProjectInput } from '@project/presentation/resolver/project/input/delete-project.input';
import { DeleteProjectCommand } from '@project/application/command/delete-project.command';
import { DeleteProjectOutput } from '@project/presentation/resolver/project/output/delete-project.output';

export class ProjectPresentationResolverMapper {
  static toCreateProjectCommand(
    input: CreateProjectInput,
    userId: string,
  ): CreateProjectCommand {
    return new CreateProjectCommand(userId, input.name);
  }

  static toDeleteProjectCommand(
    input: DeleteProjectInput,
    userId: string,
  ): DeleteProjectCommand {
    return new DeleteProjectCommand(input.projectId, userId);
  }

  static createProjectToOutput(entity: Project): CreateProjectOutput {
    return {
      name: entity.name,
      projectId: entity.id,
      adminId: entity.adminId,
      id: entity.id,
    };
  }

  static deleteProjectToOutput(entity: Project): DeleteProjectOutput {
    return {
      projectId: entity.id,
    };
  }
}

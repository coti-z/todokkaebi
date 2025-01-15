import { CreateProjectInput } from '@project/presentation/resolver/project/input/create-project.input';
import { CreateProjectCommand } from '@project/application/command/create-project.command';
import { Project } from '@project/domain/entity/project.entity';
import { CreateProjectOutput } from '@project/presentation/resolver/project/output/create-prioject.output';

export class ProjectPresentationResolverMapper {
  static toCreateProjectCommand(
    input: CreateProjectInput,
    userId: string,
  ): CreateProjectCommand {
    return new CreateProjectCommand(userId, input.name);
  }

  static createProjectToOutput(entity: Project): CreateProjectOutput {
    return {
      name: entity.name,
      projectId: entity.id,
      adminId: entity.adminId,
      id: entity.id,
    };
  }
}

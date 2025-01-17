import { CreateProjectInput } from '@project/presentation/resolver/project/input/create-project.input';
import { CreateProjectCommand } from '@project/application/command/create-project.command';
import { Project } from '@project/domain/entity/project.entity';
import { CreateProjectOutput } from '@project/presentation/resolver/project/output/create-prioject.output';
import { DeleteProjectInput } from '@project/presentation/resolver/project/input/delete-project.input';
import { DeleteProjectCommand } from '@project/application/command/delete-project.command';
import { DeleteProjectOutput } from '@project/presentation/resolver/project/output/delete-project.output';
import { QueryProjectInput } from '@project/presentation/resolver/project/input/query-project.input';
import { ProjectByIdQuery } from '@project/application/query/project-by-id.query';
import { ProjectsByUserIdQuery } from '@project/application/query/projects-by-userid.query';
import { ProjectType } from '@project/presentation/resolver/type/project.type';
import { CategoryPresentationMapper } from '@project/presentation/mapper/category.presentation.mapper';
import { ProjectInvitationPresentationMapper } from '@project/presentation/mapper/project-invitation.presentation.mapper';
import { ProjectMembershipPresentationMapper } from '@project/presentation/mapper/project-membership.presentation.mapper';
import { QueryProjectOutput } from '@project/presentation/resolver/project/output/query-project.output';
import { QueryProjectsOutput } from '@project/presentation/resolver/project/output/query-projects.output';

export class ProjectPresentationMapper {
  static entityToObjectType(entity: Project): ProjectType {
    const categoriesType = CategoryPresentationMapper.entitiesToObjectType(
      entity.categories,
    );
    const invitationsType =
      ProjectInvitationPresentationMapper.entitiesToObjectType(
        entity.projectInvitations,
      );
    const membershipsType =
      ProjectMembershipPresentationMapper.entitiesToObjectType(
        entity.memberships,
      );
    return {
      projectInvitations: invitationsType,
      memberships: membershipsType,
      categories: categoriesType,
      name: entity.name,
      adminId: entity.adminId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    };
  }
  static entitiesToObjectType(entities: Project[]): ProjectType[] {
    return entities.map(entity => this.entityToObjectType(entity));
  }
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

  static toProjectQuery(
    input: QueryProjectInput,
    userId: string,
  ): ProjectByIdQuery {
    return new ProjectByIdQuery(userId, input.projectId);
  }

  static toProjectsQuery(userId: string): ProjectsByUserIdQuery {
    return new ProjectsByUserIdQuery(userId);
  }

  static createProjectToOutput(entity: Project): CreateProjectOutput {
    return {
      name: entity.name,
      adminId: entity.adminId,
      id: entity.id,
    };
  }

  static deleteProjectToOutput(entity: Project): DeleteProjectOutput {
    return {
      id: entity.id,
    };
  }

  static queryProjectToOutput(entity: Project): QueryProjectOutput {
    return this.entityToObjectType(entity);
  }

  static queryProjectsToOutput(entities: Project[]): QueryProjectsOutput {
    return {
      projects: this.entitiesToObjectType(entities),
    };
  }
}

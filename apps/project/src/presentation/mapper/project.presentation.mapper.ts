import { CreateProjectCommand } from '@project/application/command/unit-project/create-project.command';
import { Project } from '@project/domain/entity/project.entity';
import { DeleteProjectCommand } from '@project/application/command/unit-project/delete-project.command';
import { ProjectByIdQuery } from '@project/application/query/project-by-id.query';
import { ProjectsByUserIdQuery } from '@project/application/query/projects-by-userid.query';
import { ProjectType } from '@project/presentation/resolver/type/project.type';
import { CategoryPresentationMapper } from '@project/presentation/mapper/category.presentation.mapper';
import { ProjectInvitationPresentationMapper } from '@project/presentation/mapper/project-invitation.presentation.mapper';
import { ProjectMembershipPresentationMapper } from '@project/presentation/mapper/project-membership.presentation.mapper';
import {
  CreateProjectInput,
  DeleteProjectInput,
  QueryProjectInput,
  UpdateProjectInput,
} from '@project/presentation/resolver/input/project.input';
import {
  CreateProjectOutput,
  DeleteProjectOutput,
  QueryProjectOutput,
  QueryProjectsOutput,
  UpdateProjectOutput,
} from '@project/presentation/resolver/output/project.output';
import { UpdateProjectCommand } from '@project/application/command/unit-project/update-project.command';

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

  static toUpdateProjectCommand(
    input: UpdateProjectInput,
    userId: string,
  ): UpdateProjectCommand {
    return new UpdateProjectCommand(userId, input.projectId, input.name);
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
  static updateProjectToOutput(entity: Project): UpdateProjectOutput {
    return {
      name: entity.name,
      adminId: entity.adminId,
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

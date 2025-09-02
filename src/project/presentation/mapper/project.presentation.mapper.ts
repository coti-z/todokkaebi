import { Project } from '@project/domain/entity/project.entity';
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
import { CreateProjectCommand } from '@project/application/port/in/command/unti-project/create-project.command';
import { DeleteProjectCommand } from '@project/application/port/in/command/unti-project/delete-project.command';
import { UpdateProjectCommand } from '@project/application/port/in/command/unti-project/update-project.command';
import { RequestContext } from '@libs/exception';

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
        entity.projectMemberships,
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
    context: RequestContext,
  ): CreateProjectCommand {
    return new CreateProjectCommand(userId, input.name, context);
  }

  static toDeleteProjectCommand(
    input: DeleteProjectInput,
    userId: string,
    context: RequestContext,
  ): DeleteProjectCommand {
    return new DeleteProjectCommand(input.projectId, userId, context);
  }

  static toUpdateProjectCommand(
    input: UpdateProjectInput,
    userId: string,
    context: RequestContext,
  ): UpdateProjectCommand {
    return new UpdateProjectCommand(
      userId,
      input.projectId,
      input.name,
      context,
    );
  }

  static toProjectQuery(
    input: QueryProjectInput,
    userId: string,
    context: RequestContext,
  ): ProjectByIdQuery {
    return new ProjectByIdQuery(userId, input.projectId, context);
  }

  static toProjectsQuery(
    userId: string,

    context: RequestContext,
  ): ProjectsByUserIdQuery {
    return new ProjectsByUserIdQuery(userId, context);
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

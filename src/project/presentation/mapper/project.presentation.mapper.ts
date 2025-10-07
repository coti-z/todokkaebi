import { RequestContext } from '@libs/exception';

import { ProjectReadModel } from '@project/application/dto/project-read.model';
import { CreateProjectCommand } from '@project/application/port/in/command/unti-project/create-project.command';
import { DeleteProjectCommand } from '@project/application/port/in/command/unti-project/delete-project.command';
import { UpdateProjectCommand } from '@project/application/port/in/command/unti-project/update-project.command';
import { ProjectByIdQuery } from '@project/application/port/in/query/project/project-by-id.query';
import { ProjectsByUserIdQuery } from '@project/application/port/in/query/project/projects-by-userid.query';
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
import { ProjectType } from '@project/presentation/resolver/type/project.type';

export class ProjectPresentationMapper {
  static readModelToObjectType(readModel: ProjectReadModel): ProjectType {
    const categoriesType = CategoryPresentationMapper.readModelsToObjectType(
      readModel.categories,
    );
    const invitationsType =
      ProjectInvitationPresentationMapper.readModelsToObjectType(
        readModel.projectInvitations,
      );
    const membershipsType =
      ProjectMembershipPresentationMapper.readModelsToObjectType(
        readModel.projectMemberships,
      );
    return {
      id: readModel.id,
      projectInvitations: invitationsType,
      memberships: membershipsType,
      categories: categoriesType,
      name: readModel.name,
      adminId: readModel.adminId,
      createdAt: new Date(readModel.createdAt),
      updatedAt: new Date(readModel.updatedAt),
    };
  }
  static entitiesToObjectType(entities: ProjectReadModel[]): ProjectType[] {
    return entities.map(readModel => this.readModelToObjectType(readModel));
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

  static createProjectToOutput(
    readModel: ProjectReadModel,
  ): CreateProjectOutput {
    return {
      name: readModel.name,
      adminId: readModel.adminId,
      id: readModel.id,
    };
  }

  static deleteProjectToOutput(
    readModel: ProjectReadModel,
  ): DeleteProjectOutput {
    return {
      id: readModel.id,
    };
  }
  static updateProjectToOutput(
    readModel: ProjectReadModel,
  ): UpdateProjectOutput {
    return {
      name: readModel.name,
      adminId: readModel.adminId,
      id: readModel.id,
    };
  }

  static queryProjectToOutput(readModel: ProjectReadModel): QueryProjectOutput {
    return this.readModelToObjectType(readModel);
  }

  static queryProjectsToOutput(
    entities: ProjectReadModel[],
  ): QueryProjectsOutput {
    return {
      projects: this.entitiesToObjectType(entities),
    };
  }
}

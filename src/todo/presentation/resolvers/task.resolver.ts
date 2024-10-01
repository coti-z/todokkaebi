import { Resolver } from '@nestjs/graphql';

@Resolver()
export class TaskResolver {
  async createTask() {}

  async getTask() {}

  async getTasks() {}

  async updateTask() {}
  async deleteProject() {}
}

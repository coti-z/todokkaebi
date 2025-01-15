import { Injectable } from '@nestjs/common';
import { CreateProjectParam } from '../param/create-project.param';

@Injectable()
export class ProjectService {
  async createProject(params: CreateProjectParam): Promise<void> {}
}

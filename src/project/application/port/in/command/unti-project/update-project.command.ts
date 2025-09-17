import { RequestContext } from '@libs/exception';
import { ICommand } from '@nestjs/cqrs';

export class UpdateProjectCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly projectId: string,
    public readonly projectName: string,

    public readonly context: RequestContext,
  ) {}
}

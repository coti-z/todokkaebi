import { RequestContext } from '@libs/exception';
import { ICommand } from '@nestjs/cqrs';

export class DeleteProjectCommand implements ICommand {
  constructor(
    public readonly projectId: string,
    public readonly adminId: string,

    public readonly context: RequestContext,
  ) {}
}

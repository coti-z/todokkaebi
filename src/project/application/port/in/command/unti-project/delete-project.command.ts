import { ICommand } from '@nestjs/cqrs';

import { RequestContext } from '@libs/exception';

export class DeleteProjectCommand implements ICommand {
  constructor(
    public readonly projectId: string,
    public readonly adminId: string,

    public readonly context: RequestContext,
  ) {}
}

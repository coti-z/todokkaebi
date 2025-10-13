import { RequestContext } from '@libs/exception';

export class DeleteUserCredentialParams {
  constructor(
    public readonly userId: string,
    public readonly context: RequestContext,
  ) {}
}

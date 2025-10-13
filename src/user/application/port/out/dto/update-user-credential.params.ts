import { RequestContext } from '@libs/exception';

export class UpdateUserCredentialParams {
  constructor(
    public readonly userId: string,
    public readonly context: RequestContext,
    public readonly email?: string,
    public readonly passwordHash?: string,
  ) {}
}

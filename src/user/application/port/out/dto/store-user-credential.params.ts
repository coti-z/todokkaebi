import { RequestContext } from '@libs/exception';

export class StoreUserCredentialParams {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly context: RequestContext,
  ) {}
}

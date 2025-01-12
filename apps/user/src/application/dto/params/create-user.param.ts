export class CreateUserParam {
  constructor(
    public readonly email: string,
    public readonly nickname: string,
    public readonly password: string,
    public readonly birthday?: Date,
  ) {}
}

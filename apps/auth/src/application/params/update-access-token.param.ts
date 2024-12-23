export class ReissueTokenParam {
  constructor(
    public readonly userId: string,
    public readonly refreshToken: string,
  ) {}
}

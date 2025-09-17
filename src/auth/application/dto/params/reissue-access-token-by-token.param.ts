export class ReissuedAccessTokenByTokenParam {
  constructor(
    public readonly userId: string,
    public readonly refreshToken: string,
    public readonly accessToken: string,
    public readonly refreshTokenExpiresAt: Date,
  ) {}
}

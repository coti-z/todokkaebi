export const TOKEN_VALIDATION_INBOUND_PORT = Symbol(
  'TOKEN_VALIDATION_INBOUND_PORT',
);

export interface TokenValidationInboundPort {
  validateAccessTokenNotRevoke(accessToken: string): Promise<void>;
}

export const TOKEN_VALIDATION_INBOUND_PORT = Symbol(
  'TOKEN_VALIDATION_INBOUND_PORT',
);

export interface TokenValidationOutboundPort {
  validateTokenNotRevoked(accessToken: string): Promise<boolean>;
}

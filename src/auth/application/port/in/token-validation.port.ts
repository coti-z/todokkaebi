export const TOKEN_VALIDATION_INBOUND_PORT = Symbol(
  'TOKEN_VALIDATION_INBOUND_PORT',
);

export interface TokenValidationInboundPort {
  validationToken(accessToken: string): Promise<boolean>;
}

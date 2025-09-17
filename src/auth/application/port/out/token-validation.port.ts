export const TOKEN_VALIDATION_OUTBOUND_PORT = Symbol(
  'TOKEN_VALIDATION_OUTBOUND_PORT',
);

export interface TokenValidationOutboundPort {
  isTokenRevoked(accessToken: string): Promise<void>;
}

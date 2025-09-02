export interface RequestContext {
  requestId?: string;
  correlationId?: string;
  userAgent?: string;
  ipAddress?: string;
  timestamp?: Date;

  operationName?: string;
}

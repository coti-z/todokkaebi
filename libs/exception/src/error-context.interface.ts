export interface ErrorContext {
  // 필수 정보
  operation: string;

  // 선택 정보
  userId?: string;
  resourceId?: string;
  requestId?: string;
  correlationId?: string;

  // 메타데이터
  timestamp?: Date;
  userAgent?: string;
  ipAddress?: string;
  metadata?: Record<string, any>;
}

export interface RequestContext {
  requestId?: string;
  correlationId?: string;
  userAgent?: string;
  ipAddress?: string;
  timestamp?: Date;
}
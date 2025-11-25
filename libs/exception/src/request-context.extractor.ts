import { randomUUID } from 'crypto';

import { Request } from 'express';

import { GraphQLContext } from './graphql-context.interface';
import { RequestContext } from './request-context.interface';

export class RequestContextExtractor {
  /**
   * GraphQL Context에서 HTTP 요청 정보를 추출하여 RequestContext를 생성합니다.
   * 가이드의 Resolver 예시에서 반복되는 로직을 하나의 함수로 통합
   */
  static fromGraphQLContext(gqlContext: GraphQLContext): RequestContext {
    const request = gqlContext?.req;

    if (!request) {
      return { timestamp: new Date() };
    }

    return {
      requestId: this.extractRequestId(request),
      correlationId: this.extractCorrelationId(request),
      userAgent: this.extractUserAgent(request),
      ipAddress: this.extractIpAddress(request),
      timestamp: new Date(),
      operationName: this.extractOperationName(request),
    };
  }

  static extractOperationName(request: Request): string {
    return request.body?.operationName || 'Unknown';
  }

  /**
   * HTTP 헤더에서 Request ID 추출 또는 생성
   * 가이드 예시: request.headers['x-request-id'] || generateRequestId()
   */
  static extractRequestId(request: Request): string {
    const id =
      this.getHeaderAsString(request, 'x-request-id') ||
      this.getHeaderAsString(request, 'X-Request-Id');
    return id || this.generateRequestId();
  }

  /**
   * HTTP 헤더에서 Correlation ID 추출 또는 생성
   * 가이드 예시: 마이크로서비스, API Gateway 추적 ID 고려
   */
  static extractCorrelationId(request: Request): string {
    const id =
      this.getHeaderAsString(request, 'x-correlation-id') ||
      this.getHeaderAsString(request, 'X-Correlation-Id') ||
      this.getHeaderAsString(request, 'x-trace-id') ||
      this.getHeaderAsString(request, 'X-Trace-Id');
    return id || this.generateCorrelationId();
  }

  /**
   * HTTP 헤더에서 User Agent 추출
   */
  static extractUserAgent(request: Request): string | undefined {
    return (
      this.getHeaderAsString(request, 'user-agent') ||
      this.getHeaderAsString(request, 'User-Agent')
    );
  }

  /**
   * 클라이언트 IP 주소 추출
   * 가이드 예시의 프록시, 로드밸런서 고려 로직 구현
   */
  static extractIpAddress(request: Request): string {
    // 방법 C: 프록시 헤더 고려 (가이드 예시)
    const forwardedFor = this.getHeaderAsString(request, 'x-forwarded-for');
    if (forwardedFor) {
      const ips = forwardedFor.split(',').map((ip: string) => ip.trim());
      return this.normalizeIpv4(ips[0]);
    }

    // 방법 D: x-real-ip 헤더
    const realIp = this.getHeaderAsString(request, 'x-real-ip');
    if (realIp) {
      return this.normalizeIpv4(realIp);
    }

    // 방법 A: Express의 req.ip
    if (request.ip) {
      return this.normalizeIpv4(request.ip);
    }

    // 방법 B: 소켓에서 직접
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const socket = (request as any).socket;
    if (socket?.remoteAddress) {
      return this.normalizeIpv4(socket.remoteAddress);
    }

    return 'unknown';
  }

  /**
   * 헤더 값을 문자열로 안전하게 추출
   * Express headers는 string | string[] | undefined를 반환하므로 처리 필요
   */
  private static getHeaderAsString(
    request: Request,
    headerName: string,
  ): string | undefined {
    const value = request.headers[headerName];

    if (!value) {
      return undefined;
    }

    // string[] 타입인 경우 첫 번째 값만 사용
    if (Array.isArray(value)) {
      return value[0];
    }

    return value;
  }

  /**
   * 가이드 예시: IPv4 추출 로직
   * "::ffff:192.168.1.100" → "192.168.1.100"
   */
  private static normalizeIpv4(ip: string): string {
    if (!ip) return 'unknown';

    // IPv6 형식의 IPv4 주소 처리
    if (ip.startsWith('::ffff:')) {
      return ip.replace('::ffff:', '');
    }

    if (ip === '::1') {
      return '127.0.0.1';
    }

    return ip.trim();
  }

  /**
   * 가이드 예시: 서버에서 Request ID 생성
   * `req-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
   */
  static generateRequestId(): string {
    return `req-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }

  /**
   * 가이드 예시: Correlation ID 생성 (UUID 라이브러리 사용)
   */
  static generateCorrelationId(): string {
    return `corr-${randomUUID()}`;
  }

  /**
   * Event 수신 시 새로운 RequestContext를 생성합니다.
   * Kafka/Redis Event 리스너에서 사용되며, 원래 HTTP 요청 정보가 없을 때 활용합니다.
   *
   * @param eventContext - Kafka/Redis 또는 기타 메시징 시스템의 Context
   * @param correlationId - 원래 요청의 Correlation ID (트레이싱용)
   * @returns 새로운 RequestContext
   *
   * @example
   * ```typescript
   * const context = RequestContextExtractor.fromEventContext(
   *   natsContext,
   *   event.correlationId
   * );
   * ```
   */
  static fromEventContext(correlationId?: string): RequestContext {
    return {
      requestId: this.generateRequestId(),
      correlationId: correlationId || this.generateCorrelationId(),
      timestamp: new Date(),
      operationName: 'EventHandling',
    };
  }

  /**
   * Event Context에서 operation 이름 추출
   * Kafka: topic, Redis: key, 등 메시징 시스템별로 다름
   */
  private static extractEventOperationName(eventContext?: any): string {
    if (!eventContext) {
      return 'EventHandling';
    }

    // Kafka/NestJS Microservices Context
    if (eventContext.getTopic?.()) {
      return `event:${eventContext.getTopic()}`;
    }

    // Redis Pub/Sub Context
    if (eventContext.getChannel?.()) {
      return `event:${eventContext.getChannel()}`;
    }

    return 'EventHandling';
  }

  /**
   * Rest Api의 Request에서 Context 추출
   */
  static fromHttpRequest(request: Request): RequestContext {
    return {
      requestId: this.extractRequestId(request),
      correlationId: this.extractCorrelationId(request),
      userAgent: this.extractUserAgent(request),
      ipAddress: this.extractIpAddress(request),
      timestamp: new Date(),
      operationName: `${request.method} ${request.path}`,
    };
  }
}

import { RequestContext } from './request-context.interface';
import { randomUUID } from 'crypto';

export class RequestContextExtractor {
  /**
   * GraphQL Context에서 HTTP 요청 정보를 추출하여 RequestContext를 생성합니다.
   * 가이드의 Resolver 예시에서 반복되는 로직을 하나의 함수로 통합
   */
  static fromGraphQLContext(gqlContext: any): RequestContext {
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

  static extractOperationName(request: any): string {
    return request.body.operationName || 'Unknown';
  }

  /**
   * HTTP 헤더에서 Request ID 추출 또는 생성
   * 가이드 예시: request.headers['x-request-id'] || generateRequestId()
   */
  static extractRequestId(request: any): string {
    return (
      request.headers['x-request-id'] ||
      request.headers['X-Request-Id'] ||
      this.generateRequestId()
    );
  }

  /**
   * HTTP 헤더에서 Correlation ID 추출 또는 생성
   * 가이드 예시: 마이크로서비스, API Gateway 추적 ID 고려
   */
  static extractCorrelationId(request: any): string {
    return (
      request.headers['x-correlation-id'] ||
      request.headers['X-Correlation-Id'] ||
      request.headers['x-trace-id'] ||
      request.headers['X-Trace-Id'] ||
      this.generateCorrelationId()
    );
  }

  /**
   * HTTP 헤더에서 User Agent 추출
   */
  static extractUserAgent(request: any): string | undefined {
    return request.headers['user-agent'] || request.headers['User-Agent'];
  }

  /**
   * 클라이언트 IP 주소 추출
   * 가이드 예시의 프록시, 로드밸런서 고려 로직 구현
   */
  static extractIpAddress(request: any): string {
    // 방법 C: 프록시 헤더 고려 (가이드 예시)
    const forwardedFor = request.headers['x-forwarded-for'];
    if (forwardedFor) {
      const ips = forwardedFor.split(',').map((ip: string) => ip.trim());
      return this.normalizeIpv4(ips[0]);
    }

    const realIp = request.headers['x-real-ip'];
    if (realIp) {
      return this.normalizeIpv4(realIp);
    }

    // 방법 A: Express의 req.ip
    if (request.ip) {
      return this.normalizeIpv4(request.ip);
    }

    // 방법 B: 소켓에서 직접
    if (request.connection?.remoteAddress) {
      return this.normalizeIpv4(request.connection.remoteAddress);
    }

    return 'unknown';
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
   * `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
   */
  static generateRequestId(): string {
    return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 가이드 예시: Correlation ID 생성 (UUID 라이브러리 사용)
   */
  static generateCorrelationId(): string {
    return `corr-${randomUUID()}`;
  }
}

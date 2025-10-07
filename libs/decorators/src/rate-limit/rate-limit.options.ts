export interface RateLimitOptions {
  /**
   * Rate limit 키 지정
   * - string: 고정 키
   * - function: 인수 기반 동적 키 생성 (userId, email 등)
   * - 미지정시: 클래스명.메소드명:identifier 자동 생성
   */
  key?: string | ((args: any[]) => string);

  /** 허용 요청 수 - 기본값: 5 */
  limit?: number;

  /** 시간 윈도우 (초) - 기본값: 60초 */
  window?: number;

  /** 차단 시간 (초) - limit 초과 시 차단 시간. 기본값: window와 동일 */
  blockDuration?: number;

  /** 커스텀 에러 메시지 */
  errorMessage?: string;
}

export const RATE_LIMIT_METADATA_KEY = 'rate_limit';

import { SetMetadata, UseInterceptors } from '@nestjs/common';
import { LockInterceptor } from './lock.interceptor';

export interface LockOptions {
  /**
   * 락 키 지정
   * - string: 고정 키
   * - function: 인수 기반 동적 키 생성
   * - 미지정시: 클래스명.메소드명:인수해시 자동 생성
   */
  key?: string | ((args: any[]) => string);

  /** 락 유지 시간 (ms) - 기본값: 30초 */
  ttl?: number;

  /** 큐 대기 타임아웃 (ms) - 기본값: 30초 */
  timeout?: number;

  /** 타임아웃시 예외 발생 여부 - 기본값: true */
  throwOnTimeout?: boolean;
}

export const LOCK_METADATA_KEY = 'distributed_lock';

export function Lock(options: LockOptions = {}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    SetMetadata(LOCK_METADATA_KEY, options)(target, propertyKey, descriptor);
    UseInterceptors(LockInterceptor)(target, propertyKey, descriptor);
    return descriptor;
  };
}

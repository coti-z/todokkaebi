/**
 * Domain Event - 도메인에서 발생한 사건을 나타냅니다.
 *
 * @remarks
 * - 순수 비즈니스 사실만 포함
 * - correlationId: Application Layer에서 Event 발행 시 추가됨 (분산 트레이싱용)
 */
export abstract class DomainEvent {
  /**
   * 분산 시스템에서 요청 흐름을 추적하기 위한 ID
   * Application Handler에서 Event 발행 시 설정됩니다.
   *
   * @remarks
   * - Domain은 이 필드를 사용하지 않음 (순수 비즈니스 로직)
   * - Event 발행 시 Application Layer에서 command.context.correlationId로 설정
   * - 다른 Bounded Context에서 Event 수신 시 추적에 사용
   */
  correlationId?: string;
  eventType: string;

  abstract getAggregateId(): string;
  abstract getEventType(): string;

  getTimestamp(): Date {
    return new Date();
  }
}

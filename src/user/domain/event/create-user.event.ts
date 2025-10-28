import { DomainEvent } from '@libs/event/domain-event.abstract';

/**
 * User Domain Event: 사용자가 생성되었을 때 발행됩니다.
 *
 * @remarks
 * - 순수 비즈니스 사실만 포함 (userId, email, password)
 * - correlationId: 원래 HTTP 요청의 추적을 위해 포함
 *   (Auth Domain과의 분산 트레이싱 목적)
 */
export class CreateUserEvent extends DomainEvent {
  eventType: string = 'user.created';
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly password: string,
    public readonly correlationId?: string,
  ) {
    super();
  }

  getAggregateId(): string {
    return this.userId;
  }

  getEventType(): string {
    return this.eventType;
  }
}

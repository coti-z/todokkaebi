import { DomainEvent } from '@libs/event/domain-event.abstract';

export class DeleteUserEvent extends DomainEvent {
  eventType: string = 'user.deleted';

  constructor(
    public readonly userId: string,
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

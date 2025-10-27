import { DomainEvent } from '@libs/event/domain-event.abstract';

export class UpdateUserEvent extends DomainEvent {
  eventType: string = 'user.updated';
  constructor(
    public readonly userId: string,
    public readonly email?: string,
    public readonly password?: string,
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

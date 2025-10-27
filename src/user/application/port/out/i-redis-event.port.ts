import { DomainEvent } from '@libs/event/domain-event.abstract';

export const EVENT_PUBLISHER_OUTBOUND_PORT = Symbol(
  'EVENT_PUBLISHER_OUTBOUND_PORT',
);
export interface IEventPublisher {
  publicEvents(events: DomainEvent[]): void;
}

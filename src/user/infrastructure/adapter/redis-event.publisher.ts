import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { DomainEvent } from '@libs/event/domain-event.abstract';

import { IEventPublisher } from '@user/application/port/out/i-redis-event.port';
import { REDIS_EVENT_SYMBOL } from '@user/infrastructure/redis/redis.module';

@Injectable()
export class RedisEventPublisher implements IEventPublisher {
  constructor(
    @Inject(REDIS_EVENT_SYMBOL)
    private readonly eventBus: ClientProxy,
  ) {}

  publicEvents(events: DomainEvent[]): void {
    for (const event of events) {
      this.eventBus.emit(event.getEventType(), event);
    }
  }
}

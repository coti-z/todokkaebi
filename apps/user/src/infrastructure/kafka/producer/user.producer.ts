import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class userProducer {
  constructor(
    @Inject('KAFKA_CLIENT')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async sendMessage(topic: string, message: string) {
    await this.kafkaClient.emit(topic, message);
  }
}

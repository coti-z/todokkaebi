import { DynamicModule, Module } from '@nestjs/common';
import {
  ClientsModule,
  ClientsModuleOptions,
  Transport,
} from '@nestjs/microservices';

@Module({})
export class KafkaModule {
  static register(options: {
    clientId: string;
    brokers: string[];
  }): DynamicModule {
    const clientOption: ClientsModuleOptions = [
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: options.clientId,
            brokers: options.brokers,
          },
          consumer: {
            groupId: `${options.clientId}-group`,
          },
        },
      },
    ];

    return {
      module: KafkaModule,
      imports: [ClientsModule.register(clientOption)],
    };
  }
}

import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_CLIENT_ID } from './constants/kafka.constannts';

export const KAFKA_SERVICE = 'KAFKA_SERVICE';

@Module({})
export class KafkaModule {
  static register(consumerGroup?: string): DynamicModule {
    return {
      module: KafkaModule,
      imports: [
        ClientsModule.register([
          {
            name: KAFKA_SERVICE,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: KAFKA_CLIENT_ID,
                brokers: [process.env.KAFKA_BROKER as string],
              },
              consumer: {
                groupId: consumerGroup ?? KAFKA_CLIENT_ID,
              },
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}

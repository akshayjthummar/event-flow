import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_SERVICE } from './kafka.module';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(KAFKA_SERVICE) private readonly client: ClientKafka) {}

  async onModuleInit() {
    // ensure the underlying Kafka client connects
    try {
      await this.client.connect();
    } catch (err) {
      // swallow connect errors during tests or let them bubble in real environments
    }
  }

  emit<T = any>(topic: string, message: T) {
    return this.client.emit(topic, message);
  }

  send<T = any, R = any>(topic: string, message: T) {
    return this.client.send<R, T>(topic, message);
  }

  getClient() {
    return this.client;
  }

  async onModuleDestroy() {
    try {
      await this.client.close();
    } catch (err) {
      // ignore
    }
  }
}

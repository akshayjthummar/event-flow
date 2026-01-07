import { KAFKA_SERVICE } from '@app/kafka';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthServiceService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // connect to kafka when  module initilize
    await this.kafkaClient.connect();
  }
  getHello(): string {
    return 'Hello Word!';
  }
}

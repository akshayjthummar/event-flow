import { Test, TestingModule } from '@nestjs/testing';
import { KafkaService } from './kafka.service';
import { KAFKA_SERVICE } from './kafka.module';

describe('KafkaService', () => {
  let service: KafkaService;
  const mockClient = {
    connect: jest.fn().mockResolvedValue(undefined),
    emit: jest.fn(),
    send: jest.fn(),
    close: jest.fn().mockResolvedValue(undefined),
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KafkaService,
        {
          provide: KAFKA_SERVICE,
          useValue: mockClient,
        },
      ],
    }).compile();

    service = module.get<KafkaService>(KafkaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call client.emit when emit is called', () => {
    const payload = { foo: 'bar' };
    service.emit('test.topic', payload);
    expect(mockClient.emit).toHaveBeenCalledWith('test.topic', payload);
  });
});

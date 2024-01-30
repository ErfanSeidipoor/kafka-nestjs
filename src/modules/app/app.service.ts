import { Injectable } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';
import { OrderCreatedProducer, TicketCreatedProducer } from '../../event';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  constructor(private readonly kafkaService: KafkaService) {}

  health(): string {
    return 'Nestjs KafkaJS';
  }

  async createTicket() {
    await new TicketCreatedProducer(this.kafkaService.producer).produce({
      id: randomUUID(),
      title: 'ticket',
    });
  }

  async createOrder() {
    await new OrderCreatedProducer(this.kafkaService.producer).produce({
      id: randomUUID(),
      title: 'order',
    });
  }
}

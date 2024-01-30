import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  BasicConsumer,
  TicketCreatedEvent,
  OrderCreatedEvent,
  TopicsEnum,
} from '../../event';

import { OrderCreatedConsumerHandler } from './order-created.consumer';
import { TicketCreatedConsumerHandler } from './ticket-created.consumer';
import { KafkaService } from '../kafka/kafka.service';

class Consumer extends BasicConsumer<[OrderCreatedEvent, TicketCreatedEvent]> {
  topics: [TopicsEnum.order_created, TopicsEnum.ticket_created] = [
    TopicsEnum.order_created,
    TopicsEnum.ticket_created,
  ];
}

export const handlers = [
  OrderCreatedConsumerHandler,
  TicketCreatedConsumerHandler,
];

@Injectable()
export class ConsumerHandler implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly orderCreatedConsumerHandler: OrderCreatedConsumerHandler,
    private readonly ticketCreatedConsumerHandler: TicketCreatedConsumerHandler,
  ) {}

  async onModuleInit() {
    const kafkaConsumer = await this.kafkaService.createConsumer();
    await new Consumer(kafkaConsumer, {
      [TopicsEnum.order_created]: this.orderCreatedConsumerHandler.handler,
      [TopicsEnum.ticket_created]: this.ticketCreatedConsumerHandler.handler,
    }).consume();
  }
}

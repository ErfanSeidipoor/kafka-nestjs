import { BasicProducer } from './basic-producer';
import { TopicsEnum } from './topics.enum';

export interface OrderCreatedEvent {
  topic: TopicsEnum.order_created;
  value: {
    id: string;
    title: string;
  };
}

export class OrderCreatedProducer extends BasicProducer<OrderCreatedEvent> {
  topic: TopicsEnum.order_created = TopicsEnum.order_created;
}

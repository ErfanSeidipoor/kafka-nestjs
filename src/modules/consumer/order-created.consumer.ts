import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from '../../event';

@Injectable()
export class OrderCreatedConsumerHandler {
  handler = async (value: OrderCreatedEvent['value']) => {
    const { id, title } = value;

    console.log('OrderCreatedEvent > ', { id, title });
  };
}

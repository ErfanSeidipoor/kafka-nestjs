import { Injectable } from '@nestjs/common';
import { TicketCreatedEvent } from '../../event';

@Injectable()
export class TicketCreatedConsumerHandler {
  handler = async (value: TicketCreatedEvent['value']) => {
    const { id, title } = value;

    console.log('TicketCreatedEvent > ', { id, title });
  };
}

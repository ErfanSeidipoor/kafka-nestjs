import { Module } from '@nestjs/common';
import { ConsumerHandler, handlers } from '.';
import { KafkaModule } from '../kafka/kafka.module';
@Module({
  imports: [KafkaModule],
  providers: [...handlers, ConsumerHandler],
  exports: [],
})
export class KafkaConsumerModule {}

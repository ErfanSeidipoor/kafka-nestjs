import { Module } from '@nestjs/common';
import { KafkaConsumerModule } from './consumer/consumer.module';
import { KafkaModule } from './kafka/kafka.module';
import { AppModule } from './app/app.module';

@Module({
  imports: [KafkaModule, KafkaConsumerModule, AppModule],
  controllers: [],
  providers: [],
})
export class MainModule {}

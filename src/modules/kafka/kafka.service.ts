import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { TopicsEnum } from '../../event/topics.enum';
import {
  Admin,
  Consumer,
  Kafka,
  Partitioners,
  Producer,
  ProducerRecord,
} from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: JSON.parse(process.env.KAFKA_BROKERS_URLS),
  });

  public readonly requiredTopics = [
    TopicsEnum.ticket_created,
    TopicsEnum.order_created,
  ];

  public readonly admin: Admin = this.kafka.admin();

  private readonly consumers: Consumer[] = [];

  public readonly producer: Producer = this.kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  async onModuleInit() {
    console.log({
      brokers: JSON.parse(process.env.KAFKA_BROKERS_URLS),
    });

    await this.admin.describeGroups([process.env.KAFKA_GROUP]);
    await this.producer.connect();
    const topics = await this.admin.listTopics();
    for (const requiredTopic of this.requiredTopics) {
      if (!topics.includes(requiredTopic)) {
        await this.admin.createTopics({
          topics: [
            { topic: requiredTopic, numPartitions: 20, replicationFactor: 3 },
          ],
        });
      }
    }
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }

  async createConsumer() {
    console.log({
      brokers: JSON.parse(process.env.KAFKA_BROKERS_URLS),
    });

    const kafka = new Kafka({
      brokers: JSON.parse(process.env.KAFKA_BROKERS_URLS),
    });
    const consumer: Consumer = kafka.consumer({
      groupId: process.env.KAFKA_GROUP,
    });
    this.consumers.push(consumer);
    return consumer;
  }
}

## Kafka with NestJS and KafkaJS

This project demonstrates a simple setup of a Kafka cluster using Bitnami images and a NestJS application that interacts with it.

**Technologies:**

- Docker & Docker Compose
- Bitnami/kafka image (3 brokers)
- Kafdrop (GUI client)
- NestJS
- KafkaJS

**Structure:**

- `docker-compose.yml`: Defines services for Kafka brokers and Kafdrop.
- NestJS application with producers and consumers.

**Instructions:**

**1. Start Kafka and Kafdrop:**

1. Clone the repository and navigate to the root directory.
2. Run `docker-compose up -d` to start all services in the background.
3. Kafdrop will be available at http://localhost:9000

**2. Build and Run NestJS application:**

1. Install dependencies: `pnpm install`.
2. Run the application: `pnpm run start`.

**3. API Endpoints:**

- **POST /ticket:** Creates a new ticket and publishes a `ticket_created` event.
- **POST /order:** Creates a new order and publishes an `order_created` event.

**4. Consume Events:**

- The NestJS application is set up to consume events. You can check the logs in the console to see the consumed events.

**Example:**

```bash
curl -X POST http://localhost:3000/ticket
curl -X POST http://localhost:3000/order
```

**Acknowledgements:**

- Bitnami Kafka: https://bitnami.com/stack/kafka
- NestJS: https://nestjs.com/
- Kafdrop: https://github.com/obsidiandynamics/kafdrop
- KafkaJS: https://kafka.js.org

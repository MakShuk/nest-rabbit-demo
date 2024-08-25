import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Создаем микросервис и ожидаем его инициализации
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      // Указываем тип транспорта как RabbitMQ (RMQ)
      transport: Transport.RMQ,
      // Настройки для транспорта
      options: {
        // URL для подключения к RabbitMQ
        urls: [
          `amqp://${process.env.USER}:${process.env.PASSWORD}@localhost:5672`,
        ],
        // Имя очереди, которую будет использовать микросервис
        queue: 'demo_queue',
        // Дополнительные параметры очереди
        queueOptions: {
          // Очередь не будет долговечной (не сохраняется на диск)
          durable: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
 
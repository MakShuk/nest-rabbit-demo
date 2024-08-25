import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  RmqRecordBuilder,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.USER}:${process.env.PASSWORD}@localhost:5672`,
        ], // Подключение к RabbitMQ
        queue: 'demo_queue', // Очередь, в которую будут отправляться сообщения
        queueOptions: {
          durable: true, // Очередь не будет сохраняться после перезапуска сервера
        },
      },
    });
  }
  getHello(): string {
    return 'Hello World!';
  }

  async sendMessage(message: string) {
    try {
      const record = new RmqRecordBuilder(message) // Создаем экземпляр RmqRecordBuilder
        .build(); // Завершаем сборку сообщения
      // Отправляем сообщение в очередь 'replace-emoji' и ждем ответа

      this.client.send('test', record).subscribe({
        next: (response) => {
          console.log('Received response:', response);
        },
        error: (err) => {
          console.error('Error:', err);
        },
        complete: () => {
          console.log('Message processing complete');
        },
      });
    } catch (error) {
      console.error(error); // Выводим ошибку в консоль
      return 'Error'; // Возвращаем сообщение об ошибке
    }
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

const clientConfig = ClientsModule.register([
  {
    name: 'MATH_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.USER}:${process.env.PASSWORD}@localhost:5672`,
      ],
      queue: 'demo_queue',
      queueOptions: {
        durable: false,
      },
    },
  },
]);

@Module({
  imports: [ConfigModule.forRoot(), clientConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(undefined)
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(context.getMessage());
    console.log(data);
  }

  @MessagePattern('test')
  getTestNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(context.getMessage());
    console.log(data);
  }
}

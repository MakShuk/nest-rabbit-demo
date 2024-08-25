import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RmqRecordBuilder,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(undefined)
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    /*  console.log(context.getMessage());
    console.log(data); */
    console.log(`Undefined message`);

    setTimeout(() => {
      console.log(`Hello World!`);
      this.appService.sendMessage('Hello World!');
    }, 2000);
  }

  @MessagePattern('test')
  getTestNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log(`Original message: ${originalMsg.content.toString()}`);

    //  channel.ack(originalMsg);
  }
}

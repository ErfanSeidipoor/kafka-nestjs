import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  health(): string {
    return this.appService.health();
  }

  @Post('/ticket')
  createTicket() {
    return this.appService.createTicket();
  }

  @Post('/order')
  createOrder() {
    return this.appService.createOrder();
  }
}

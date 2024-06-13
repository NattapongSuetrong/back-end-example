import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  plus(@Query('num1') num1: string, @Query('num2') num2: string) {
    // throw new NotFoundException('Not Found');
    return parseInt(num1) + parseInt(num2);
  }
}

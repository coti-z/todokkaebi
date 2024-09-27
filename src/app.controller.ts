import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async test() {
    return 'test';
  }
}

import { Controller, Get } from '@nestjs/common';

@Controller('')
export class TopPageController {
  @Get()
  get() {
    return 'response';
  }
}

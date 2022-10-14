import { Controller, Get } from '@nestjs/common';

@Controller('')
export class ReviewController {
  @Get()
  get() {
    return 'response';
  }
}

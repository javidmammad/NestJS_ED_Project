import { Controller, Get } from '@nestjs/common';

@Controller('')
export class ProductController {
  @Get()
  get() {
    return 'response';
  }
}

import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AuthController {
  @Get()
  get() {
    return 'response';
  }
}

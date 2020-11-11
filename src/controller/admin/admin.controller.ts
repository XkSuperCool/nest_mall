import { Controller, Get } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get()
  index() {
    return 'ADMIN';
  }
}

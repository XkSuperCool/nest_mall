import { Module } from '@nestjs/common';
import { AdminController } from './controller/admin/admin.controller';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [],
})
export class AppModule {}

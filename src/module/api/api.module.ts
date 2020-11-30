import { Module } from '@nestjs/common';
import { ToolsController } from '../../controller/api/tools.controller';

@Module({
  controllers: [ToolsController]
})
export class ApiModule {}

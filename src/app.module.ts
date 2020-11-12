import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminModule } from './module/admin/admin.module';
import { ApiModule } from './module/api/api.module';
import db from './config/db';

// 数据库地址
const dbURL = `mongodb://${db.host}:${db.port}/${db.databaseName}`;
@Module({
  imports: [
    AdminModule,
    ApiModule,
    MongooseModule.forRoot(dbURL)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminController } from '../../controller/admin/admin.controller';
import { AdminService } from '../../service/admin.service';
import { Admin, AdminSchema } from '../../schema/admin.schema';
import { Role, RoleSchema } from '../../schema/role.schema';
import { RoleService } from '../../service/role.service';
import { RoleController } from '../../controller/admin/role.controller';
import { AdminAuthMiddleware } from '../../middleware/adminAuth.middleware';
import { ADMIN } from '../../config/routerPrefix';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
        collection: Admin.name.toLocaleLowerCase(),
      },
      {
        name: Role.name,
        schema: RoleSchema,
        collection: Role.name.toLocaleLowerCase(),
      }
    ])
  ],
  controllers: [
    AdminController,
    RoleController
  ],
  providers:[AdminService, RoleService]
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)
      .exclude(`${ADMIN}/login`, `${ADMIN}/captcha`, `${ADMIN}/logout`)
      .forRoutes(`${ADMIN}*`)
  }
}

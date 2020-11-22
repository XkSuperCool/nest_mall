import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminController } from '../../controller/admin/admin.controller';
import { AdminService } from '../../service/admin.service';
import { Admin, AdminSchema } from '../../schema/admin.schema';
import { Role, RoleSchema } from '../../schema/role.schema';
import { RoleService } from '../../service/role.service';
import { RoleController } from '../../controller/admin/role.controller';
import { AdminAuthMiddleware } from '../../middleware/adminAuth.middleware';
import { Access, AccessSchema } from '../../schema/access.schema';
import { AccessService } from '../../service/access.service';
import { AccessController } from '../../controller/admin/access.controller';
import { RoleAccess, RoleAccessSchema } from '../../schema/role_access.schema';
import { RoleAccessController } from '../../controller/admin/role_access.controller';
import { RoleAccessService } from '../../service/role_access.service';
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
      },
      {
        name: Access.name,
        schema: AccessSchema,
        collection: Access.name.toLocaleLowerCase(),
      },
      {
        name: RoleAccess.name,
        schema: RoleAccessSchema,
        collection: RoleAccess.name.toLocaleLowerCase(),
      }
    ])
  ],
  controllers: [
    AdminController,
    RoleController,
    AccessController,
    RoleAccessController
  ],
  providers:[AdminService, RoleService, AccessService, RoleAccessService],
  exports: [RoleAccessService, AccessService]
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)
      .exclude(`${ADMIN}/login`, `${ADMIN}/captcha`, `${ADMIN}/logout`)
      .forRoutes(`${ADMIN}*`)
  }
}

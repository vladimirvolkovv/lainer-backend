import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleSchema } from './role.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'role', schema: RoleSchema }])],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}

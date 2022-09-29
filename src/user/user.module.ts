import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { RoleSchema } from 'src/role/role.schema';
import { UserService } from './user.service';
import { RoleModule } from 'src/role/role.module';
import { RentalObjectModule } from 'src/rental-object/rental-object.module';
import { RentalObjectSchema } from 'src/rental-object/rental-object.schema';

@Module({
  imports: [
    RoleModule,
    RentalObjectModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema },
      { name: 'RentalObject', schema: RentalObjectSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

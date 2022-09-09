import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';
import { RoleModule } from 'src/role/role.module';
import { RentalObjectModule } from 'src/rental-object/rental-object.module';

@Module({
  imports: [
    RoleModule,
    RentalObjectModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

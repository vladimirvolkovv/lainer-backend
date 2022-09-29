import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RentalObjectModule } from './rental-object/rental-object.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { FloorModule } from './floor/floor.module';
import { SpaceModule } from './space/space.module';
import { PlanogramModule } from './planogram/planogram.module';

const env = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${env.DB_USER}:${env.DB_PASSW}@${env.DB_ADDRESS}:${env.DB_PORT}/${env.DB_NAME}`,
    ),
    RentalObjectModule,
    UserModule,
    AuthModule,
    RoleModule,
    FloorModule,
    SpaceModule,
    PlanogramModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

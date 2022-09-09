import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalObjectController } from './rental-object.controller';
import { RentalObjectSchema } from './rental-object.schema';
import { RentalObjectService } from './rental-object.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RentalObject', schema: RentalObjectSchema },
    ]),
  ],
  controllers: [RentalObjectController],
  providers: [RentalObjectService],
  exports: [RentalObjectService],
})
export class RentalObjectModule {}

import { Module } from '@nestjs/common';
import { FloorService } from './floor.service';
import { FloorController } from './floor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FloorSchema } from './floor.schema';
import { RentalObjectSchema } from 'src/rental-object/rental-object.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Floor', schema: FloorSchema },
      { name: 'RentalObject', schema: RentalObjectSchema },
    ]),
  ],
  providers: [FloorService],
  controllers: [FloorController],
})
export class FloorModule {}

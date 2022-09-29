import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FloorSchema } from 'src/floor/floor.schema';
import { RentalObjectSchema } from 'src/rental-object/rental-object.schema';
import { SpaceSchema } from './space.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Space', schema: SpaceSchema },
      { name: 'Floor', schema: FloorSchema },
      { name: 'RentalObject', schema: RentalObjectSchema },
    ]),
  ],
  providers: [SpaceService],
  controllers: [SpaceController],
})
export class SpaceModule {}

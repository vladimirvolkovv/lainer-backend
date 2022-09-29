import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Floor } from 'src/floor/floor.schema';
import { RentalObject } from 'src/rental-object/rental-object.schema';

export type SpaceDocument = Space & Document;

@Schema()
export class Space {
  @Prop({ required: true })
  name: string;
  @Prop({ required: false })
  square: string;
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Floor.name })
  floorId: Types.ObjectId;
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: RentalObject.name })
  rentalObjectId: Types.ObjectId;
}

export const SpaceSchema = SchemaFactory.createForClass(Space);

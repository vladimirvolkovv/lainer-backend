import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { RentalObject } from 'src/rental-object/rental-object.schema';

export type FloorDocument = Floor & Document;

@Schema()
export class Floor {
  @Prop({ required: true })
  name: string;
  @Prop({ required: false })
  description: string;
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: RentalObject.name })
  rentalObjectId: Types.ObjectId;
}

export const FloorSchema = SchemaFactory.createForClass(Floor);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RentalObjectDocument = RentalObject & Document;

@Schema()
export class RentalObject {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  address: string;
  @Prop()
  description: string;
}

export const RentalObjectSchema = SchemaFactory.createForClass(RentalObject);

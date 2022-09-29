import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Role } from 'src/role/role.schema';
import { RentalObject } from 'src/rental-object/rental-object.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: false })
  blocked: boolean;
  @Prop({ required: false, type: [SchemaTypes.ObjectId], ref: Role.name })
  roles: Types.ObjectId[];
  @Prop({
    required: false,
    type: [SchemaTypes.ObjectId],
    ref: RentalObject.name,
  })
  rentalObjects: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

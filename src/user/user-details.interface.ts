import { Types } from 'mongoose';

export interface UserDetails {
  _id: string;
  name: string;
  email: string;
  roles: Types.ObjectId[];
  rentalObjects: Types.ObjectId[];
  blocked: boolean;
}

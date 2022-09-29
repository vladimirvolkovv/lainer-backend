import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RentalObjectDocument } from 'src/rental-object/rental-object.schema';
import { RoleDocument } from 'src/role/role.schema';
import { UserDetails } from './user-details.interface';
import { UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Role') private readonly roleModel: Model<RoleDocument>,
    @InjectModel('RentalObject')
    private readonly rentalObjectModel: Model<RentalObjectDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      rentalObjects: user.rentalObjects,
      blocked: user.blocked,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel
      .findById(id)
      .populate({ path: 'roles', model: this.roleModel })
      .populate({ path: 'rentalObjects', model: this.rentalObjectModel })
      .exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async find(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async findAll(page: number, pageSize: number): Promise<any> {
    const users = await this.userModel
      .find()
      .populate({ path: 'roles', model: this.roleModel })
      .populate({ path: 'rentalObjects', model: this.rentalObjectModel })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .exec();
    const totalCount = await this.userModel.estimatedDocumentCount();

    return { users, totalCount };
  }

  async updateUser(
    id: string,
    newName: string,
    newEmail: string,
    newRoles: string[],
    newRentalObjects: string[],
  ): Promise<UserDocument> {
    let updatedUser = await this.find(id);

    const rolesObjectsIds = newRoles?.map((item) => new Types.ObjectId(item));
    const rentalObjectsIds = newRentalObjects?.map(
      (item) => new Types.ObjectId(item),
    );

    updatedUser.name = newName ?? updatedUser.name;
    updatedUser.email = newEmail ?? updatedUser.email;
    updatedUser.roles = rolesObjectsIds ?? updatedUser.roles;
    updatedUser.rentalObjects = rentalObjectsIds ?? updatedUser.rentalObjects;

    return await updatedUser.save();
  }
}

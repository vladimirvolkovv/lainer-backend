import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDocument } from './role.schema';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('role')
    private readonly roleModel: Model<RoleDocument>,
  ) {}

  async create(name: string): Promise<RoleDocument> {
    const existingRole = await this.roleModel.findOne({ name });
    if (existingRole) {
      throw new ConflictException('User already exist');
    }
    const newRole = new this.roleModel({
      name,
    });

    return newRole.save();
  }

  async findAll(page: number, pageSize: number): Promise<any> {
    const roles = await this.roleModel
      .find()
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .exec();
    const totalCount = await this.roleModel.estimatedDocumentCount();

    return { roles, totalCount };
  }

  async find(id: string): Promise<RoleDocument> {
    return this.roleModel.findById(id).exec();
  }

  async delete(_id: string) {
    return this.roleModel.deleteOne({ _id }).exec();
  }
}

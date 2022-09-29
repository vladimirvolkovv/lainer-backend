import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FloorDocument } from './floor.schema';

@Injectable()
export class FloorService {
  constructor(
    @InjectModel('Floor')
    private readonly floorModel: Model<FloorDocument>,
  ) {}

  async create(
    name: string,
    description: string,
    rentalObjectId: string,
  ): Promise<FloorDocument> {
    const newFloor = new this.floorModel({
      name,
      description,
      rentalObjectId: new Types.ObjectId(rentalObjectId),
    });
    return newFloor.save();
  }

  async findAll(): Promise<FloorDocument[]> {
    return this.floorModel.find().exec();
  }

  async find(id: string): Promise<FloorDocument> {
    return this.floorModel.findById(id).exec();
  }

  async update(
    id: string,
    newName: string,
    newDescription: string,
    newRentalObjectId: string,
  ): Promise<FloorDocument> {
    let existingFloor = await this.floorModel.findById(id);
    existingFloor.name = newName ?? existingFloor.name;
    existingFloor.description = newDescription ?? existingFloor.description;
    existingFloor.rentalObjectId =
      new Types.ObjectId(newRentalObjectId) ?? existingFloor.rentalObjectId;

    return await existingFloor.save();
  }

  async delete(id: string) {
    return this.floorModel.deleteOne({ _id: id }).exec();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SpaceDocument } from './space.schema';

@Injectable()
export class SpaceService {
  constructor(
    @InjectModel('Space')
    private readonly spaceModel: Model<SpaceDocument>,
  ) {}

  async create(
    name: string,
    square: string,
    floorId: string,
    rentalObjectId: string,
  ): Promise<SpaceDocument> {
    const newSpace = new this.spaceModel({
      name,
      square,
      floorId: new Types.ObjectId(floorId),
      rentalObjectId: new Types.ObjectId(rentalObjectId),
    });
    return newSpace.save();
  }

  async findAll(): Promise<SpaceDocument[]> {
    return this.spaceModel.find().exec();
  }

  async find(id: string): Promise<SpaceDocument> {
    return this.spaceModel.findById(id).exec();
  }

  async update(
    id: string,
    newName: string,
    newSquare: string,
    newFloorId: string,
    newRentalObjectId: string,
  ): Promise<SpaceDocument> {
    let existingSpace = await this.spaceModel.findById(id);
    existingSpace.name = newName ?? existingSpace.name;
    existingSpace.square = newSquare ?? existingSpace.square;
    existingSpace.floorId =
      new Types.ObjectId(newFloorId) ?? existingSpace.floorId;
    existingSpace.rentalObjectId =
      new Types.ObjectId(newRentalObjectId) ?? existingSpace.rentalObjectId;

    return await existingSpace.save();
  }

  async delete(id: string) {
    return this.spaceModel.deleteOne({ _id: id }).exec();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentalObjectDocument } from './rental-object.schema';

@Injectable()
export class RentalObjectService {
  constructor(
    @InjectModel('RentalObject')
    private readonly rentalObjectModel: Model<RentalObjectDocument>,
  ) {}

  async create(
    name: string,
    address: string,
    description: string,
  ): Promise<RentalObjectDocument> {
    const newRentalObject = new this.rentalObjectModel({
      name,
      address,
      description,
    });
    return newRentalObject.save();
  }

  async findAll(): Promise<RentalObjectDocument[]> {
    return this.rentalObjectModel.find().exec();
  }

  async find(id: string): Promise<RentalObjectDocument> {
    return this.rentalObjectModel.findById(id).exec();
  }

  async update(
    id: string,
    newName: string,
    newAddress: string,
    newDescription: string,
  ): Promise<RentalObjectDocument> {
    let existingRentalObject = await this.find(id);

    existingRentalObject.name = newName ?? existingRentalObject.name;
    existingRentalObject.address = newAddress ?? existingRentalObject.address;
    existingRentalObject.description =
      newDescription ?? existingRentalObject.description;

    return existingRentalObject.save();
  }

  async delete(id: string) {
    return this.rentalObjectModel.deleteOne({ _id: id }).exec();
  }
}

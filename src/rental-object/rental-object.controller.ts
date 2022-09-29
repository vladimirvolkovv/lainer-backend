import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RentalObjectDocument } from './rental-object.schema';
import { RentalObjectService } from './rental-object.service';

@Controller('rental-object')
export class RentalObjectController {
  constructor(private rentalObjectService: RentalObjectService) {}

  @UseGuards(JwtGuard)
  @Post()
  createRentalObject(
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('description') description?: string,
  ): Promise<RentalObjectDocument> {
    return this.rentalObjectService.create(name, address, description);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAllRentalObjects(): Promise<RentalObjectDocument[]> {
    return this.rentalObjectService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findRentalObject(@Param('id') id: string): Promise<RentalObjectDocument> {
    return this.rentalObjectService.find(id);
  }

  @Patch(':id')
  updateRentalObject(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('description') description?: string,
  ): Promise<RentalObjectDocument> {
    return this.rentalObjectService.update(id, name, address, description);
  }

  @Delete(':id')
  deleteRentalObject(@Param('id') id: string) {
    return this.rentalObjectService.delete(id);
  }
}

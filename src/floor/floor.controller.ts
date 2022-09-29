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
import { FloorDocument } from './floor.schema';
import { FloorService } from './floor.service';

@Controller('floor')
export class FloorController {
  constructor(private floorService: FloorService) {}

  @UseGuards(JwtGuard)
  @Post()
  createFloor(
    @Body('name') name: string,
    @Body('rentalObjectId') rentalObjectId: string,
    @Body('description') description?: string,
  ): Promise<FloorDocument> {
    return this.floorService.create(name, description, rentalObjectId);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAllFloors(): Promise<FloorDocument[]> {
    return this.floorService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findFloor(@Param('id') id: string): Promise<FloorDocument> {
    return this.floorService.find(id);
  }

  @Patch(':id')
  updateFloor(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('rentalObjectId') rentalObjectId: string,
    @Body('description') description: string,
  ): Promise<FloorDocument> {
    return this.floorService.update(id, name, rentalObjectId, description);
  }

  @Delete(':id')
  deleteFloor(@Param('id') id: string) {
    return this.floorService.delete(id);
  }
}

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
import { SpaceDocument } from './space.schema';
import { SpaceService } from './space.service';

@Controller('space')
export class SpaceController {
  constructor(private spaceService: SpaceService) {}
  @UseGuards(JwtGuard)
  @Post()
  createSpace(
    @Body('name') name: string,
    @Body('square') square: string,
    @Body('rentalObjectId') rentalObjectId: string,
    @Body('floorId') floorId?: string,
  ): Promise<SpaceDocument> {
    return this.spaceService.create(name, square, rentalObjectId, floorId);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAllFloors(): Promise<SpaceDocument[]> {
    return this.spaceService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findFloor(@Param('id') id: string): Promise<SpaceDocument> {
    return this.spaceService.find(id);
  }

  @Patch(':id')
  updateFloor(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('square') square: string,
    @Body('rentalObjectId') rentalObjectId: string,
    @Body('floorId') floorId: string,
  ): Promise<SpaceDocument> {
    return this.spaceService.update(id, name, square, rentalObjectId, floorId);
  }

  @Delete(':id')
  deleteFloor(@Param('id') id: string) {
    return this.spaceService.delete(id);
  }
}

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleDocument } from './role.schema';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @UseGuards(JwtGuard)
  @Post()
  createRole(@Body('name') name: string): Promise<RoleDocument> {
    return this.roleService.create(name);
  }

  @UseGuards(JwtGuard)
  @Get(':page/:pageSize')
  findAllRoles(
    @Param('page') page: number,
    @Param('pageSize') pageSize: number,
  ): Promise<RoleDocument> {
    return this.roleService.findAll(page, pageSize);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findRole(@Param('id') id: string): Promise<RoleDocument> {
    return this.roleService.find(id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}

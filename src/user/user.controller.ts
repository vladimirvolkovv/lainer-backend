import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserDetails } from './user-details.interface';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Get(':page/:pageSize')
  findAllUsers(
    @Param('page') page: number,
    @Param('pageSize') pageSize: number,
  ): Promise<UserDetails> {
    return this.userService.findAll(page, pageSize);
  }
}

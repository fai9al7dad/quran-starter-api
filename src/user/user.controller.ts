import { UserService } from './user.service';
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getUser(@GetUser('') user: User) {
    return user;
  }
  @Get('search/:query')
  searchUser(@Param() params) {
    return this.userService.searchUser(params.query);
  }
}

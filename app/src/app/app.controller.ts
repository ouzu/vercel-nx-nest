import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { AppService } from './app.service';
import { UserService } from './user.service';

import { User as UserModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @Post('user')
  async signupUser(@Body() userData: { name: string }): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: parseInt(id) });
  }

  @Get('users')
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Post('users')
  async postUsers(@Body() userData: { name: string }): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { name: string }
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: parseInt(id) },
      data: userData,
    });
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: parseInt(id) });
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}

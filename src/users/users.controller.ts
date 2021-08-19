import {Controller, Post, Body, Put, Param, Get} from '@nestjs/common';

import { UserDto } from './dto/users.dto';
import { UsersService } from "./users.service";
import {UserInformationService} from "../users-information/users_information.service";
import {CreateUsersInformationDto} from "../users-information/dto/create-users-information.dto";
import {FormDataRequest} from "nestjs-form-data";

@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService,private readonly usersInformationService: UserInformationService,
  ) {

  }
  @Post('users')
  async registerUser(@Body() userDto: UserDto) {
    return await this.usersService.store(userDto)
  }
  @Post('users/login')
  async loginUser(@Body() userDto: UserDto) {
    return await this.usersService.login(userDto)
  }

  @Post('users-information')
  @FormDataRequest()

  async store(@Body() usersInformationDto: CreateUsersInformationDto){
   return await  this.usersInformationService.store(usersInformationDto)
  }

  @Put('users-information/:id')
  async update(@Param("id") id: string,@Body() usersInformationDto: CreateUsersInformationDto){
     await  this.usersInformationService.update(id,usersInformationDto)
  }

  @Get('users-information/:id')
  async getCustomer(@Param("id") id: string){
    return await  this.usersInformationService.getCustomer(id)
  }

}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jsw-auth.guard';
import { Roles } from 'src/auth/role-auth.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

//позволяет разделять эндпоинты по подтипам
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {} // инициализируем сервис для доступа к эндпоинтам

  //описание эндпоинта
  @ApiOperation({ summary: 'user creation' })
  //описание типа возвращаемой информации
  @ApiResponse({ status: 200, type: User })
  @Post() //запрос типа post
  create(@Body() userDto: CreateUserDto) {
    //получаем type из созданного дто
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'get users' })
  @ApiResponse({ status: 200, type: [User] })
  //добавляет middleware для проверки авторизации юзера
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'add role' })
  @ApiResponse({ status: 200, type: [User] })
  //добавляет middleware для проверки авторизации юзера
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Post('/role')
  addRole(@Body() roleDto: AddRoleDto) {
    return this.userService.addRole(roleDto);
  }

  @ApiOperation({ summary: 'ban user' })
  @ApiResponse({ status: 200, type: [User] })
  //добавляет middleware для проверки авторизации юзера
  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @Post('/ban')
  ban(@Body() banDto: BanUserDto) {
    return this.userService.ban(banDto);
  }
}

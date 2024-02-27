import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

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
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}

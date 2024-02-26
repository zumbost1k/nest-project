import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {} // инициализируем сервис для доступа к эндпоинтам

  @Post() //запрос типа post
  create(@Body() userDto: CreateUserDto) {
    //получаем type из созданного дто
    return this.userService.createUser(userDto);
  }
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
}

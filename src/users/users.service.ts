import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  //импортируем для того, чтобы работать с моделью юзера для создания строк в бд
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    //получаем параметры типа дто в качестве аргументов, принимаемых функцией
    const user = await this.userRepository.create(dto);
    return user;
  }
  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}

import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  //импортируем для того, чтобы работать с моделью юзера для создания строк в бд
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    //получаем параметры типа дто в качестве аргументов, принимаемых функцией
    const user = await this.userRepository.create(dto);

    //получаем информацию о роли стандартного юзера из бд
    const role = await this.roleService.getRoleByValue('USER');

    //с помощью функции set обновляем в бд значение roles для юзера
    await user.$set('roles', [Number(role.id)]);
    return user;
  }
  async getAllUsers() {
    //возвращаем всех юзеров и + к каждому озвращаем все поля, с которыми связан юзер.
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }
}

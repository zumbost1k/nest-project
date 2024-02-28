import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  //импортируем для того, чтобы работать с моделью юзера для создания строк в бд
  constructor(
    //импортируется модель юзера для манипуляций с этой таблицей в бд
    @InjectModel(User) private userRepository: typeof User,
    //импортируется сервис ролей для работы с функциями ролей
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    //получаем параметры типа дто в качестве аргументов, принимаемых функцией
    const user = await this.userRepository.create(dto);

    //получаем информацию о роли стандартного юзера из бд
    const role = await this.roleService.getRoleByValue('USER');

    //с помощью функции set обновляем в бд значение roles для юзера
    await user.$set('roles', [Number(role.id)]);

    user.roles = [role];

    return user;
  }
  async getAllUsers() {
    //возвращаем всех юзеров и + к каждому озвращаем все поля, с которыми связан юзер.
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', Number(role.id));
      return dto;
    } else {
      throw new HttpException(
        'user or role dont founded',
        HttpStatus.NOT_FOUND
      );
    }
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('user dont founded', HttpStatus.NOT_FOUND);
    }
    user.bannedL = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
}

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';

@Module({
  //подключение контроллеров для работы с http запросами
  controllers: [UsersController],
  //сервисы для обработки бизнесс логики
  providers: [UsersService],
  //подключение модуля юзер для взаимодействия с этой моделью
  imports: [SequelizeModule.forFeature([User])],
})
export class UsersModule {}

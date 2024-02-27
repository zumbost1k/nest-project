import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    //подключаем сервис юзера, чтобы использовать у себя его функции
    UsersModule,
    //подключаем jwt для работы с его функциями
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}

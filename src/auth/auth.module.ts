import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    //подключаем сервис юзера, чтобы использовать у себя его функции.
    //так как в юзер модуле тоже используется сервис auth, то получаеся кольцевая зависимость. исправляется с помощью forwardRef
    forwardRef(() => UsersModule),
    //подключаем jwt для работы с его функциями
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

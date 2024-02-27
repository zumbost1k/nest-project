import { ApiProperty } from '@nestjs/swagger';

//паттерн проектирования, предназначенный для передачи данных между модулями и их предварительной валидации
export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'user email' })
  readonly email: string;
  @ApiProperty({ example: '12345677', description: 'user password' })
  readonly password: string;
}

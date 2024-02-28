import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

//паттерн проектирования, предназначенный для передачи данных между модулями и их предварительной валидации
export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'user email' })
  @IsString({ message: 'must be a string' })
  @IsEmail({}, { message: 'must be an email' })
  readonly email: string;

  @ApiProperty({ example: '12345677', description: 'user password' })
  @IsString({ message: 'must be a string' })
  @Length(4, 16, {
    message: 'pussword must be longer than 4 and shorter than 16',
  })
  readonly password: string;
}

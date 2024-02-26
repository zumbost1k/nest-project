
//паттерн проектирования, предназначенный для передачи данных между модулями и их предварительной валидации
export class CreateUserDto {
  readonly email: string;
  readonly password: string;
}

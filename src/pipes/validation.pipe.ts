import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
//специальный инструмент, предназначенный для валидации и модификации входные данных
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    //получаем объект из тела запроса
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);
    if (errors.length) {
      let messages: string[] = errors.map(
        (error) =>
          `${error.property} - ${Object.values(error.constraints).join(', ')}`
      );
      throw new ValidationException(messages);
    }
  }
}

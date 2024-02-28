import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'must be a string' })
  readonly value: string;
  @IsNumber({}, { message: 'must bu a number' })
  readonly userId: number;
}

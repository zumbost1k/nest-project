import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ example: 'USER', description: 'role name' })
  readonly value: string;
  @ApiProperty({ example: 'just a user', description: 'description' })
  readonly description: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/posts/posts.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

//интерфейс, который показывает необходимые данные для создания строки в базе данных
interface userCreatinAtttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, userCreatinAtttrs> {
  //описание атрибута баззы данных с примером будущего картежа
  @ApiProperty({ example: '1', description: 'uniq id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: Number;

  @ApiProperty({ example: 'example@gmail.com', description: 'user email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '12345678', description: 'user password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'true', description: 'is banned user' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  bannedL: boolean;

  @ApiProperty({ example: 'because', description: 'the reason of ban' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Post)
  posts: Post[];
}

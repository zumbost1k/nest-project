import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

//интерфейс, который показывает необходимые данные для создания строки в базе данных
interface roleCreatinAtttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, roleCreatinAtttrs> {
  //описание атрибута баззы данных с примером будущего картежа
  @ApiProperty({ example: '1', description: 'uniq id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: Number;

  @ApiProperty({ example: 'ADMIN', description: 'user role' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({ example: 'Admin', description: 'role descripption' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;


  @BelongsToMany(()=>User,()=>UserRoles)
  users:User[];
}

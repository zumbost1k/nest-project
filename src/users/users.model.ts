import { Column, DataType, Model, Table } from 'sequelize-typescript';

//интерфейс, который показывает необходимые данные для создания строки в базе данных
interface userCreatinAtttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, userCreatinAtttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: Number;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  bannedL: boolean;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;
}

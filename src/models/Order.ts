import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Default, AllowNull, IsEmail, HasMany } from 'sequelize-typescript';
import OrderProduct from './OrderProduct';

@Table({
  tableName: 'orders',
  timestamps: true
})
class Order extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER
  })
  declare id: number;

  @Column({
    type: DataType.ENUM('pending', 'paid', 'shipped', 'cancelled'),
  })
  declare status: string;

  @Column({
    type: DataType.FLOAT,
  })
  declare total: number;

  @Column({
    type: DataType.STRING(255),
  })
  declare customerName: string;

  @Column({
    type: DataType.STRING(4)
  })
  declare country: string;

  @Column
  declare street: string;

  @Column
  declare city: string;

  @Column
  declare zipCode: string;

  @AllowNull
  @Column
  declare phone?: string;

  @AllowNull
  @IsEmail
  @Column
  declare email?: string;

  @HasMany(() => OrderProduct)
  declare orderProducts: OrderProduct[]
}

export default Order
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Default, ForeignKey, BelongsTo, } from 'sequelize-typescript';
import Order from './Order';
import Product from './Product';

@Table({
  tableName: 'order_products',
  timestamps: true
})
class OrderProduct extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER
  })
  declare id: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
  })
  declare orderId: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  declare productId: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare quantity: number;

  @BelongsTo(() => Order)
  declare order: Order

  @BelongsTo(() => Product)
  declare product: Product

}

export default OrderProduct;
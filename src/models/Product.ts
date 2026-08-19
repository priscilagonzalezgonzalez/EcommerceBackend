import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Default, AllowNull, HasMany, AfterUpdate } from 'sequelize-typescript';
import OrderProduct from './OrderProduct';
import eventEmitter from '../events/eventBus';

@Table({
  tableName: 'products'
})
class Product extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER
  })
  declare id: number;

  @Column({
    type: DataType.STRING(18),
  })
  declare name: string;

  @Column({
    type: DataType.STRING(255),
  })
  declare image: string;

  @AllowNull
  @Column(DataType.STRING(25))
  declare description?: string;

  @Column({
    type: DataType.FLOAT,
  })
  declare price: number;

  @Default(true)
  @Column
  declare active: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  declare stock: number;

  @Column
  declare createdAt: Date;

  @HasMany(() => OrderProduct)
  declare orderProducts: OrderProduct[]
  
  @AfterUpdate
  static onStockUpdate(product: Product) {
    console.log(product.toJSON());
    eventEmitter.emit("productUpdated", product);
  }
}



export default Product;
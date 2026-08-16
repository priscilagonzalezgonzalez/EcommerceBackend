import { Transaction } from "sequelize";
import OrderProduct from "../models/OrderProduct";
import { CreateOrderProduct } from "../types/orderProduct.types";
import { createOrderProductSchema, createOrderProductsSchema } from "../schemas/orderProduct.shema";


export class OrderProductRepository {

  create(t: Transaction, data: CreateOrderProduct): Promise<OrderProduct> {
    const parsed = createOrderProductSchema.safeParse(data);

    // TODO: Make Global Error Handler
    if(!parsed.success) {
      throw new Error('Error 400');
    }

    return OrderProduct.create(parsed.data, { transaction: t });
  }

  bulkCreate(data: CreateOrderProduct[], t: Transaction): Promise<OrderProduct[]> {
    const parsed = createOrderProductsSchema.safeParse(data);

    // TODO: Make Global Error Handler
    if(!parsed.success) {
      throw new Error('Error 400');
    }

    return OrderProduct.bulkCreate(
      parsed.data,
      {transaction: t}
    );
  }
}
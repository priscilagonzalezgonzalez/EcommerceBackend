import { Transaction } from "sequelize";
import Order from "../models/Order";
import { CreateOrder, ReserveOrderPayload } from "../types/order.types";
import { createOrderSchema } from "../schemas/order.schema";

export class OrderRepository {

  createOrder(t: Transaction, data: CreateOrder): Promise<Order> {
    const parsed = createOrderSchema.safeParse(data);

    // TODO: Make Global Error Handler
    if(!parsed.success) {
      throw new Error('Error 400');
    }

    return Order.create(parsed.data, { transaction: t });
  }
}
import { OrderProductRepository } from "./repositories/orderProduct.repository";
import { OrderRepository } from "./repositories/order.repository";
import { OrderService } from "./services/OrderService";
import { RedisService } from "./services/RedisService";

export const orderService = new OrderService(
  new RedisService(),
  new OrderRepository(),
  new OrderProductRepository(),
);

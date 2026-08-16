import { env } from "process";
import {
  CreateOrder,
  CreateOrderPayload,
  ReserveOrderPayload,
} from "../types/order.types";
import { RedisService } from "./RedisService";
import { cartReservationQueue } from "../queues";
import { CART_RESERVATION_JOB } from "../constants/queues.constants";
import { CartReservationJobData } from "../types/queues.types";
import db from "../config/db";
import { OrderRepository } from "../repositories/order.repository";
import { OrderProductRepository } from "../repositories/orderProduct.repository";

export class OrderService {
  constructor(
    private readonly redis: RedisService,
    private readonly orderRepository: OrderRepository,
    private readonly orderProductRepository: OrderProductRepository,
  ) {}

  async reserveOrder(cart: ReserveOrderPayload) {
    const reservationTimeInMinutes = Number(env.CART_RESERVATION_MINUTES ?? 10);
    const userId = cart.userId ?? 1;
    const cartKey = `cart:${userId}`;
    const delayMs = reservationTimeInMinutes * 60 * 1000;

    await this.redis.setKey(
      { key: cartKey, value: cart },
      {
        expiration: {
          type: "EX",
          value: 60 * reservationTimeInMinutes,
        },
      },
    );

    const existingJob = await cartReservationQueue.getJob(cartKey);
    if (existingJob) {
      await existingJob.remove();
    }

    const jobData: CartReservationJobData = { userId, cartKey };

    await cartReservationQueue.add(CART_RESERVATION_JOB, jobData, {
      delay: delayMs,
      jobId: cartKey,
      removeOnComplete: true,
      removeOnFail: 100,
    });

    return { userId, cartKey, expiresInMinutes: reservationTimeInMinutes };
  }

  async freeOrder(userId: number) {
    const cartKey = `cart:${userId}`;
    await this.redis.deleteKey(cartKey);
    // TODO: restore product stock reserved for this cart
  }

  async createOrder(createPayload: CreateOrderPayload) {
    const t = await db.transaction();
    const { status, total, shippingDetails, orderProducts } = createPayload;

    const orderPayload: CreateOrder = {
      customerName: shippingDetails.customerName,
      country: shippingDetails.country,
      street: shippingDetails.street,
      city: shippingDetails.city,
      zipCode: shippingDetails.zipCode,
      phone: shippingDetails.phone,
      email: shippingDetails.email,
      status,
      total,
    };

    const order = await this.orderRepository.createOrder(t, orderPayload);
    const orderProductMapped = orderProducts.map((orderProduct) => {
      return { ...orderProduct, orderId: order.id };
    });

    const orderProductsResult = await this.orderProductRepository.bulkCreate(orderProductMapped, t);

    await t.commit();

    return {
      order,
      orderProductsResult
    }
  }
}

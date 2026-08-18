import z from "zod";
import {
  createOrderSchema,
  orderIdParamsSchema,
  orderPayloadSchema,
  ReserveOrderPayloadSchema,
} from "../schemas/order.schema";

export type OrderIdParams = z.infer<typeof orderIdParamsSchema>;

export type ReserveOrderPayload = z.infer<typeof ReserveOrderPayloadSchema>;

export type CreateOrderPayload = z.infer<typeof orderPayloadSchema>;

export type CreateOrder = z.infer<typeof createOrderSchema>;
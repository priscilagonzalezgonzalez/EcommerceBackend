import z from "zod";
import { createOrderSchema, orderPayloadSchema, ReserveOrderPayloadSchema } from "../schemas/order.schema";

export type ReserveOrderPayload = z.infer<typeof ReserveOrderPayloadSchema>;

export type CreateOrderPayload = z.infer<typeof orderPayloadSchema>;

export type CreateOrder = z.infer<typeof createOrderSchema>;
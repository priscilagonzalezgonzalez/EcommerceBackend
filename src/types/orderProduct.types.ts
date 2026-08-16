import z from "zod";
import { createOrderProductSchema, createOrderProductsSchema } from "../schemas/orderProduct.shema";

export type CreateOrderProduct = z.infer<typeof createOrderProductSchema>;

export type CreateOrderProducts = z.infer<typeof createOrderProductsSchema>;
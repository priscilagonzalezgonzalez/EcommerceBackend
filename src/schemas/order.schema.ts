import z from "zod";
import { CartItemSchema } from "./cart.schema";

export const ReserveOrderPayloadSchema = z.object({
 userId: z.number().optional(),
 total: z.number().positive(),
 items: z.array(CartItemSchema),
 status: z.string(), // TODO: Define status type
 totalItems: z.number().positive()
});

export const formSchema = z.object({
  customerName: z.string().min(1, "Name is required").max(255),
  country: z.string().min(1, "Country is required").max(4),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  phone: z.string().optional(),
  email: z.email().optional(),
});

export const orderProductSchema = z.object({
  productId: z.int(),
  quantity: z.int().nonnegative(),
})

export const orderPayloadSchema = z.object({
  status: z.enum(['pending', 'paid', 'shipped', 'cancelled']),
  total: z.number().nonnegative(),
  shippingDetails: formSchema,
  orderProducts: z.array(orderProductSchema).default([]),
});

export const createOrderSchema = formSchema.extend({
  status: z.enum(['pending', 'paid', 'shipped', 'cancelled']),
  total: z.number().nonnegative(),
});
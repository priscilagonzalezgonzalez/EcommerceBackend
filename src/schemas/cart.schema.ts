import z from "zod";

export const CartItemSchema = z.object({
 productId: z.number(),
 image: z.string(),
 name: z.string(),
 price: z.number(),
 quantity: z.number(),
 subtotal: z.number(),
 stock: z.number().nonnegative()
});
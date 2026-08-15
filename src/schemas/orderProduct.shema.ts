import z from "zod";

export const createOrderProductSchema = z.object({
  orderId: z.number().nonnegative(),
  productId: z.number().nonnegative(),
  quantity: z.number().nonnegative(),
});

export const createOrderProductsSchema = z.array(createOrderProductSchema);

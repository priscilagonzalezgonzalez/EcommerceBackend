import z from "zod";

export const productIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateProductPayloadSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.url().optional(),
  price: z.coerce.number().positive().optional(),
  active: z.boolean().optional(),
  stock: z.coerce.number().int().optional(),
});

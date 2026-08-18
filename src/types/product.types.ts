import z from "zod";
import {
  productIdParamsSchema,
  updateProductPayloadSchema,
} from "../schemas/product.schema";

export type ProductIdParams = z.infer<typeof productIdParamsSchema>;
export type UpdateProductPayload = z.infer<typeof updateProductPayloadSchema>;

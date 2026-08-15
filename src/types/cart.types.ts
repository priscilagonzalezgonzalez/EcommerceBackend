import z from "zod"
import { CartItemSchema } from "../schemas/cart.schema"

export type CartItem = z.infer<typeof CartItemSchema>;
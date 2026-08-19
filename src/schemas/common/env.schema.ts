import z from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number(),
  
  POSTGRES_URL: z.url(),
  POSTGRES_USER: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_SERVER: z.string(),
  POSTGRES_PORT: z.coerce.number(),

  REDIS_URL: z.url(),

  CART_RESERVATION_MINUTES: z.coerce.number().min(1),
});
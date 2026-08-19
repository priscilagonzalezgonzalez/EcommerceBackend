import { envSchema } from "../schemas/common/env.schema";
import { Env } from "../types/env.types";

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('Variables de entorno inválidas:');
    console.error(parsed.error);
    
    process.exit(1);
  }

  return parsed.data;
}

export const env = validateEnv();
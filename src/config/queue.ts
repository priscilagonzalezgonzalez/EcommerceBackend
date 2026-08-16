import { env } from "process";

export const connection = {
  url: env.REDIS_URL || "redis://127.0.0.1:6379",
  maxRetriesPerRequest: null,
};

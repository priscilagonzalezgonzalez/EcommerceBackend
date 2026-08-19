import { env } from "./env";
import { createClient } from 'redis';

const client = createClient({
  url: env.REDIS_URL,
});

export default { client };
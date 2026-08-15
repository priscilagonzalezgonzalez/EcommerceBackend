import { env } from 'process';
import { createClient } from 'redis';

const client = createClient({
  url: env.REDIS_URL,
});

export default { client };
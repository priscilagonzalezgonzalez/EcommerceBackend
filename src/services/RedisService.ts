import { RedisClientType, SetOptions } from "@redis/client";
import redis from "../config/redis";

export class RedisService {
  client: RedisClientType;

  constructor(client?: RedisClientType) {
    this.client = client ?? redis.client;
  }

  async setKey<T>(
    keyPair: { key: string; value: T },
    config?: SetOptions
  ): Promise<T> {
    await this.client.set(
      keyPair.key,
      JSON.stringify(keyPair.value),
      config
    );

    return keyPair.value;
  }

  async deleteKey(key: string): Promise<void> {
    await this.client.del(key);
  }
}
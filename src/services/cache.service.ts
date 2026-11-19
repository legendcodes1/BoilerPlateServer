import redis from "../config/redis";

class CacheService {
  async get<T>(key: string): Promise<T | null> {
    // Retrieve the stored JSON string.
    const cached = await redis.get(key);

    // Return null on a cache miss.
    if (cached === null) {
      return null;
    }

    // Convert the JSON string back into an object.
    return JSON.parse(cached) as T;
  }

  async set<T>(key: string, value: T, ttl: number = 60): Promise<void> {
    // Convert the value into JSON.
    const serialized = JSON.stringify(value);

    // Store it with an expiration.
    await redis.set(key, serialized, {
      EX: ttl,
    });
  }

  async delete(key: string): Promise<void> {
    await redis.del(key);
  }
}

const cacheService = new CacheService();

export default cacheService;

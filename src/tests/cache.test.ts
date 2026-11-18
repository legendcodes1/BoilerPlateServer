import redis, { connectRedis } from "../config/redis";
import { cacheService } from "../services/cache.service";

import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";

beforeAll(async () => {
  await connectRedis();
});

afterAll(async () => {
  if (redis.isOpen) {
    await redis.close();
  }
});

describe("CacheService", () => {
  it("stores and retrieves a user", async () => {
    // ARRANGE
    const user = {
      id: "123",
      username: "Alex",
    };

    // ACT
    await cacheService.set("test:user:123", user, 60);

    const cachedUser = await cacheService.get<typeof user>("test:user:123");

    // ASSERT
    expect(cachedUser).toEqual(user);
  });
});

it("deletes a cached user", async () => {
  const user = {
    id: "456",
    username: "Sam",
  };

  await cacheService.set("test:user:456", user, 60);

  // TODO 1: Delete the key

  // TODO 2: Retrieve the key

  // TODO 3: Assert that the result is null
});

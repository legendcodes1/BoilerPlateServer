import redis, { connectRedis } from "../src/config/redis";
import { cacheService } from "../src/services/cache.service";

// const user = {
//   id: "123",
//   username: "Alex",
//   email: "alex@example.com",
// };

// async function practiceRedis() {
//   try {
//     await connectRedis();

//     // Serialize the object
//     const data = JSON.stringify(user);

//     // Store it for 60 seconds
//     await redis.set("test:user:123", data, {
//       EX: 60,
//     });

//     // Retrieve the stored JSON string
//     const returnedValue = await redis.get("test:user:123");

//     // Deserialize it
//     if (returnedValue !== null) {
//       const newData = JSON.parse(returnedValue);

//       console.log(newData.username);
//     }
//   } catch (error) {
//     console.error("Redis practice failed:", error);
//   } finally {
//     if (redis.isOpen) {
//       await redis.close();
//     }
//   }
// }

// practiceRedis();

interface TestUser {
  id: string;
  username: string;
  email: string;
}

async function testCacheService() {
  try {
    await connectRedis();

    const user: TestUser = {
      id: "123",
      username: "Alex",
      email: "alex@example.com",
    };

    // 1. Store the user
    await cacheService.set<TestUser>("test:user:123", user, 60);

    // 2. Retrieve the user
    const cachedUser = await cacheService.get<TestUser>("test:user:123");

    console.log("Cached user:", cachedUser);

    // 3. Delete the cached user
    await cacheService.delete("test:user:123");

    // 4. Verify deletion
    const deletedUser = await cacheService.get<TestUser>("test:user:123");

    console.log("After deletion:", deletedUser);
  } catch (error) {
    console.error("Cache test failed:", error);
  } finally {
    if (redis.isOpen) {
      await redis.close();
    }
  }
}

testCacheService();

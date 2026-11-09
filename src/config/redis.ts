import { createClient } from "redis";

import config from "./config";
import logger from "../logs/logger";

const redis = createClient({ url: config.redisUri });

redis.on("connect", () => logger.info("redis connected succesfully"));
redis.on("error", (error) => logger.error("redis: error =", error));

export async function connectRedis() {
  try {
    if (!redis.isOpen) {
      await redis.connect();
    }
  } catch (error) {
    logger.error("Failed connecting to redis: error =", error);
  }
}

export default redis;

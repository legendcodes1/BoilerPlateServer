import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "../logs/logger";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  const mongoUri = "mongodb://localhost:27017/boilerplate_test";
  // process.env.TEST_MONGO_URI || "mongodb://localhost:27017/boilerplate_test";
  console.log("mongoUri =", mongoUri);
  try {
    await mongoose.connect(mongoUri, {
      autoIndex: true,
      autoCreate: true,
    });
  } catch (error) {
    logger.error("mongoose could not connect: error =", error);
  }

  logger.debug("mongoose connected!");
});

// npm run test -> jest
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

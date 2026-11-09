import app from "./app";
import config from "./config/config";
import logger from "./logs/logger";

import dbConnect from "./config/db.connect";
import redis, { connectRedis } from "./config/redis";

dbConnect(config.mongoUri)
  .then(async () => {
    await connectRedis();

    const server = app.listen(config.port, "0.0.0.0", function () {
      logger.info("server running at port:", process.env.PORT);
    });

    function exitHandler(e: string) {
      redis.quit().then(() => {
        logger.info("Redis client closed");
      });

      if (server) {
        server.close(() => {
          logger.info("closed", e);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    }

    // Handle graceful shutdown on SIGINT (e.g., Ctrl+C)
    process.on("SIGINT", () => {
      console.info("SIGINT received, shutting down gracefully...");
      exitHandler("SIGINT");
    });

    // Handle graceful shutdown on SIGTERM (e.g., kill command)
    process.on("SIGTERM", () => {
      console.info("SIGTERM received, shutting down gracefully...");
      exitHandler("SIGTERM");
    });

    // Handle unexpected errors
    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error);
      exitHandler("uncaughtException");
    });

    process.on("unhandledRejection", (reason, promise) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      exitHandler("unhandledRejection");
    });

    // Handle process exit events
    process.on("exit", (code) => {
      console.info(`Process exiting with code: ${code}`);
    });
  })
  .catch((error) => {
    console.error("server.ts: error =", error);
  });

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import { User } from "./models/User";
// import { AuthToken } from "./models/AuthToken";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.get("/", (_req, res) => {
//   res.send("API is running...");
// });

// async function startServer() {
//   try {
//     await mongoose.connect(process.env.DATABASE_URL as string);

//     logger.info("MongoDB connected");

//     const user = await User.create({
//       email: "test@example.com",
//       username: "testuser",
//       passwordHash: "fake-hash-for-now",
//   });

//     logger.info("Created user:", user);

//     const token = await AuthToken.create({
//       userId: user._id,
//       tokenHash: "fake-token-hash",
//       expiresAt: new Date(Date.now() + 1000 * 60 * 60),
//     });

//     logger.info("Created token:", token);

//     app.listen(PORT, () => {
//       logger.info(`Server is running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("Server startup error:", err);
//   }
// }

// startServer();

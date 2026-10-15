import app from './app';
import config from './config/config'

import dbConnect from "./config/db.connect";

dbConnect(config.mongoUri)
  .then(() => {
    const server = app.listen(config.port, "0.0.0.0", function() {
      console.log("server running at port:", process.env.PORT)
    })
    
    function exitHandler(e: string) {
      if (server) {
        server.close(() => {
          console.log("closed", e)
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
  }).catch(error => {
    console.error('server.ts: error =', error)
  })




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

//     console.log("MongoDB connected");

//     const user = await User.create({
//       email: "test@example.com",
//       username: "testuser",
//       passwordHash: "fake-hash-for-now",
//   });

//     console.log("Created user:", user);

//     const token = await AuthToken.create({
//       userId: user._id,
//       tokenHash: "fake-token-hash",
//       expiresAt: new Date(Date.now() + 1000 * 60 * 60),
//     });

//     console.log("Created token:", token);

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("Server startup error:", err);
//   }
// }

// startServer();
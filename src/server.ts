import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { User } from "./models/User";
import { AuthToken } from "./models/AuthToken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API is running...");
});

async function startServer() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);

    console.log("MongoDB connected");

    const user = await User.create({
      email: "test@example.com",
      username: "testuser",
      passwordHash: "fake-hash-for-now",
  });

    console.log("Created user:", user);

    const token = await AuthToken.create({
      userId: user._id,
      tokenHash: "fake-token-hash",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    });

    console.log("Created token:", token);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server startup error:", err);
  }
}

startServer();
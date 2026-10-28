import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import {
  beforeAll,
  afterAll,
  beforeEach,
  describe,
  it,
  expect,
} from "@jest/globals";

import app from "../app";
import { User } from "../models/User";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
}, 30000);

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe("GET /users", () => {
  it("returns an empty array when no users exist", async () => {
    // Arrange: beforeEach already emptied the collection

    // Act
    const response = await request(app).get("/users");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });

  it("returns all users when users exist", async () => {
    // ARRANGE
    await User.create([
      {
        username: "alex",
        email: "alex@example.com",
        passwordHash: "test-hash-1",
      },
      {
        username: "sam",
        email: "sam@example.com",
        passwordHash: "test-hash-2",
      },
    ]);

    // ACT
    const response = await request(app).get("/users");

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2);

    // Your next assertions go here
  });
});
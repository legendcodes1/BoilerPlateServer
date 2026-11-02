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

describe("POST /users", () => {
  it("creates a new user", async () => {
    // ARRANGE
    const newUser = {
      username: "john",
      email: "john@example.com",
      password: "ExamplePassword123!",
    };

    // ACT
    const response = await request(app)
      .post("/users")
      .send(newUser);

    // ASSERT
    expect(response.status).toBe(201);

    expect(response.body.data).toHaveProperty(
      "username",
      "john"
    );

    expect(response.body.data).toHaveProperty(
      "email",
      "john@example.com"
    );

    expect(response.body.data).not.toHaveProperty(
      "passwordHash"
    );
  });
});


describe("PATCH /users/:_id", () => {
  it("should update a user's username", async () => {
    // ARRANGE: Create a test user
    const user = await User.create({
      username: "alex",
      email: "alex@example.com",
      passwordHash: "test-hash",
    });

    const userId = user._id.toString();

    // ACT: Send update request
    const response = await request(app)
      .patch(`/users/${userId}`)
      .send({
        username: "alexUpdated",
      });

    // ASSERT
    expect(response.status).toBe(200);

    // TODO 1: Verify response.body.data.username
     expect(response.body.data).toHaveProperty("username", "alexUpdated");
    // TODO 2: Verify response.body.data.email
     expect(response.body.data).toHaveProperty("email", "john@example.com");
  });
});


describe("DELETE /users/:_id", () => {
  it("should delete an existing user", async () => {
    // ARRANGE
    const user = await User.create({
      username: "alex",
      email: "alex@example.com",
      passwordHash: "test-hash",
    });

    const userId = user._id.toString();

    // ACT
    const response = await request(app)
      .delete(`/users/${userId}`);

    // ASSERT: Check HTTP response
    expect(response.status).toBe(200);

    // ASSERT: Check the document no longer exists
    const deletedUser = await User.findById(userId);

    expect(deletedUser).toBeNull();
  });
});

});
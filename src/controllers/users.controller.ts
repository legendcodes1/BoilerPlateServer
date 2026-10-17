import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from "../models/User"
import salt from 'bcryptjs';

// this controller should have all CRUD operations


class UsersController {
  model: typeof User

  constructor() {
    this.model = User
  }

  async list(req: Request, res: Response) {
    // 
    try {
      const users = await this.model.find();
      res.json(users);
    }catch (error) {
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  }

async getById(req: Request, res: Response) {
  const id = req.params.id;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "User ID is required or invalid" });
    }
    // Step 1: Retrieve the user from MongoDB
    const userFound = await this.model.findById(id);
    // Step 2: Check whether the user exists
    if (!userFound) {
      return res.status(404).json({error: "User not found"})
    // Step 3: Respond with the user
    }
    res.json(userFound);
  } catch (error) {
    // Step 4: Handle unexpected failures
    res.status(500).json({ error: "Failed to retrieve user" });
  }
}
  async create(req: Request, res: Response) {
  try {
    const {email, username, password} = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const passwordHash = await salt.hash(password, 10);
    const newUser = await this.model.create({ email, username, passwordHash });
    // Step 4: Return an appropriate response
    res.status(201).json(newUser);
  } catch (error) {
    // Step 5: Handle errors
    res.status(500).json({ error: "Failed to create user" });
  }
}

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const { email, username } = req.body;

    try {
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "User ID is required or invalid" });
      }
      const updatedUser = await this.model.findByIdAndUpdate(id, { email, username},{runValidators: true, new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      if ( error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
        return res.status(409).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "User ID is required or invalid" });
      }
      const deletedUser = await this.model.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
}

const usersController = new UsersController();

export default usersController;
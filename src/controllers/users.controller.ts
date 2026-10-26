import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import BaseController from "./base.controller";
import { User, type IUser } from "../models/User";

class UsersController extends BaseController<IUser> {
  constructor() {
    super(User);
  }

  override async create(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      // Validate user-specific fields
      if (
        typeof username !== "string" ||
        username.trim().length === 0
      ) {
        return res.status(400).json({
          error: "Invalid username",
        });
      }

      if (
        typeof email !== "string" ||
        email.trim().length === 0
      ) {
        return res.status(400).json({
          error: "Invalid email",
        });
      }

      if (
        typeof password !== "string" ||
        password.trim().length === 0
      ) {
        return res.status(400).json({
          error: "Invalid password",
        });
      }

      // User-specific business logic
      const passwordHash = await bcrypt.hash(password, 10);

      // Save user
      const data = await this.model.create({
        username: username.trim(),
        email: email.trim(),
        passwordHash,
      });

      // Respond without exposing the password hash
      return res.status(201).json({
        message: "User created",
        data: {
          id: data._id,
          username: data.username,
          email: data.email,
        },
      });

    } catch (error) {
      if (
        error instanceof mongoose.mongo.MongoServerError &&
        error.code === 11000
      ) {
        return res.status(409).json({
          error: "Email or username already exists",
        });
      }

      this.errorHandler(error as Error, req, res);
    }
  }

  override async update(req: Request, res: Response) {
    try {
      const id = req.params._id;
      const { username, email } = req.body;

      // 1. Validate the ID
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          error: "Invalid user ID",
        });
      }

      // 2. Build an allowlisted update object
      const updateData: {
        username?: string;
        email?: string;
      } = {};

      // 3. Validate username ONLY if provided
      if (username !== undefined) {
        // TODO: Validate username type and content
        if(typeof username !== "string" || username.trim().length === 0) {
          return res.status(400).json({
            error: "Invalid username",
          });
        }
        // TODO: Assign validated username to updateData
        updateData.username = username.trim();
      }

      // 4. Validate email ONLY if provided
      if (email !== undefined) {
        // TODO: Validate email type and content
        if(typeof email !== "string" || email.trim().length === 0) {
          return res.status(400).json({
            error: "Invalid email",
          });
        }
        // TODO: Assign validated email to updateData
        updateData.email = email.trim();
      }

      // 5. Reject requests without any allowed updates
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          error: "No valid fields provided for update",
        });
      }

      // 6. Perform the database operation
      const data = await this.model.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
          new: true,
          runValidators: true,
        }
      );

      // 7. Handle nonexistent user
      if (!data) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      // 8. Return safe response
      return res.status(200).json({
        message: "User updated",
        data: {
          id: data._id,
          username: data.username,
          email: data.email,
        },
      });

    } catch (error) {
      this.errorHandler(error as Error, req, res);
    }
  }
}


const usersController = new UsersController();

export default usersController;


// import { Request, Response } from 'express';
// import mongoose from 'mongoose';
// import { User } from "../models/User"
// import salt from 'bcryptjs';

// import errorHandler, { ERROR_MESSAGES } from '../utils/helpers/errors.handler'

// // this controller should have all CRUD operations


// class UsersController {
//   model: typeof User

//   constructor() {
//     this.model = User
//   }

//   async list(req: Request, res: Response) {
//     // 
//     try {
//       const users = await this.model.find();
//       res.json(users);
//     }catch (error) {
//       res.status(500).json({ error: "Failed to retrieve users" });
//     }
//   }

//   async getById(req: Request, res: Response) {
//     const id = req.params._id;

//     try {
//       if (!mongoose.isValidObjectId(id)) {
//         return res.status(400).json({ error: "User ID is required or invalid" });
//       }
//       // Step 1: Retrieve the user from MongoDB
//       const userFound = await this.model.findById(id);
//       // Step 2: Check whether the user exists
//       if (!userFound) {
//         // return res.status(404).json({error: "User not found"})
//         throw new Error(ERROR_MESSAGES.USER_NOT_FOUND)
//       // Step 3: Respond with the user
//       }
//       res.json(userFound);
//     } catch (error) {
//       // Step 4: Handle unexpected failures
//       // res.status(500).json({ error: "Failed to retrieve user" });
//       errorHandler((error as Error), req, res)
//     }
//   }
//   async create(req: Request, res: Response) {
//   try {
//     const {email, username, password} = req.body;
//     if (!email || !username || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     const passwordHash = await salt.hash(password, 10);
//     const newUser = await this.model.create({ email, username, passwordHash });
//     // Step 4: Return an appropriate response
//     res.status(201).json(newUser);
//   } catch (error) {
//     // Step 5: Handle errors
//     res.status(500).json({ error: "Failed to create user" });
//   }
// }

//   async update(req: Request, res: Response) {
//     const id = req.params._id;
//     const { email, username } = req.body;

//     try {
//       if (!mongoose.isValidObjectId(id)) {
//         return res.status(400).json({ error: "User ID is required or invalid" });
//       }
//       const updatedUser = await this.model.findByIdAndUpdate(id, { email, username }, {
//         runValidators: true, 
//         returnDocument: "after"
//       });
//       if (!updatedUser) {
//         return res.status(404).json({ error: "User not found" });
//       }
//       res.json(updatedUser);
//     } catch (error) {
//       if ( error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
//         return res.status(409).json({ error: error.message });
//       }
//       res.status(500).json({ error: "Failed to update user" });
//     }
//   }

//   async delete(req: Request, res: Response) {
//     const id = req.params._id;

//     try {
//       if (!mongoose.isValidObjectId(id)) {
//         return res.status(400).json({ error: "User ID is required or invalid" });
//       }
//       const deletedUser = await this.model.findByIdAndDelete(id);
//       if (!deletedUser) {
//         return res.status(404).json({ error: "User not found" });
//       }
//       res.json({ message: "User deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to delete user" });
//     }
//   }
// }

// const usersController = new UsersController();

// export default usersController;
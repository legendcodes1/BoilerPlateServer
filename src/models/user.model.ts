import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export interface IUser {
  email: string;
  username: string;
  password: string;
  deletedAt: Date;
  emailVerifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    emailVerifiedAt: {
      type: Date,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (this.isModified("password") && typeof this.password === "string") {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;

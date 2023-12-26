import mongoose, { Schema, Document } from "mongoose";
import { MongoDBConnector } from "../database";

enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  MODERATOR = "MODERATOR",
}

// Define an interface for the User document
export interface User extends Document {
  name: string;
  password: string;
  phoneNumber: string;
  email: string;
  role: UserRole;
}

// Create a Mongoose schema for the User
const userSchema: Schema<User> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole), // Use enum values for validation
      default: UserRole.CUSTOMER, // Set default role
    },
  },
  {
    timestamps: true,
  }
);

// Create a model based on the schema
const UserModel = new MongoDBConnector().getModel<User>("User", userSchema);

export { UserModel };

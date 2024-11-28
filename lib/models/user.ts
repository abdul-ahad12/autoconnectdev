// models/User.ts

import mongoose, { Schema, Document, Model } from "mongoose";
import { MongoDBConnector } from "../database";

enum UserRoles {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  MODERATOR = "MODERATOR",
  MECHANIC = "MECHANIC",
}

export interface User extends Document {
  name: string;
  password: string;
  phoneNumber: string;
  email: string;
  role: UserRoles;
  ban: boolean; 
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
      enum: Object.values(UserRoles),
      default: UserRoles.CUSTOMER,
    },
    ban: { type: Boolean, default: false }, 
  },
  {
    timestamps: true,
  }
);

let UserModel: mongoose.Model<User> | mongoose.Model<User, {}>;
if (!mongoose.models.User) {
  UserModel = new MongoDBConnector().getModel<User>("User", userSchema);
} else {
  UserModel = mongoose.models.User as Model<User>;
}

export { UserModel, UserRoles };

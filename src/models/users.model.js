/** @format */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Define roles here (e.g., 'user', 'admin', 'superadmin')
      default: "user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/, // Basic email format validation
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);
const User = mongoose.model("User", userSchema);
export default User;

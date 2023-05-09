import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  names: {
    type: String,
    required: true,
    minLength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  password: {
    minLength: 8,
    type: String,
    required: true,
  },
  phone: {
    type: String,
    minLength: 10,
    maxLength: 13,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "viewer", "user", "author"],
    default: "viewer",
  },
});
export const User = model("user", UserSchema);

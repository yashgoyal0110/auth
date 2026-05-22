import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // don't return password in queries by default
    },
    role: {
      type: String,
      enum: ["user", "admin"], // restrict to valid roles
      default: "user",
    },
  },
  { timestamps: true }, // adds createdAt & updatedAt
);

const User = mongoose.model("User", userSchema);
export default User;
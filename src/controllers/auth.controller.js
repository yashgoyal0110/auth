import User from "../models/user.model.js";
// import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const cookieOptions = {
  httpOnly: true, // JS on the client cannot read it → protects against XSS
  secure: false,
  sameSite: "lax", // protects against CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

export const signup = async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }

  const hashPassword = await bcrypt.hash(password, 10); // pass hashing

  const user = await User.create({
    name,
    email,
    password: hashPassword,
    role,
  });

  const token = generateToken(user); // token generate
  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    message: "Signup successful",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Must explicitly select password because of select:false in schema
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // compare saved passsword with user given password
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user); // token generate
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({
    message: "Logout Successfull",
  });
};

import jwt from "jsonwebtoken";
import User from "../src/models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; //

    if (!token) {
      return res.status(401).json({ message: "Not authenticated, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token or decrypt
    const user = await User.findById(decoded._doc._id);

    if (!user) {
      return res.status(401).json({
        message: "user no longer exists",
      });
    }

    next();
  } catch {
    res.status(401).json({ message: "Not authenticated, invalid token" });
  }
};

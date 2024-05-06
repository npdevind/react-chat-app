import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "invalid user" });
    }
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecoded) {
      return res.status(401).json({ error: "invalid user" });
    }

    const user = await User.findById(tokenDecoded.userId).select("-password");
    if (!user) return res.status(404).json("user not found");

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

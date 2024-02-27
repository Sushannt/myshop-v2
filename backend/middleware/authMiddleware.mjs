// helper functions
import { verifyToken } from "../utils/token.utils.mjs";
import asyncHandler from "./asyncHandler.mjs";

// model
import User from "../models/userModel.mjs";

// Protect Routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // read the JWT token from cookie
  token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// Admin middleware
export const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as Admin");
  }
});

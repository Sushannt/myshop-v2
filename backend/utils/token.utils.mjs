import jwt from "jsonwebtoken";

// generate token and set cookie
export const generateToken = (res, userId) => {
  // generate token
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  // set jwt as http-only cookie
  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

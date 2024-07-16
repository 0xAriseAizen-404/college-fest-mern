import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  //   set JWT as an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV != "development",
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
  // console.log("sign");
  return token;
};

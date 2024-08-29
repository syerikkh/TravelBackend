import jwt from "jsonwebtoken";
import express from "express";

export const requireAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  jwt.verify(token, "tokensecret", (err: any, decodedToken: any) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    console.log("token", decodedToken);
    next();
  });
};

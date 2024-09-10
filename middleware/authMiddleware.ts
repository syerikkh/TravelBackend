import jwt from "jsonwebtoken";
import express from "express";

interface AuthenticatedRequest extends express.Request {
  user?: {
    _id: string;
    isAdmin: boolean;
    name: string;
    email: string;
    password: string;
  };
}

export const requireAuth = (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log("No token found in cookies");
    return res.status(401).json({ message: "Authentication required" });
  }
  jwt.verify(token, "tokensecret", (err: any, decodedToken: any) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(401).json({ error: "Invalid token" });
    }
    console.log("tokenhaa", decodedToken);
    req.user = decodedToken;
    next();
  });
};

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const { isAdmin } = req.user || {};
  if (!isAdmin) {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next();
};

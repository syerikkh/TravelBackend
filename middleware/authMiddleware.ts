import jwt from "jsonwebtoken";
import express from "express";

export interface AuthenticatedRequest extends express.Request {
  user?: {
    _id: string;
    isAdmin: boolean;
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
    console.log("decodedToken", decodedToken);
    req.user = {
      _id: decodedToken.userId,
      isAdmin: decodedToken.isAdmin,
    };
    console.log("Token decoded successfully:", req.user);
    next();
  });
};

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Access denied, admin only" });
  }

  console.log("Admin access granted");
  next();
};

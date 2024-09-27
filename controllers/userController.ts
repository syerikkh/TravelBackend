import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const signup = async (req: express.Request, res: express.Response) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, isAdmin: newUser.isAdmin },
      "tokensecret",
      {
        expiresIn: "1h",
      }
    );
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });

    return res.status(201).json({ message: "Successfully created a user" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create new user" });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      "tokensecret",
      {
        expiresIn: "1h",
      }
    );
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });

    return res.status(200).json({
      message: `Successfully logged in ${user.name}, token is ${token}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to log in" });
  }
};

export const getUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getUser = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    // Ensure req.user exists and has an _id
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    // Find the user by their ID
    const user = await User.findById(req.user._id);

    // If user is null, return error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the found user
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user", error });
  }
};

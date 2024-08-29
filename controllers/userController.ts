import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

export const signup = async (req: express.Request, res: express.Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "tokensecret", {
      expiresIn: "1h",
    });
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
    const token = jwt.sign({ userId: user._id }, "tokensecret", {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });

    return res
      .status(200)
      .json({ message: `Successfully logged in ${user.name}` });
  } catch (error) {
    res.status(500).json({ message: "Failed to log in" });
  }
};

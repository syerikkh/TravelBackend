import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { Travel } from "../models/travelModel";

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
    const isMatch = await bcrypt.compare(
      password as string,
      user.password as string
    );
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
      message: `Successfully logged in ${user.name}`,
      token,
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to log in" });
  }
};

export const signout = (req: express.Request, res: express.Response) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Signed out successfull" });
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
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user", error });
  }
};

export const addTravelRouteToCart = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  const { travelRouteId } = req.body;
  try {
    const travelRoute = await Travel.findById(travelRouteId);
    if (!travelRoute) {
      return res.status(404).json({ message: "Travel not found" });
    }
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart.push(travelRoute._id);
    await user.save();

    return res.status(200).json({ message: "Travel added to cart", user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add travel", error });
  }
};

export const deleteTravelFromCart = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  const { travelRouteId } = req.body;
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart = user.cart.filter(
      (routeId) => routeId.toString() !== travelRouteId
    );
    await user.save();
    return res.status(200).json({ message: "Travel removed from cart", user });
  } catch (error) {
    return res.status(500).json({ message: "Failed to remove travel", error });
  }
};
export const getCart = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    const user = await User.findById(req.user?._id).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch cart", error });
  }
};

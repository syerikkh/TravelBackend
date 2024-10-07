import { Travel } from "../models/travelModel";
import express from "express";
import cloudinary from "../utils/cloudinary";

export const getTravel = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const routes = await Travel.find();
    return res.json(routes);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch travel routes" });
  }
};

export const getTravelWithLimit = async (
  req: express.Request,
  res: express.Response
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 4;
  const skip = (page - 1) * limit;

  try {
    const routes = await Travel.find().skip(skip).limit(limit);
    const totalRoutes = await Travel.countDocuments();
    return res.json({
      routes,
      totalPages: Math.ceil(totalRoutes / limit),
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch travel routes" });
  }
};

export const getOneTravel = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  try {
    const route = await Travel.findById(id);
    if (!route) {
      return res.status(404).json({ message: "Travel route not found" });
    }
    return res.json(route);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch travel route" });
  }
};

export const createTravel = async (
  req: express.Request,
  res: express.Response
) => {
  const { title, description, price } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const result = await cloudinary.uploader.upload(image.path);
    const newRoute = new Travel({
      title,
      image: result.secure_url,
      description,
      price,
    });
    await newRoute.save();
    res.status(201).json(newRoute);
    console.log("Successfully created a travel");
  } catch (error) {
    res.status(500).json({ message: "Failed to create travel route" });
  }
};

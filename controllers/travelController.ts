import { TravelRoute } from "../models/travelModel";
import express from "express";

export const getTravel = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const routes = await TravelRoute.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch travel routes" });
  }
};

// Create a new travel route
export const createTravel = async (
  req: express.Request,
  res: express.Response
) => {
  const { title, description } = req.body;
  const imageUrl = req.file?.path;
  try {
    const newRoute = new TravelRoute({ title, imageUrl, description });
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(500).json({ message: "Failed to create travel route" });
  }
};

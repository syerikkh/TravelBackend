import { TravelRoute } from "../models/travelModel";
import express from "express";

export const getTravel = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const routes = await TravelRoute.find();
    return res.json(routes);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch travel routes" });
  }
};

// Create a new travel route
export const createTravel = async (
  req: express.Request,
  res: express.Response
) => {
  const { title, description } = req.body;
  const image = req.file?.path;
  try {
    const newRoute = new TravelRoute({
      title,
      image,
      description,
    });
    await newRoute.save();
    res.status(201).json(newRoute);
    console.log("Successfully created a travel");
  } catch (error) {
    res.status(500).json({ message: "Failed to create travel route" });
  }
};

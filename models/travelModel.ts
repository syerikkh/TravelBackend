import mongoose from "mongoose";

const travelRouteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export const TravelRoute = mongoose.model("TravelRoute", travelRouteSchema);

import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
});

export const ImageModel = model("image", imageSchema);

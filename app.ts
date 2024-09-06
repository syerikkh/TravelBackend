import express from "express";
import { connectToDb } from "./connectToDb";
import dotenv from "dotenv";
import { userRoutes } from "./routes/userRoutes";
import { travelRoutes } from "./routes/travelRoutes";
import cors from "cors";
import upload from "./middleware/multer.";
import cloudinary from "./utils/cloudinary";
import { ImageModel } from "./models/imageMode";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const PORT = 8000;

app.use(express.json());

connectToDb();

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/upload", upload.single("image"), async (req, res) => {
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res.status(400).json({ message: "fail to upload image" });
  }

  try {
    const newImage = await cloudinary.uploader.upload(uploadedFile.path);
    const image = new ImageModel({ imageUrl: newImage.secure_url });
    await image.save();
    return res
      .status(201)
      .json({ message: "successfully uploaded image", image: image });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "failed to upload image" });
  }
});
app.use("/", userRoutes);
app.use("/", travelRoutes);
app.listen(PORT, () => {
  console.log("Application is running at: http://localhost:" + PORT);
});

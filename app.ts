import express from "express";
import { connectToDb } from "./connectToDb";
import dotenv from "dotenv";
import { userRoutes } from "./routes/userRoutes";
import { travelRoutes } from "./routes/travelRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(
  cors({ origin: "http://travel-phi-bice.vercel.app", credentials: true })
);

const PORT = 8000;

app.use(express.json());
app.use(cookieParser());

connectToDb();

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/", userRoutes);
app.use("/", travelRoutes);

app.listen(PORT, () => {
  console.log("Application is running at: http://localhost:" + PORT);
});

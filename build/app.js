"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectToDb_1 = require("./connectToDb");
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = require("./routes/userRoutes");
const travelRoutes_1 = require("./routes/travelRoutes");
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("./middleware/multer."));
const cloudinary_1 = __importDefault(require("./utils/cloudinary"));
const imageMode_1 = require("./models/imageMode");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
const PORT = 8000;
app.use(express_1.default.json());
(0, connectToDb_1.connectToDb)();
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.use("/upload", multer_1.default.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedFile = req.file;
    if (!uploadedFile) {
        return res.status(400).json({ message: "fail to upload image" });
    }
    try {
        const newImage = yield cloudinary_1.default.uploader.upload(uploadedFile.path);
        const image = new imageMode_1.ImageModel({ imageUrl: newImage.secure_url });
        yield image.save();
        return res
            .status(201)
            .json({ message: "successfully uploaded image", image: image });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: "failed to upload image" });
    }
}));
app.use("/", userRoutes_1.userRoutes);
app.use("/", travelRoutes_1.travelRoutes);
app.listen(PORT, () => {
    console.log("Application is running at: http://localhost:" + PORT);
});

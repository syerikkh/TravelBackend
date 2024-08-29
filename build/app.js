"use strict";
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
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
const PORT = 8000;
app.use(express_1.default.json());
(0, connectToDb_1.connectToDb)();
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.use("/", userRoutes_1.userRoutes);
app.use("/", travelRoutes_1.travelRoutes);
app.listen(PORT, () => {
    console.log("Application is running at: http://localhost:" + PORT);
});

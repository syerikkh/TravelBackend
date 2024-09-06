"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModel = void 0;
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
});
exports.ImageModel = (0, mongoose_1.model)("image", imageSchema);

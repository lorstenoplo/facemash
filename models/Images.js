// models/Image.js
import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 1200, // Initial Elo rating
  },
});

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);

// models/Image.js
const mongoose = require("mongoose");
// import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  imgurl: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 1200, // Initial Elo rating
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.models.Image || mongoose.model("Image", ImageSchema);
// export default mongoose.models.Image || mongoose.model("Image", ImageSchema);

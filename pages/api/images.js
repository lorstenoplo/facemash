// pages/api/images.js
import connectToDatabase from "../../lib/mongodb";
import Image from "../../models/Images";

export default async (req, res) => {
  await connectToDatabase();

  const images = await Image.aggregate([{ $sample: { size: 2 } }]);
  res.json(images);
};

// pages/api/vote.js
import connectToDatabase from "../../lib/mongodb";
import Image from "../../models/Images";

export default async (req, res) => {
  await connectToDatabase();

  const { winnerId, loserId } = req.body;

  await Image.findByIdAndUpdate(winnerId, { $inc: { wins: 1 } });
  await Image.findByIdAndUpdate(loserId, { $inc: { losses: 1 } });

  res.json({ message: "Vote recorded" });
};

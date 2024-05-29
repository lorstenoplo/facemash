import connectToDatabase from "../../lib/mongodb";
import Image from "../../models/Images";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectToDatabase();

  try {
    const images = await Image.find({}).sort({ wins: -1 }).exec();
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching rankings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

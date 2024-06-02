import User from "@/models/Users";

import connectToDatabase from "@/lib/mongodb";

export default async function newuser(req, res) {
  console.log("Yaha tak gaya");
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectToDatabase();

  const { name, age, email, occupation } = req.body;
  if (!name) {
    console.error("Invalid input: Name is required");
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    var newuser = new User({
      name,
      age,
      email,
      occupation,
    });

    await newuser.save();

    res
      .status(201)
      .json({ message: "User created successfully", userId: newuser._id });
  } catch (error) {
    console.error("Error recording vote: surekrtehai", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

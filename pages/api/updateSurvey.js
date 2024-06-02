import User from "@/models/Users";

import connectToDatabase from "@/lib/mongodb";

export default async function updateSurvey(req, res) {
  console.log("update mai ayi hai");
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectToDatabase();

  const { userID, selectedID } = req.body;

  if (!userID || !selectedID) {
    console.error("Invalid input: userID or selectedID missing");
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const currentuser = await User.findById(userID);
    console.log("the user id u need", userID);
    console.log("requredl stringlog is: ", selectedID);
    if (!currentuser) {
      console.error("User not found!");
      return res.status(404).json({ message: "user not found" });
    }

    currentuser.surveryresponse.push(selectedID);

    await currentuser.save();
    res.status(200).json({ message: "Survey response updated successfully" });
  } catch (error) {
    console.error("Error recording vote: fir yaha hai kya", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

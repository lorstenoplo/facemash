// pages/api/vote.js
import connectToDatabase from "../../lib/mongodb";
import Image from "../../models/Images";

export default async function login(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectToDatabase();

  const { winnerId, loserId } = req.body;

  if (!winnerId || !loserId) {
    console.error("Invalid input: winnerId or loserId missing");
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const winner = await Image.findById(winnerId);
    const loser = await Image.findById(loserId);

    if (!winner || !loser) {
      console.error("Image not found: ", { winnerId, loserId });
      return res.status(404).json({ message: "Image not found" });
    }

    // Initialize ratings if undefined
    if (winner.rating === undefined) {
      winner.rating = 1200;
    }
    if (loser.rating === undefined) {
      loser.rating = 1200;
    }

    console.log("Current ratings:", {
      winnerRating: winner.rating,
      loserRating: loser.rating,
      winnerWins: winner.wins,
    });

    let Ra = winner.rating;
    let Rb = loser.rating;
    const K = 30; // This can be adjusted based on your requirements

    function Probability(rating1, rating2) {
      return 1.0 / (1 + Math.pow(10, (rating2 - rating1) / 400));
    }

    function EloRating(Ra, Rb, K, d) {
      let Pb = Probability(Ra, Rb);
      let Pa = Probability(Rb, Ra);

      if (d === true) {
        Ra = Ra + K * (1 - Pa);
        Rb = Rb + K * (0 - Pb);
      } else {
        Ra = Ra + K * (0 - Pa);
        Rb = Rb + K * (1 - Pb);
      }

      return { updatedRa: Ra, updatedRb: Rb };
    }

    const { updatedRa, updatedRb } = EloRating(Ra, Rb, K, true);

    console.log("Updated ratings:", { updatedRa, updatedRb });

    await Image.updateOne(
      { _id: winnerId },
      {
        $inc: { wins: 1 },
        $set: { rating: updatedRa },
      }
    );
    await Image.updateOne(
      { _id: loserId },
      {
        $inc: { losses: 1 },
        $set: { rating: updatedRb },
      }
    );

    const updatedWinner = await Image.findById(winnerId);
    const updatedLoser = await Image.findById(loserId);

    console.log("Updated winner:", updatedWinner);
    console.log("Updated loser:", updatedLoser);

    res.json({ message: "Vote recorded" });
  } catch (error) {
    console.error("Error recording vote:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

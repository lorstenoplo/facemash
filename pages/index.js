"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await axios.get("/api/images");
    setImages(res.data);
    setLoading(false);
  };

  const handleVote = async (winnerId, loserId) => {
    await axios.post("/api/vote", { winnerId, loserId });
    fetchImages();
  };

  if (loading) return (
    <div className="h-screen w-screen bg-gray-900 text-white flex items-center justify-center">
      <p>Loading...</p>
    </div>
  );

  return (
    <div>
      <h1 className="text-center p-4 bg-gray-800 text-white font-semibold text-2xl">
        Choose one!
      </h1>
      <div
        style={{ display: "flex", justifyContent: "space-around" }}
        className="bg-gray-900 min-h-screen pt-6"
      >
        {images.map((image, index) => (
          <div key={image._id}>
            <img
              src={image.url}
              alt={`Image ${index}`}
              style={{ maxWidth: "300px" }}
            />
            <button
              onClick={() => handleVote(image._id, images[1 - index]._id)}
              className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

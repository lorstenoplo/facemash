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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>FaceSmash Clone</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {images.map((image, index) => (
          <div key={image._id}>
            <img
              src={image.url}
              alt={`Image ${index}`}
              style={{ maxWidth: "300px" }}
            />
            <button
              onClick={() => handleVote(image._id, images[1 - index]._id)}
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

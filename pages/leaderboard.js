import { useEffect, useState } from "react";
import styles from "../styles/Leaderboard.module.css";

const Leaderboard = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch("/api/rankings");
        if (!response.ok) {
          throw new Error("Failed to fetch rankings");
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-900">
      <h1 className="text-2xl font-semibold text-white text-center pt-3">
        Image Leaderboard
      </h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Rank</th>
            <th className={styles.th}>Image</th>
            <th className={styles.th}>Wins</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image, index) => (
            <tr key={image._id}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>
                <img
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className={styles.img}
                />
              </td>
              <td className={styles.td}>{image.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getTVShows } from "../services/movieapi";

function TVShows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getTVShows();
        setShows(data);
      } catch (error) {
        console.error("TV shows error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading TV shows 📺...</h3>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">📺 TV Shows</h2>

      <div className="row g-4">
        {shows.map((show) => (
          <div
            className="col-6 col-md-4 col-lg-3"
            key={show._id}
          >
            <MovieCard movie={show} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TVShows;
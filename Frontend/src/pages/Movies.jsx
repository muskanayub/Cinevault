import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getMovies } from "../services/movieapi";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error("Movies error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading movies 🎬...</h3>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">🎬 Movies</h2>

      <div className="row g-4">
        {movies.map((movie) => (
          <div
            className="col-6 col-md-4 col-lg-3"
            key={movie._id}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
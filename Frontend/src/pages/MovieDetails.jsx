import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  addToWatchlist,
} from "../services/movieapi";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Movie details error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleAddToList = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      await addToWatchlist({
        movieId: movie._id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.posterPath,
        backdropPath: movie.backdropPath,
        releaseDate: movie.releaseDate,
        rating: movie.rating,
        genre: movie.genre,
        type: movie.type,
        category: movie.category,
      });

      alert("Added to My List ❤️");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add movie"
      );
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container py-5 text-center">
        <h3>Movie not found</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-md-4">
          <img
            src={
              movie.posterPath ||
              "https://via.placeholder.com/500x750?text=No+Poster"
            }
            alt={movie.title}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-8">
          <h1>{movie.title}</h1>

          <p className="text-muted">
            {movie.releaseDate?.slice(0, 4)} • {movie.genre}
          </p>

          <p>⭐ {movie.rating}</p>

          <p className="lead">
            {movie.overview}
          </p>

          <button
            className="btn btn-danger"
            onClick={handleAddToList}
          >
            ❤️ Add to My List
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
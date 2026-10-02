import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToWatchlist } from "../services/movieApi";
import { movieImages } from "../data/movieImages";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const [added, setAdded] = useState(false);

  const handleCardClick = () => {
    navigate(`/movie/${movie._id}`);
  };

  const handleWatchlist = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
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

      setAdded(true);
    } catch (error) {
      if (
        error.response?.data?.message ===
        "Movie already in watchlist"
      ) {
        setAdded(true);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <article
      className="cv-movie-card"
      onClick={handleCardClick}
    >

      <div className="cv-poster-wrapper">

        <img
  src={
    movieImages[movie.title] ||
    movie.posterPath
  }
  alt={movie.title}
  className="cv-poster"
/>

        <div className="cv-card-gradient"></div>

        <button
          className={`cv-add-btn ${
            added ? "added" : ""
          }`}
          onClick={handleWatchlist}
        >
          {added ? "✓" : "+"}
        </button>

        <div className="cv-card-overlay">
          <button className="cv-play-btn">
            ▶
          </button>
        </div>

        <span className="cv-rating">
          ⭐ {movie.rating}
        </span>

      </div>

      <div className="cv-card-info">

        <h3>{movie.title}</h3>

        <div className="cv-card-meta">
          <span>
            {movie.releaseDate?.slice(0, 4)}
          </span>

          <span>•</span>

          <span>{movie.genre}</span>
        </div>

      </div>

    </article>
  );
}

export default MovieCard;
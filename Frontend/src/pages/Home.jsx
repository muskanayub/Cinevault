import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import shawshankHero from "../assets/movies/backdrops/shawshank-hero.jpg";

import {
  getPopularMovies,
  getTrendingMovies,
} from "../services/movieApi";

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, popular] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
        ]);

        setTrendingMovies(trending || []);
        setPopularMovies(popular || []);
      } catch (error) {
        console.error("Home API error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load movies"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const heroMovie =
    trendingMovies[0] || popularMovies[0];

  // LOADING
  if (loading) {
    return (
      <div className="cv-loading">
        <div className="cv-loader"></div>
        <p>Loading CineVault...</p>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="cv-error">
        <h2>Something went wrong</h2>
        <p>{error}</p>

        <button
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main>

      {/* ================= HERO ================= */}

      {heroMovie && (
        <section className="cv-hero">

          {/* BACKGROUND IMAGE */}
          <div
            className="cv-hero-bg"
            style={{
              backgroundImage: `url(${shawshankHero})`,
            }}
          />

          {/* DARK OVERLAY */}
          <div className="cv-hero-overlay"></div>

          {/* HERO CONTENT */}
          <div className="cv-hero-content">

            <span className="cv-hero-badge">
              🔥 #1 TRENDING
            </span>

            <h1>
              {heroMovie.title}
            </h1>

            <div className="cv-hero-meta">

              <span>
                ⭐ {heroMovie.rating}
              </span>

              <span>
                {heroMovie.releaseDate?.slice(0, 4)}
              </span>

              <span>
                {heroMovie.genre}
              </span>

            </div>

            <p>
              {heroMovie.overview}
            </p>

            <div className="cv-hero-buttons">

              <button
                className="cv-watch-btn"
                onClick={() =>
                  (window.location.href =
                    `/movie/${heroMovie._id}`)
                }
              >
                ▶ Watch Now
              </button>

              <button
                className="cv-more-btn"
                onClick={() =>
                  (window.location.href =
                    `/movie/${heroMovie._id}`)
                }
              >
                More Info
              </button>

            </div>

          </div>

        </section>
      )}

      {/* ================= MOVIE CONTENT ================= */}

      <section className="cv-content">

        <MovieSection
          title="Trending Now"
          subtitle="What everyone is watching"
          movies={trendingMovies}
        />

        <MovieSection
          title="Popular Movies"
          subtitle="Top-rated picks for you"
          movies={popularMovies}
        />

      </section>

    </main>
  );
}


// ================= MOVIE SECTION =================

function MovieSection({
  title,
  subtitle,
  movies,
}) {
  return (
    <section className="cv-section">

      <div className="cv-section-header">

        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <button className="cv-see-all">
          See All →
        </button>

      </div>

      {movies.length > 0 ? (
        <div className="cv-movie-row">

          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
            />
          ))}

        </div>
      ) : (
        <div className="cv-empty">
          No movies available.
        </div>
      )}

    </section>
  );
}

export default Home;
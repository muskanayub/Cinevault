import { Link } from "react-router-dom";

function Hero({ movie }) {
  if (!movie) {
    return null;
  }

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(0,0,0,0.95),
            rgba(0,0,0,0.4),
            rgba(0,0,0,0.1)
          ),
          url(${movie.backdrop})
        `,
      }}
    >

      <div className="container">

        <div className="hero-content">

          <p className="text-danger fw-bold">
            FEATURED
          </p>

          <h1 className="display-2 fw-bold">
            {movie.title}
          </h1>

          <div className="movie-info mb-3">

            <span>
              ⭐ {movie.rating}
            </span>

            <span>
              {movie.year}
            </span>

            <span>
              {movie.genre}
            </span>

          </div>

          <p className="lead">
            {movie.description}
          </p>

          <div className="mt-4">

            <Link
              to={`/movie/${movie.id}`}
              className="btn btn-light btn-lg me-2"
            >
              ▶ Play
            </Link>

            <Link
              to={`/movie/${movie.id}`}
              className="btn btn-secondary btn-lg"
            >
              ℹ More Info
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
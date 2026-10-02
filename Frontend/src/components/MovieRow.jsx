import MovieCard from "./MovieCard";

function MovieRow({ title, movies }) {

  return (
    <section className="movie-section">

      <div className="container-fluid px-4">

        <h2 className="movie-row-title">
          {title}
        </h2>

        <div className="movie-row">

          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default MovieRow;
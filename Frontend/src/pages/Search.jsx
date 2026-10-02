import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/movieapi";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(
    searchParams.get("query") || ""
  );

  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =========================
  // LIVE SEARCH
  // =========================

  useEffect(() => {
    const trimmedQuery = query.trim();

    // If search box is empty
    if (!trimmedQuery) {
      setMovies([]);
      setError("");
      return;
    }

    // Wait 300ms after user stops typing
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        // Update URL
        setSearchParams(
          {
            query: trimmedQuery,
          },
          { replace: true }
        );

        const results =
          await searchMovies(trimmedQuery);

        setMovies(results || []);

      } catch (error) {
        console.error(
          "Search error:",
          error
        );

        setMovies([]);

        setError(
          error.response?.data?.message ||
            "Failed to search movies."
        );
      } finally {
        setLoading(false);
      }
    }, 300);

    // Cancel previous search if user keeps typing
    return () => {
      clearTimeout(timer);
    };

  }, [query, setSearchParams]);


  // =========================
  // SEARCH FORM
  // =========================

  const handleSearch = (e) => {
    e.preventDefault();

    // Search is already happening live.
    // This prevents page refresh.
  };


  return (
    <main className="cv-search-page">

      <div className="cv-search-container">

        {/* HEADER */}

        <div className="cv-search-header">

          <span className="cv-search-icon">
            🔎
          </span>

          <h1>
            Search CineVault
          </h1>

        </div>


        {/* SEARCH BOX */}

        <form
          className="cv-search-form"
          onSubmit={handleSearch}
        >

          <input
            type="text"
            placeholder="Search for movies or TV shows..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            autoFocus
          />

          <button type="submit">
            Search
          </button>

        </form>


        {/* LOADING */}

        {loading && (
          <div className="cv-search-loading">

            <div className="cv-loader"></div>

            <p>
              Searching...
            </p>

          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="cv-search-error">
            {error}
          </div>
        )}


        {/* RESULTS */}

        {!loading &&
          !error &&
          movies.length > 0 && (

            <section className="cv-search-results">

              <div className="cv-search-results-header">

                <h2>
                  Results for "{query}"
                </h2>

                <span>
                  {movies.length} found
                </span>

              </div>


              <div className="cv-movie-row">

                {movies.map((movie) => (

                  <MovieCard
                    key={movie._id}
                    movie={movie}
                  />

                ))}

              </div>

            </section>
          )}


        {/* NO RESULTS */}

        {!loading &&
          !error &&
          query.trim() &&
          movies.length === 0 && (

            <div className="cv-no-results">

              <div className="cv-no-results-icon">
                🎬
              </div>

              <h2>
                No movies or shows found
              </h2>

              <p>
                Try another title, genre,
                or TV show.
              </p>

            </div>
          )}

      </div>

    </main>
  );
}

export default Search;
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchMovies } from "../services/movieApi";

function Navbar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // =========================
  // LIVE SEARCH
  // =========================

  useEffect(() => {
    const query = search.trim();

    if (!query) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setSearching(true);

        const data = await searchMovies(query);

        setResults(data || []);
        setShowResults(true);
      } catch (error) {
        console.error("Navbar search error:", error);

        setResults([]);
        setShowResults(false);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // =========================
  // SUBMIT SEARCH
  // =========================

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    setShowResults(false);

    navigate(
      `/search?query=${encodeURIComponent(query)}`
    );
  };

  // =========================
  // SELECT MOVIE
  // =========================

  const handleMovieClick = (movie) => {
    setSearch("");
    setResults([]);
    setShowResults(false);

    navigate(`/movie/${movie._id}`);
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="cv-navbar">

      <div className="cv-navbar-inner">

        {/* LOGO */}

        <Link to="/" className="cv-logo">

          <span className="cv-logo-icon">
            ▶
          </span>

          <span>
            Cine<span>Vault</span>
          </span>

        </Link>


        {/* NAVIGATION */}

        <div className="cv-nav-links">

          <Link to="/">Home</Link>

          <Link to="/movies">
            Movies
          </Link>

          <Link to="/tv-shows">
            TV Shows
          </Link>

          <Link to="/my-list">
            My List
          </Link>

        </div>


        {/* RIGHT SIDE */}

        <div className="cv-navbar-right">

          {/* SEARCH */}

          <div className="cv-search-wrapper">

            <form
              onSubmit={handleSearch}
              className="cv-search"
            >

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onFocus={() => {
                  if (results.length > 0) {
                    setShowResults(true);
                  }
                }}
              />

            </form>


            {/* SEARCH RESULTS */}

            {showResults && (
              <div className="cv-search-results-dropdown">

                {searching && (
                  <div className="cv-search-message">
                    Searching...
                  </div>
                )}

                {!searching &&
                  results.length > 0 &&
                  results.slice(0, 5).map((movie) => (

                    <button
                      key={movie._id}
                      className="cv-search-result"
                      onClick={() =>
                        handleMovieClick(movie)
                      }
                    >

                      <img
                        src={
                          movie.posterPath ||
                          "https://via.placeholder.com/60x90?text=No+Poster"
                        }
                        alt={movie.title}
                      />

                      <div>

                        <strong>
                          {movie.title}
                        </strong>

                        <span>
                          {movie.releaseDate?.slice(0, 4)}
                          {" • "}
                          {movie.genre}
                        </span>

                      </div>

                    </button>

                  ))}

                {!searching &&
                  results.length === 0 && (
                    <div className="cv-search-message">
                      No movies found
                    </div>
                  )}

              </div>
            )}

          </div>


          {/* USER */}

          {user ? (

            <div className="cv-user-menu">

              <span className="cv-avatar">
                {user.name
                  ?.charAt(0)
                  .toUpperCase()}
              </span>

              <button onClick={logout}>
                Logout
              </button>

            </div>

          ) : (

            <Link
              to="/login"
              className="cv-login-btn"
            >
              Sign In
            </Link>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
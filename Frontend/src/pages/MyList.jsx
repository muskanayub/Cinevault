import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

function MyList() {
  const navigate = useNavigate();

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/users/watchlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWatchlist(response.data);

    } catch (error) {
      console.error(
        "Watchlist error:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      setError(
        error.response?.data?.message ||
        "Failed to load watchlist"
      );

    } finally {
      setLoading(false);
    }
  };

  const removeMovie = async (movieId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/users/watchlist/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh list
      fetchWatchlist();

    } catch (error) {
      console.error(
        "Remove movie error:",
        error
      );
    }
  };

  if (loading) {
    return (
      <div className="page">
        <Navbar />

        <div className="container movies-page text-center">
          <h3>Loading your list...</h3>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="page">

      <Navbar />

      <main className="container movies-page">

        <h1 className="fw-bold mb-4">
          My List ❤️
        </h1>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {watchlist.length === 0 ? (

          <div className="text-center py-5">

            <h3>
              Your list is empty 🍿
            </h3>

            <p className="text-secondary">
              Movies you add to your watchlist
              will appear here.
            </p>

            <Link
              to="/movies"
              className="btn btn-danger mt-3"
            >
              Browse Movies
            </Link>

          </div>

        ) : (

          <div className="row g-4">

            {watchlist.map((movie) => (

              <div
                className="col-6 col-md-4 col-lg-3"
                key={movie._id}
              >

                <MovieCard
                  movie={{
                    id: movie._id,
                    title: movie.title,
                    poster:
                      movie.posterPath,
                    rating: movie.rating,
                    year:
                      movie.releaseDate
                        ?.slice(0, 4),
                  }}
                />

                <button
                  className="btn btn-outline-danger btn-sm w-100 mt-2"
                  onClick={() =>
                    removeMovie(movie._id)
                  }
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

        )}

      </main>

      <Footer />

    </div>
  );
}

export default MyList;
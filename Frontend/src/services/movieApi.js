import axios from "axios";

const API_URL = "http://localhost:5000/api";

const movieApi = axios.create({
  baseURL: API_URL,
});

// ============================================
// MOVIES
// ============================================

// Get all movies
export const getMovies = async () => {
  const response = await movieApi.get("/movies");
  return response.data;
};

// Get popular movies
export const getPopularMovies = async () => {
  const response = await movieApi.get("/movies/popular");
  return response.data;
};

// Get trending movies
export const getTrendingMovies = async () => {
  const response = await movieApi.get("/movies/trending");
  return response.data;
};

// Get TV shows
export const getTVShows = async () => {
  const response = await movieApi.get("/movies/tv");
  return response.data;
};

// Search movies and TV shows
export const searchMovies = async (query) => {
  const response = await movieApi.get(
    `/movies/search?query=${encodeURIComponent(query)}`
  );

  return response.data;
};

// Get movie details
export const getMovieDetails = async (id) => {
  const response = await movieApi.get(`/movies/${id}`);

  return response.data;
};

// ============================================
// WATCHLIST
// ============================================

// Add movie to My List
export const addToWatchlist = async (movie) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login first");
  }

  const response = await movieApi.post(
    "/users/watchlist/movie",
    movie,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Get My List
export const getWatchlist = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login first");
  }

  const response = await movieApi.get(
    "/users/watchlist",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Remove movie from My List
export const removeFromWatchlist = async (movieId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login first");
  }

  const response = await movieApi.delete(
    `/users/watchlist/${movieId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export default movieApi;
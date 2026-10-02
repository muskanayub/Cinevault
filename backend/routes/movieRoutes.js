const express = require("express");

const {
  getAllMovies,
  getAllTVShows,
  getPopularMovies,
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/", getAllMovies);

router.get("/tv", getAllTVShows);

router.get("/popular", getPopularMovies);

router.get("/trending", getTrendingMovies);

router.get("/search", searchMovies);

router.get("/:id", getMovieDetails);

module.exports = router;
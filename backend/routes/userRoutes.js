const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getWatchlist,
  addToWatchlist,
  addMovieToWatchlist,
  removeFromWatchlist,
} = require("../controllers/userController");

const router = express.Router();

// Get user's watchlist
router.get(
  "/watchlist",
  protect,
  getWatchlist
);

// Add existing MongoDB movie
router.post(
  "/watchlist",
  protect,
  addToWatchlist
);

// Add movie using movie data
router.post(
  "/watchlist/movie",
  protect,
  addMovieToWatchlist
);

// Remove movie
router.delete(
  "/watchlist/:movieId",
  protect,
  removeFromWatchlist
);

module.exports = router;
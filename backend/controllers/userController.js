const User = require("../models/User");
const Movie = require("../models/Movie");

// ============================================
// GET USER WATCHLIST
// ============================================

const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("watchlist");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user.watchlist);
  } catch (error) {
    console.error("Get watchlist error:", error.message);

    res.status(500).json({
      message: "Failed to get watchlist",
    });
  }
};

// ============================================
// ADD EXISTING MOVIE TO WATCHLIST
// ============================================

const addToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(400).json({
        message: "Movie ID is required",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    // Check if already in watchlist
    if (
      user.watchlist.some(
        (id) => id.toString() === movie._id.toString()
      )
    ) {
      return res.status(400).json({
        message: "Movie already in watchlist",
      });
    }

    user.watchlist.push(movie._id);

    await user.save();

    await user.populate("watchlist");

    res.status(200).json({
      message: "Movie added to watchlist",
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.error("Add watchlist error:", error.message);

    res.status(500).json({
      message: "Failed to add movie",
    });
  }
};

// ============================================
// ADD MOVIE TO WATCHLIST
// ============================================

const addMovieToWatchlist = async (req, res) => {
  try {
    const {
      movieId,
      title,
      overview,
      posterPath,
      backdropPath,
      releaseDate,
      rating,
      genre,
      type,
      category,
    } = req.body;

    // Find logged-in user
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let movie;

    // If MongoDB movie ID is provided,
    // try to find the existing movie
    if (movieId) {
      movie = await Movie.findById(movieId);
    }

    // If movie doesn't exist,
    // create a new movie
    if (!movie) {
      movie = await Movie.create({
        title,
        overview,
        posterPath,
        backdropPath,
        releaseDate,
        rating,
        genre,
        type,
        category,
      });
    }

    // Check if movie is already in watchlist
    if (
      user.watchlist.some(
        (id) => id.toString() === movie._id.toString()
      )
    ) {
      return res.status(400).json({
        message: "Movie already in watchlist",
      });
    }

    // Add movie ID to user's watchlist
    user.watchlist.push(movie._id);

    await user.save();

    // Populate complete movie information
    await user.populate("watchlist");

    res.status(200).json({
      message: "Movie added to watchlist",
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.error("Add movie error:", error.message);

    res.status(500).json({
      message: "Failed to add movie",
    });
  }
};

// ============================================
// REMOVE MOVIE FROM WATCHLIST
// ============================================

const removeFromWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.watchlist = user.watchlist.filter(
      (id) => id.toString() !== movieId
    );

    await user.save();

    await user.populate("watchlist");

    res.status(200).json({
      message: "Movie removed from watchlist",
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.error(
      "Remove watchlist error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to remove movie",
    });
  }
};

// ============================================
// EXPORT CONTROLLERS
// ============================================

module.exports = {
  getWatchlist,
  addToWatchlist,
  addMovieToWatchlist,
  removeFromWatchlist,
};
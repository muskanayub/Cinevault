const Movie = require("../models/Movie");

// ============================================
// GET ALL MOVIES
// ============================================

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({
      type: "movie",
    }).sort({
      rating: -1,
    });

    res.status(200).json(movies);
  } catch (error) {
    console.error("Get movies error:", error.message);

    res.status(500).json({
      message: "Failed to get movies",
    });
  }
};

// ============================================
// GET ALL TV SHOWS
// ============================================

const getAllTVShows = async (req, res) => {
  try {
    const tvShows = await Movie.find({
      type: "tv",
    }).sort({
      rating: -1,
    });

    res.status(200).json(tvShows);
  } catch (error) {
    console.error("Get TV shows error:", error.message);

    res.status(500).json({
      message: "Failed to get TV shows",
    });
  }
};

// ============================================
// GET POPULAR MOVIES
// ============================================

const getPopularMovies = async (req, res) => {
  try {
    const movies = await Movie.find({
      type: "movie",
    })
      .sort({
        rating: -1,
      })
      .limit(10);

    res.status(200).json(movies);
  } catch (error) {
    console.error("Get popular movies error:", error.message);

    res.status(500).json({
      message: "Failed to get popular movies",
    });
  }
};

// ============================================
// GET TRENDING MOVIES
// ============================================

const getTrendingMovies = async (req, res) => {
  try {
    const movies = await Movie.find({
      category: "trending",
    })
      .sort({
        rating: -1,
      })
      .limit(10);

    // If there are no movies marked as trending,
    // return highly-rated movies instead.
    if (movies.length === 0) {
      const fallbackMovies = await Movie.find({
        type: "movie",
      })
        .sort({
          rating: -1,
        })
        .limit(10);

      return res.status(200).json(fallbackMovies);
    }

    res.status(200).json(movies);
  } catch (error) {
    console.error("Get trending movies error:", error.message);

    res.status(500).json({
      message: "Failed to get trending movies",
    });
  }
};

// ============================================
// SEARCH MOVIES AND TV SHOWS
// ============================================

const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || !query.trim()) {
      return res.status(200).json([]);
    }

    const movies = await Movie.find({
      $or: [
        {
          title: {
            $regex: query.trim(),
            $options: "i",
          },
        },
        {
          genre: {
            $regex: query.trim(),
            $options: "i",
          },
        },
      ],
    })
      .sort({
        rating: -1,
      })
      .limit(20);

    res.status(200).json(movies);

  } catch (error) {
    console.error(
      "Search error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to search movies",
    });
  }
};

// ============================================
// GET MOVIE DETAILS
// ============================================

const getMovieDetails = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error("Movie details error:", error.message);

    res.status(500).json({
      message: "Failed to get movie details",
    });
  }
};

module.exports = {
  getAllMovies,
  getAllTVShows,
  getPopularMovies,
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
};
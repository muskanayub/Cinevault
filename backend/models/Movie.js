const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
      trim: true,
    },

    overview: {
      type: String,
      default: "",
    },

    posterPath: {
      type: String,
      default: "",
    },

    backdropPath: {
      type: String,
      default: "",
    },

    releaseDate: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },

    genre: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["movie", "tv"],
      default: "movie",
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
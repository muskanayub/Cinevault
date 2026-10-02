const dotenv = require("dotenv");
const mongoose = require("mongoose");

const Movie = require("./models/Movie");

dotenv.config();

const movies = [
  {
    title: "The Dark Knight",
    overview:
      "Batman faces a criminal mastermind who plunges Gotham City into chaos.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/hqCe9Vx4mF5F6JZ6c6J9Y6J6J6J.jpg",
    releaseDate: "2008-07-18",
    rating: 9.0,
    genre: "Action",
    type: "movie",
    category: "popular",
  },

  {
    title: "Inception",
    overview:
      "A skilled thief who steals secrets through dreams is given a chance to erase his past.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    releaseDate: "2010-07-16",
    rating: 8.8,
    genre: "Science Fiction",
    type: "movie",
    category: "trending",
  },

  {
    title: "Interstellar",
    overview:
      "Explorers travel through a wormhole in space in search of a new home for humanity.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    releaseDate: "2014-11-07",
    rating: 8.7,
    genre: "Science Fiction",
    type: "movie",
    category: "popular",
  },

  {
    title: "Avengers: Endgame",
    overview:
      "The Avengers attempt to reverse the devastating events caused by Thanos.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/ulzhW7qT8a8VJ5vM6Y7F7K8Q8Q.jpg",
    releaseDate: "2019-04-26",
    rating: 8.3,
    genre: "Action",
    type: "movie",
    category: "trending",
  },

  {
    title: "Spider-Man: No Way Home",
    overview:
      "Peter Parker faces a new threat after his identity is revealed to the world.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    releaseDate: "2021-12-17",
    rating: 8.2,
    genre: "Action",
    type: "movie",
    category: "popular",
  },

  {
    title: "The Matrix",
    overview:
      "A hacker discovers that reality is not what it appears to be.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1uV1.jpg",
    releaseDate: "1999-03-31",
    rating: 8.7,
    genre: "Science Fiction",
    type: "movie",
    category: "featured",
  },

  {
    title: "John Wick",
    overview:
      "A retired assassin is forced back into the criminal underworld.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/umC04Cozevu8nn3JTDJ1pc7PVTn.jpg",
    releaseDate: "2014-10-24",
    rating: 7.4,
    genre: "Action",
    type: "movie",
    category: "trending",
  },

  {
    title: "The Shawshank Redemption",
    overview:
      "Two imprisoned men form a friendship and find hope over many years.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/9cjIGRFP6l2QZQ8fQ8rG8r8r8r8.jpg",
    backdropPath: "",
    releaseDate: "1994-09-23",
    rating: 9.3,
    genre: "Drama",
    type: "movie",
    category: "popular",
  },

  {
    title: "Stranger Things",
    overview:
      "A group of friends uncover mysterious supernatural events in their small town.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    backdropPath: "",
    releaseDate: "2016-07-15",
    rating: 8.6,
    genre: "Drama",
    type: "tv",
    category: "trending",
  },

  {
    title: "Wednesday",
    overview:
      "Wednesday Addams investigates mysterious events at Nevermore Academy.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    backdropPath: "",
    releaseDate: "2022-11-23",
    rating: 8.1,
    genre: "Fantasy",
    type: "tv",
    category: "popular",
  },

  {
    title: "Breaking Bad",
    overview:
      "A chemistry teacher enters the world of illegal drug production.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/ztkUQFLlC6P1ZJ9Q8Q8Q8Q8Q8Q.jpg",
    backdropPath: "",
    releaseDate: "2008-01-20",
    rating: 9.5,
    genre: "Crime",
    type: "tv",
    category: "popular",
  },

  {
    title: "Money Heist",
    overview:
      "A mysterious criminal mastermind recruits a team for an ambitious heist.",
    posterPath:
      "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    backdropPath: "",
    releaseDate: "2017-05-02",
    rating: 8.2,
    genre: "Crime",
    type: "tv",
    category: "trending",
  },
];

const seedMovies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected ✅");

    await Movie.deleteMany();

    await Movie.insertMany(movies);

    console.log(`${movies.length} movies added successfully 🎬`);

    await mongoose.connection.close();

    console.log("Database connection closed.");

    process.exit(0);
  } catch (error) {
    console.error("Seed error ❌:", error.message);

    process.exit(1);
  }
};

seedMovies();
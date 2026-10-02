const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// ==========================
// MIDDLEWARE
// ==========================

app.use(cors());

app.use(express.json());

// ==========================
// TEST ROUTE
// ==========================

app.get("/", (req, res) => {
  res.json({
    message: "CineVault API is running 🚀",
  });
});

// ==========================
// API ROUTES
// ==========================

app.use("/api/auth", authRoutes);

app.use("/api/movies", movieRoutes);

app.use("/api/users", userRoutes);

// ==========================
// SERVER
// ==========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} 🚀`
  );
});
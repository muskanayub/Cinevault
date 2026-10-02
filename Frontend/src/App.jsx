import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyList from "./pages/MyList";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <div style={{ paddingTop: "70px" }}>
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/movies"
            element={<Movies />}
          />

          <Route
            path="/tv-shows"
            element={<TVShows />}
          />

          <Route
            path="/search"
            element={<Search />}
          />

          <Route
            path="/movie/:id"
            element={<MovieDetails />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/my-list"
            element={<MyList />}
          />

        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
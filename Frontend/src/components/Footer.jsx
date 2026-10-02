import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="cv-footer">

      <div className="cv-footer-container">

        {/* BRAND */}
        <div className="cv-footer-brand">

          <Link to="/" className="cv-footer-logo">
            Cine<span>Vault</span>
          </Link>

          <p>
            Your personal destination for movies,
            TV shows and entertainment.
          </p>

        </div>

        {/* NAVIGATION */}
        <div className="cv-footer-column">

          <h3>Navigation</h3>

          <div className="cv-footer-links">
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/tv-shows">TV Shows</Link>
            <Link to="/my-list">My List</Link>
          </div>

        </div>

        {/* ACCOUNT */}
        <div className="cv-footer-column">

          <h3>Account</h3>

          <div className="cv-footer-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>

        </div>

        {/* SOCIAL */}
        <div className="cv-footer-column">

          <h3>Follow Us</h3>

          <div className="cv-footer-links">

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Instagram
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              YouTube
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              GitHub
            </a>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="cv-footer-bottom">

        <p>
          © 2026 CineVault. Built with MERN Stack.
        </p>

      </div>

    </footer>
  );
}

export default Footer;
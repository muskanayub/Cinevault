import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="cv-auth-page">

      <div className="cv-auth-card">

        <div className="cv-auth-logo">
          <span className="cv-auth-logo-icon">
            ▶
          </span>

          <span>
            Cine<span>Vault</span>
          </span>
        </div>

        <h1>Welcome back</h1>

        <p className="cv-auth-subtitle">
          Sign in to continue watching.
        </p>

        {error && (
          <div className="cv-auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="cv-form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="cv-form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="cv-auth-submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <p className="cv-auth-footer">
          New to CineVault?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </p>

      </div>

    </main>
  );
}

export default Login;
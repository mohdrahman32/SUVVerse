
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.user) {
        setError(data.message || "Unable to log in. Please try again.");
        return;
      }

      // The backend sets the HttpOnly authentication cookie.
      // Do not store the JWT in sessionStorage or localStorage.
      setUser(data.user);

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login request failed:", error);

      setError(
        "Couldn't connect to SUVVerse. Please check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-showcase" aria-label="About SUVVerse">
        <Link className="auth-brand" to="/">
          SUV<span>VERSE</span>
          <small>THE INDIAN SUV JOURNAL</small>
        </Link>

        <div className="auth-showcase__content">
          <p className="auth-eyebrow">YOUR NEXT JOURNEY STARTS HERE</p>

          <h1>
            Find the SUV
            <br />
            that feels like
            <br />
            <em>yours.</em>
          </h1>

          <p className="auth-showcase__description">
            Discover, compare, and make confident decisions about your next
            SUV—all in one place.
          </p>
        </div>

        <p className="auth-showcase__footer">MADE FOR THE JOURNEY.</p>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <Link className="auth-mobile-brand" to="/">
            SUV<span>VERSE</span>
          </Link>

          <p className="auth-form-wrap__eyebrow">WELCOME BACK</p>

          <h2>Sign in to SUVVerse</h2>

          <p className="auth-form-wrap__intro">
            Pick up where your next adventure begins.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="login-email">Email address</label>

              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>

              <div className="auth-password-wrap">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  className="auth-password-toggle"
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button
              className="auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}

              {!loading && <FiArrowRight aria-hidden="true" />}
            </button>
          </form>

          <p className="auth-switch">
            New to SUVVerse?{" "}
            <Link className="auth-text-link" to="/register">
              Create an account
            </Link>
          </p>

          <Link className="auth-back-home" to="/">
            ← Back to explore SUVs
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Login;

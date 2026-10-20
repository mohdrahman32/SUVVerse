
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import "../styles/Auth.css";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2 || trimmedName.length > 80) {
      setError("Your name must be between 2 and 80 characters.");
      return;
    }

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (password.length < 8 || password.length > 72) {
      setError("Your password must be between 8 and 72 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to create your account.");
        return;
      }

      navigate("/login", {
        replace: true,
        state: {
          message: "Your account is ready. Please sign in.",
        },
      });
    } catch (error) {
      console.error("Registration request failed:", error);

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
          <p className="auth-eyebrow">WELCOME TO THE COMMUNITY</p>

          <h1>
            Every great
            <br />
            journey begins
            <br />
            <em>with a choice.</em>
          </h1>

          <p className="auth-showcase__description">
            Create your SUVVerse account and get ready to explore your next
            vehicle with confidence.
          </p>
        </div>

        <p className="auth-showcase__footer">MADE FOR THE JOURNEY.</p>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <Link className="auth-mobile-brand" to="/">
            SUV<span>VERSE</span>
          </Link>

          <p className="auth-form-wrap__eyebrow">GET STARTED</p>

          <h2>Create your account</h2>

          <p className="auth-form-wrap__intro">
            Join SUVVerse and make your next SUV decision a confident one.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="register-name">Full name</label>

              <input
                id="register-name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                minLength={2}
                maxLength={80}
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">Email address</label>

              <input
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">Password</label>

              <div className="auth-password-wrap">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  minLength={8}
                  maxLength={72}
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

            <div className="auth-field">
              <label htmlFor="register-confirm-password">
                Confirm password
              </label>

              <input
                id="register-confirm-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your password again"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                required
              />
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
              {loading ? "Creating account..." : "Create account"}

              {!loading && <FiArrowRight aria-hidden="true" />}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link className="auth-text-link" to="/login">
              Sign in
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

export default Register;


import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBookmark,
  FiBookOpen,
  FiLogOut,
  FiMenu,
  FiUser,
  FiX,
} from "react-icons/fi";
import { TbCarSuvFilled } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const navigationLinks = [
  { label: "Discover", href: "#explore" },
  { label: "Compare", href: "#compare" },
  { label: "Ownership", href: "#ownership" },
];

function Navbar() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const profileRef = useRef(null);
  const profileButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusableElements = drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!profileOpen) return undefined;

    function handleOutsideClick(event) {
      if (!profileRef.current?.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setProfileOpen(false);
        profileButtonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  async function handleLogout() {
    if (logoutLoading) return;

    setLogoutLoading(true);

    try {
      await logout();

      setProfileOpen(false);
      setMenuOpen(false);

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Unable to log out:", error);
    } finally {
      setLogoutLoading(false);
    }
  }

  function closeProfileAndNavigate() {
    setProfileOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Link
            className="brand"
            to="/"
            aria-label="SUVVerse home"
            onClick={closeMenu}
          >
            <span className="brand__name">
              SUV<span>VERSE</span>
            </span>

            <span className="brand__tagline">
              THE INDIAN SUV JOURNAL
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigationLinks.map((link) => (
              <a
                className="desktop-nav__link"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <a className="header-cta" href="#explore">
              <span>Explore SUVs</span>
              <FiArrowUpRight aria-hidden="true" />
            </a>

            {!loading &&
              (!user ? (
                <div className="header-auth-actions">
                  <Link className="header-login" to="/login">
                    Log in
                  </Link>

                  <Link className="header-register" to="/register">
                    Create account
                  </Link>
                </div>
              ) : (
                <div className="profile-menu" ref={profileRef}>
                  <button
                    ref={profileButtonRef}
                    className="profile-trigger"
                    type="button"
                    aria-label="Open your profile menu"
                    aria-expanded={profileOpen}
                    aria-haspopup="true"
                    onClick={() =>
                      setProfileOpen((current) => !current)
                    }
                  >
                    <FiUser aria-hidden="true" />
                  </button>

                  {profileOpen && (
                    <section
                      className="profile-popover"
                      aria-label="Your SUVVerse profile"
                    >
                      <div className="profile-popover__identity">
                        <div
                          className="profile-avatar"
                          aria-hidden="true"
                        >
                          {user.name.trim().charAt(0).toUpperCase()}
                        </div>

                        <div className="profile-identity__text">
                          <p className="profile-greeting">
                            WELCOME TO SUVVERSE
                          </p>

                          <h2>{user.name}</h2>

                          <p className="profile-email">{user.email}</p>
                        </div>
                      </div>

                      <div className="profile-membership">
                        <span className="profile-membership__dot" />
                        <span>SUVVerse Member</span>

                        <span className="profile-membership__label">
                          EXPLORER
                        </span>
                      </div>

                      <div className="profile-popover__section">
                        <p className="profile-section-label">YOUR SPACE</p>

                        <a
                          className="profile-menu-link"
                          href="#explore"
                          onClick={closeProfileAndNavigate}
                        >
                          <TbCarSuvFilled aria-hidden="true" />

                          <span>
                            <strong>Explore SUVs</strong>
                            <small>Find your next vehicle</small>
                          </span>

                          <FiArrowUpRight className="profile-link-arrow" />
                        </a>

                        <a
                          className="profile-menu-link"
                          href="#compare"
                          onClick={closeProfileAndNavigate}
                        >
                          <FiBookmark aria-hidden="true" />

                          <span>
                            <strong>Compare SUVs</strong>
                            <small>Compare your options</small>
                          </span>

                          <FiArrowUpRight className="profile-link-arrow" />
                        </a>

                        <a
                          className="profile-menu-link"
                          href="#ownership"
                          onClick={closeProfileAndNavigate}
                        >
                          <FiBookOpen aria-hidden="true" />

                          <span>
                            <strong>Ownership guides</strong>
                            <small>Tips for the road ahead</small>
                          </span>

                          <FiArrowUpRight className="profile-link-arrow" />
                        </a>
                      </div>

                      <div className="profile-promo">
                        <span className="profile-promo__eyebrow">
                          THE SUVVERSE EDIT
                        </span>

                        <strong>
                          Thinking about your next SUV?
                        </strong>

                        <p>
                          Explore our latest picks and compare vehicles
                          before making your next move.
                        </p>

                        <a
                          href="#explore"
                          onClick={closeProfileAndNavigate}
                        >
                          Explore the collection <FiArrowRight />
                        </a>
                      </div>

                      <button
                        className="profile-logout"
                        type="button"
                        onClick={handleLogout}
                        disabled={logoutLoading}
                      >
                        <FiLogOut aria-hidden="true" />
                        {logoutLoading ? "Logging out..." : "Log out"}
                      </button>
                    </section>
                  )}
                </div>
              ))}

            <button
              ref={menuButtonRef}
              className="menu-toggle"
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(true)}
            >
              <FiMenu aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-navigation">
          <button
            className="mobile-navigation__backdrop"
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          />

          <aside
            ref={drawerRef}
            id="mobile-navigation"
            className="mobile-navigation__drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="mobile-navigation__top">
              <span className="mobile-navigation__label">
                NAVIGATION
              </span>

              <button
                ref={closeButtonRef}
                className="menu-close"
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMenu}
              >
                <FiX aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile navigation links">
              {navigationLinks.map((link, index) => (
                <a
                  className="mobile-navigation__link"
                  href={link.href}
                  key={link.href}
                  onClick={closeMenu}
                >
                  <span className="mobile-navigation__number">
                    0{index + 1}
                  </span>

                  <span>{link.label}</span>

                  <FiArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </nav>

            {!loading &&
              (!user ? (
                <div className="mobile-auth-actions">
                  <Link
                    className="mobile-auth-link"
                    to="/login"
                    onClick={closeMenu}
                  >
                    Log in
                  </Link>

                  <Link
                    className="mobile-navigation__cta"
                    to="/register"
                    onClick={closeMenu}
                  >
                    Create account <FiArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
              ) : (
                <div className="mobile-profile-summary">
                  <div className="profile-avatar" aria-hidden="true">
                    {user.name.trim().charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutLoading}
                  >
                    <FiLogOut aria-hidden="true" />
                    {logoutLoading ? "Logging out..." : "Log out"}
                  </button>
                </div>
              ))}

            <a
              className="mobile-navigation__cta"
              href="#explore"
              onClick={closeMenu}
            >
              Explore the collection
              <FiArrowUpRight aria-hidden="true" />
            </a>

            <p className="mobile-navigation__footer">
              MADE FOR THE JOURNEY.
            </p>
          </aside>
        </div>
      )}
    </>
  );
}

export default Navbar;

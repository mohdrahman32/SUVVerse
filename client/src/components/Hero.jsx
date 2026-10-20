
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import "./Hero.css";

function Hero() {
  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
    >
      <div className="hero__inner">
        <div className="hero__intro">
          <div className="hero__copy">
            <p className="hero__eyebrow hero-reveal hero-reveal--1">
              <span className="hero__eyebrow-line" />
              THE INDIAN SUV JOURNAL
            </p>

            <h1
              className="hero__title hero-reveal hero-reveal--2"
              id="hero-title"
            >
              The road ahead
              <br />
              is yours to
              <span className="hero__title-accent">
                {" "}define.
              </span>
            </h1>

            <p className="hero__description hero-reveal hero-reveal--3">
              Discover the SUV that fits your ambitions,
              your family, and every road in between.
            </p>

            <div className="hero__actions hero-reveal hero-reveal--4">
              <a className="button button--primary" href="#explore">
                Explore SUVs
                <FiArrowUpRight aria-hidden="true" />
              </a>

              <a
                className="hero__secondary-link"
                href="#compare"
              >
                Compare vehicles
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <div
            className="hero__side-note hero-reveal hero-reveal--4"
            aria-hidden="true"
          >
            <span className="hero__side-note-line" />
            <span>FIND YOUR WAY FORWARD</span>
          </div>
        </div>

        <figure className="hero__visual hero-reveal hero-reveal--image">
          <img
            className="hero__image"
            src="https://images.unsplash.com/photo-1596507931135-75f699668356?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            alt="SUV photographed in a rugged outdoor setting"
            fetchPriority="high"
            decoding="async"
            width="2200"
            height="1200"
          />

          <div
            className="hero__image-shade"
            aria-hidden="true"
          />

          <figcaption className="hero__image-caption">
            <span>BUILT FOR EVERY KIND OF JOURNEY</span>
            <span className="hero__image-index">01 / 04</span>
          </figcaption>

          <a
            className="hero__scroll-link"
            href="#explore"
          >
            <span>SCROLL TO DISCOVER</span>
            <FiArrowDownRight aria-hidden="true" />
          </a>
        </figure>

        <div className="hero__bottom-line">
          <span>YOUR NEXT CHAPTER STARTS HERE.</span>
          <span>DISCOVER. COMPARE. DECIDE.</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;

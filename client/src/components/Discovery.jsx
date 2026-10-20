
import { useEffect, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import "./Discovery.css";

const categories = [
  {
    id: "adventure",
    number: "01",
    eyebrow: "FOR THE EXPLORER",
    title: "Beyond the ordinary.",
    description: "For the roads less travelled.",
    image:
      "https://images.unsplash.com/photo-1621954927815-38af7e3efd93?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "SUV in an outdoor setting",
    layout: "feature",
  },
  {
    id: "city",
    number: "02",
    eyebrow: "FOR THE EVERYDAY",
    title: "Made for the city.",
    description: "Practicality for everyday journeys.",
    image:
      "https://images.unsplash.com/photo-1772456593738-a3c25a466be6?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Modern car photographed from the front",
    layout: "city",
  },
  {
    id: "family",
    number: "03",
    eyebrow: "FOR EVERYONE",
    title: "Room for everyone.",
    description: "Space and comfort for family life.",
    image:
      "https://images.unsplash.com/photo-1765959344666-f8b6fd51dcb5?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Automobile photographed in a clean setting",
    layout: "family",
  },
  {
    id: "value",
    number: "04",
    eyebrow: "SPEND THOUGHTFULLY",
    title: "Make every rupee count.",
    description: "Explore SUVs within your budget.",
    image:
      "https://cdn.shopify.com/s/files/1/0594/1372/5359/files/ChatGPT_Image_Aug_7_2026_12_40_31_PM.png?v=1786086655",
    alt: "Car photographed outdoors",
    layout: "value",
  },
];

function Discovery() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements = section.querySelectorAll("[data-reveal]");

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => {
        element.dataset.visible = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="discovery section"
      id="discovery"
      ref={sectionRef}
      aria-labelledby="discovery-title"
    >
      <div className="container">
        <header className="discovery__header" data-reveal>
          <div className="discovery__heading">
            <p className="eyebrow">
              A WORLD OF DIFFERENT JOURNEYS
            </p>

            <h2
              className="discovery__title"
              id="discovery-title"
            >
              Find your kind of drive.
            </h2>

            <p className="discovery__description">
              The right SUV isn't just about the destination.
              It's about how you want to get there.
            </p>
          </div>

          <span className="discovery__index" aria-hidden="true">
            DISCOVER / 01—04
          </span>
        </header>

        <div className="discovery__grid">
          {categories.map((category, index) => (
            <article
              key={category.id}
              className={`discovery-card discovery-card--${category.layout}`}
              data-reveal
              style={{ "--reveal-order": index }}
            >
              <a
                className="discovery-card__link"
                href={`#explore`}
                aria-label={`Explore SUVs for ${category.id}: ${category.title}`}
              >
                <div className="discovery-card__image-wrap">
                  <img
                    className="discovery-card__image"
                    src={category.image}
                    alt={category.alt}
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="900"
                  />

                  <span className="discovery-card__number">
                    {category.number}
                  </span>

                  <span
                    className="discovery-card__arrow"
                    aria-hidden="true"
                  >
                    <FiArrowUpRight />
                  </span>
                </div>

                <div className="discovery-card__content">
                  <p className="discovery-card__eyebrow">
                    {category.eyebrow}
                  </p>

                  <h3 className="discovery-card__title">
                    {category.title}
                  </h3>

                  <p className="discovery-card__description">
                    {category.description}
                  </p>
                </div>
              </a>
            </article>
          ))}
        </div>

        <div className="discovery__footer" data-reveal>
          <p>
            Not sure where to begin? Start with every available SUV.
          </p>

          <a className="discovery__all-link" href="#explore">
            Browse the collection
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Discovery;

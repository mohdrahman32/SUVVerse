
import { useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiHeart,
  FiSliders,
  FiX,
} from "react-icons/fi";
import "./FeaturedSUVs.css";

// PHASE 2E — FEATURED SUV SAMPLE DATA
// Prices and descriptive details are illustrative, not verified live offers.
const vehicles = [
  {
    id: "nexon",
    brand: "Tata",
    model: "Nexon",
    edition: "THE EVERYDAY ALL-ROUNDER",
    price: "₹8–15 lakh",
    priceNote: "Illustrative price range",
    category: "city",
    categoryLabel: "City & everyday",
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Nexon/9675/1756364066883/exterior-image-166.jpg",
    imageAlt: "SUV photographed outdoors on a road",
    description:
      "A compact-SUV profile for everyday commutes, weekend plans and changing city streets.",
    highlights: ["Compact footprint", "Everyday versatility", "Urban-ready"],
    badge: "CITY FAVOURITE",
  },
  {
    id: "xuv3xo",
    brand: "Mahindra",
    model: "XUV 3XO",
    edition: "THE CONFIDENT COMMUTER",
    price: "₹8–15 lakh",
    priceNote: "Illustrative price range",
    category: "city",
    categoryLabel: "City & everyday",
    image:
      "https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/2024_mahindra_xuv3xo_exterior_01_1.jpg",
    imageAlt: "Modern SUV shown in an outdoor setting",
    description:
      "A bold, compact-SUV-inspired pick for drivers who want a more expressive everyday ride.",
    highlights: ["Bold styling", "Daily practicality", "Weekend-ready"],
    badge: "BOLD BY NATURE",
  },
  {
    id: "creta",
    brand: "Hyundai",
    model: "Creta",
    edition: "THE FAMILY FAVOURITE",
    price: "₹11–21 lakh",
    priceNote: "Illustrative price range",
    category: "family",
    categoryLabel: "Family & comfort",
    image:
      "https://downtown.hyundaimotor.in/documents/d/global/creta-highlights-first",
    imageAlt: "Car photographed in a clean, modern setting",
    description:
      "A versatile mid-size SUV concept for family outings, longer drives and daily comfort.",
    highlights: ["Family-friendly format", "Long-drive potential", "Versatile use"],
    badge: "ALL-ROUND COMFORT",
  },
  {
    id: "fortuner",
    brand: "Toyota",
    model: "Fortuner",
    edition: "THE GRAND TOURER",
    price: "₹35–55 lakh",
    priceNote: "Illustrative price range",
    category: "premium",
    categoryLabel: "Premium & adventure",
    image:
      "https://cdn-s3.autocarindia.com/legacy/cdni/ExtraImages/20180529044802_Toyota-Fortuner-off-road-4.jpg?w=728&q=75&fm=auto",
    imageAlt: "Large vehicle photographed in a dramatic outdoor environment",
    description:
      "A substantial SUV presence for drivers drawn to commanding proportions and road-trip energy.",
    highlights: ["Commanding stance", "Road-trip character", "Premium presence"],
    badge: "BUILT TO STAND OUT",
  },
];

const filters = [
  { label: "All SUVs", value: "all" },
  { label: "City & everyday", value: "city" },
  { label: "Family & comfort", value: "family" },
  { label: "Premium & adventure", value: "premium" },
];

function VehicleCard({
  vehicle,
  isSaved,
  onToggleSave,
  onViewDetails,
  index,
}) {
  const [imageStatus, setImageStatus] = useState("loading");

  return (
    <article
      className="featured-card"
      style={{ "--card-index": index }}
    >
      <div className="featured-card__media">
        {imageStatus === "loading" && (
          <div
            className="featured-card__image-skeleton"
            aria-hidden="true"
          >
            <span className="featured-card__loading-mark" />
            <span>Preparing the view</span>
          </div>
        )}

        {imageStatus === "error" ? (
          <div className="featured-card__image-fallback" role="img" aria-label={vehicle.imageAlt}>
            <span className="featured-card__fallback-label">
              {vehicle.brand}
            </span>
            <strong>{vehicle.model}</strong>
            <span>Vehicle image unavailable</span>
          </div>
        ) : (
          <img
            className={`featured-card__image ${
              imageStatus === "loaded" ? "is-loaded" : ""
            }`}
            src={vehicle.image}
            alt={vehicle.imageAlt}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setImageStatus("loaded")}
            onError={() => setImageStatus("error")}
          />
        )}

        <span className="featured-card__badge">{vehicle.badge}</span>

        <button
          className={`featured-card__save ${
            isSaved ? "is-saved" : ""
          }`}
          type="button"
          onClick={() => onToggleSave(vehicle.id)}
          aria-label={
            isSaved
              ? `Remove ${vehicle.brand} ${vehicle.model} from saved SUVs`
              : `Save ${vehicle.brand} ${vehicle.model}`
          }
          aria-pressed={isSaved}
        >
          <FiHeart aria-hidden="true" />
        </button>

        <span className="featured-card__image-index">
          0{index + 1}
        </span>
      </div>

      <div className="featured-card__body">
        <div className="featured-card__eyebrow">
          <span>{vehicle.brand}</span>
          <span className="featured-card__eyebrow-dot" aria-hidden="true" />
          <span>{vehicle.categoryLabel}</span>
        </div>

        <div className="featured-card__title-row">
          <div>
            <h3 className="featured-card__title">{vehicle.model}</h3>
            <p className="featured-card__edition">{vehicle.edition}</p>
          </div>

          <button
            className="featured-card__details-icon"
            type="button"
            onClick={() => onViewDetails(vehicle)}
            aria-label={`View details for ${vehicle.brand} ${vehicle.model}`}
          >
            <FiArrowUpRight aria-hidden="true" />
          </button>
        </div>

        <div className="featured-card__divider" />

        <div className="featured-card__footer">
          <div className="featured-card__price">
            <span>Indicative price</span>
            <strong>{vehicle.price}</strong>
            <small>{vehicle.priceNote} · Not a live quote</small>
          </div>

          <button
            className="featured-card__view-link"
            type="button"
            onClick={() => onViewDetails(vehicle)}
          >
            Explore SUV <FiArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

function VehicleDetailsModal({ vehicle, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!vehicle) return undefined;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  return (
    <div
      className="vehicle-modal__backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="vehicle-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vehicle-modal-title"
        aria-describedby="vehicle-modal-description"
      >
        <button
          className="vehicle-modal__close"
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close vehicle details"
        >
          <FiX aria-hidden="true" />
        </button>

        <p className="vehicle-modal__eyebrow">
          SUVVERSE / VEHICLE PREVIEW
        </p>

        <h2 id="vehicle-modal-title">
          {vehicle.brand} {vehicle.model}
        </h2>

        <p
          className="vehicle-modal__description"
          id="vehicle-modal-description"
        >
          {vehicle.description}
        </p>

        <div className="vehicle-modal__price">
          <span>Illustrative price range</span>
          <strong>{vehicle.price}</strong>
          <small>
            Example data only. Confirm current prices, variant availability,
            taxes and on-road costs with the manufacturer or an authorised dealer.
          </small>
        </div>

        <h3>What stands out</h3>
        <ul className="vehicle-modal__highlights">
          {vehicle.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <p className="vehicle-modal__note">
          This preview uses editorial sample content. Detailed variant
          specifications and verified pricing will be connected in a later phase.
        </p>

        <button
          className="vehicle-modal__done"
          type="button"
          onClick={onClose}
        >
          Back to the collection <FiArrowUpRight aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}

export default function FeaturedSUVs() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [savedVehicles, setSavedVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [announcement, setAnnouncement] = useState("");

  const filteredVehicles =
    activeFilter === "all"
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.category === activeFilter);

  const handleToggleSave = (vehicleId) => {
    const vehicle = vehicles.find((item) => item.id === vehicleId);
    const alreadySaved = savedVehicles.includes(vehicleId);

    setSavedVehicles((current) =>
      alreadySaved
        ? current.filter((id) => id !== vehicleId)
        : [...current, vehicleId]
    );

    setAnnouncement(
      alreadySaved
        ? `${vehicle.brand} ${vehicle.model} removed from saved SUVs.`
        : `${vehicle.brand} ${vehicle.model} added to saved SUVs.`
    );
  };

  const handleCloseModal = () => setSelectedVehicle(null);

  return (
    <section
      className="featured-suvs section"
      id="featured"
      aria-labelledby="featured-suvs-title"
    >
      <div className="container">
        <div className="featured-suvs__intro">
          <div className="featured-suvs__heading">
            <p className="eyebrow">
              <span className="featured-suvs__eyebrow-line" />
              A considered collection
            </p>

            <h2 className="section-title" id="featured-suvs-title">
              The ones worth
              <br />
              <span>taking a closer look.</span>
            </h2>

            <p className="body-copy featured-suvs__description">
              From weekday city runs to open-road escapes, find the SUV that
              fits the way you want to move.
            </p>
          </div>

          <div className="featured-suvs__aside">
            <span className="featured-suvs__aside-number">04</span>
            <span className="featured-suvs__aside-label">
              Editorial picks
              <br />
              to start your search
            </span>
          </div>
        </div>

        <div className="featured-suvs__toolbar">
          <div
            className="featured-suvs__filters"
            role="group"
            aria-label="Filter featured SUVs by category"
          >
            {filters.map((filter) => (
              <button
                className={`featured-suvs__filter ${
                  activeFilter === filter.value ? "is-active" : ""
                }`}
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={activeFilter === filter.value}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="featured-suvs__results" aria-live="polite">
            <FiSliders aria-hidden="true" />
            <span>
              {filteredVehicles.length}{" "}
              {filteredVehicles.length === 1 ? "SUV" : "SUVs"}
            </span>
          </div>
        </div>

        <div className="featured-suvs__grid">
          {filteredVehicles.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              index={index}
              isSaved={savedVehicles.includes(vehicle.id)}
              onToggleSave={handleToggleSave}
              onViewDetails={setSelectedVehicle}
            />
          ))}
        </div>

        <div className="featured-suvs__bottom">
          <p>
            A starting point, not the whole story.
            <span> Compare the details before you decide.</span>
          </p>

          <a className="featured-suvs__compare-link" href="#compare">
            Continue to compare <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <p className="featured-suvs__disclaimer">
          Sample editorial collection. Price ranges are illustrative and are
          not verified current ex-showroom or on-road prices.
        </p>

        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>
      </div>

      <VehicleDetailsModal
        vehicle={selectedVehicle}
        onClose={handleCloseModal}
      />
    </section>
  );
}

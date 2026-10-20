
import { useMemo, useState } from "react";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiSearch,
  FiSliders,
  FiX,
} from "react-icons/fi";
import "./SUVExplorer.css";

// PHASE 2F — ILLUSTRATIVE SUV CATALOGUE
// Price figures are sample data, not verified live market prices.
const explorerVehicles = [
  {
    id: "nexon",
    brand: "Tata",
    model: "Nexon",
    price: 9,
    fuel: ["Petrol", "Diesel", "Electric"],
    transmission: ["Manual", "Automatic"],
    seats: 5,
    category: "Compact SUV",
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Nexon/9675/1756363999554/front-right-view-120.jpg",
    description: "A versatile compact SUV for everyday journeys.",
  },
  {
    id: "punch",
    brand: "Tata",
    model: "Punch",
    price: 6,
    fuel: ["Petrol", "CNG"],
    transmission: ["Manual", "Automatic"],
    seats: 5,
    category: "Micro SUV",
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Punch/13254/1768985724266/exterior-image-164.jpg",
    description: "A small footprint with an SUV-inspired character.",
  },
  {
    id: "creta",
    brand: "Hyundai",
    model: "Creta",
    price: 11,
    fuel: ["Petrol", "Diesel"],
    transmission: ["Manual", "Automatic"],
    seats: 5,
    category: "Mid-size SUV",
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/8667/1751535724464/exterior-image-166.jpg",
    description: "A well-rounded format for city and highway use.",
  },
  {
    id: "venue",
    brand: "Hyundai",
    model: "Venue",
    price: 8,
    fuel: ["Petrol", "Diesel"],
    transmission: ["Manual", "Automatic"],
    seats: 5,
    category: "Compact SUV",
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Venue-N-Line/13026/1763027823549/exterior-image-164.jpg",
    description: "A compact option for urban routines and weekend drives.",
  },
  {
    id: "xuv3xo",
    brand: "Mahindra",
    model: "XUV 3XO",
    price: 8,
    fuel: ["Petrol", "Diesel"],
    transmission: ["Manual", "Automatic"],
    seats: 5,
    category: "Compact SUV",
    image:
      "https://images.financialexpressdigital.com/2024/05/Mahindra-XUV-3XO.jpg",
    description: "A compact SUV concept with a bold road presence.",
  },
  {
    id: "scorpio-n",
    brand: "Mahindra",
    model: "Scorpio-N",
    price: 14,
    fuel: ["Petrol", "Diesel"],
    transmission: ["Manual", "Automatic"],
    seats: 7,
    category: "Full-size SUV",
    image:
      "https://www.evoindia.com/evoindia/2022-06/84a5bf61-1131-4454-b713-5a3141634666/165642527316569.jpg",
    description: "A larger SUV format suited to varied driving plans.",
  },
  {
    id: "grand-vitara",
    brand: "Maruti Suzuki",
    model: "Grand Vitara",
    price: 11,
    fuel: ["Petrol", "Hybrid", "CNG"],
    transmission: ["Manual", "Automatic"],
    seats: 5,
    category: "Mid-size SUV",
    image:
      "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/123185/grand-vitara-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80&q=80",
    description: "A practical mid-size SUV for everyday versatility.",
  },
  {
    id: "fortuner",
    brand: "Toyota",
    model: "Fortuner",
    price: 35,
    fuel: ["Petrol", "Diesel"],
    transmission: ["Manual", "Automatic"],
    seats: 7,
    category: "Premium SUV",
    image:
      "https://assets.cdntoyota.co.za/toyotacms23/attachments/cm6jeri4c3ptpbhakts1dbnlb-1920x1080-2-1.desktop.jpg",
    description: "A commanding SUV format for longer journeys.",
  },
];

const initialFilters = {
  search: "",
  brand: "all",
  fuel: "all",
  transmission: "all",
  seats: "all",
  budget: "all",
  sort: "recommended",
};

const budgetOptions = [
  { value: "all", label: "Any budget" },
  { value: "under-10", label: "Under ₹10 lakh" },
  { value: "10-15", label: "₹10–15 lakh" },
  { value: "15-25", label: "₹15–25 lakh" },
  { value: "over-25", label: "Above ₹25 lakh" },
];

function matchesBudget(price, budget) {
  switch (budget) {
    case "under-10":
      return price < 10;
    case "10-15":
      return price >= 10 && price <= 15;
    case "15-25":
      return price > 15 && price <= 25;
    case "over-25":
      return price > 25;
    default:
      return true;
  }
}

function ExplorerVehicleCard({ vehicle }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="explorer-card">
      <div className="explorer-card__media">
        {!imageLoaded && !imageFailed && (
          <div className="explorer-card__skeleton" aria-hidden="true">
            <span />
            <span>Loading image</span>
          </div>
        )}

        {imageFailed ? (
          <div
            className="explorer-card__fallback"
            role="img"
            aria-label={`Image unavailable for ${vehicle.brand} ${vehicle.model}`}
          >
            <span>{vehicle.brand}</span>
            <strong>{vehicle.model}</strong>
            <small>Vehicle image unavailable</small>
          </div>
        ) : (
          <img
            src={vehicle.image}
            alt={`Illustrative SUV image for ${vehicle.brand} ${vehicle.model}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
            className={imageLoaded ? "is-loaded" : ""}
          />
        )}

        <span className="explorer-card__category">{vehicle.category}</span>
      </div>

      <div className="explorer-card__content">
        <p className="explorer-card__brand">{vehicle.brand}</p>
        <h3>{vehicle.model}</h3>
        <p className="explorer-card__description">{vehicle.description}</p>

        <div className="explorer-card__specs" aria-label="Sample vehicle attributes">
          <span>{vehicle.seats} seats</span>
          <span>{vehicle.fuel.join(" / ")}</span>
          <span>{vehicle.transmission.join(" / ")}</span>
        </div>

        <div className="explorer-card__footer">
          <div>
            <span className="explorer-card__price-label">
              Sample starting price
            </span>
            <strong>₹{vehicle.price} lakh*</strong>
          </div>
          <a
            href="#featured"
            className="explorer-card__link"
            aria-label={`Explore ${vehicle.brand} ${vehicle.model} in featured SUVs`}
          >
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function SUVExplorer() {
  const [filters, setFilters] = useState(initialFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const brands = [...new Set(explorerVehicles.map((vehicle) => vehicle.brand))];
  const activeFilterCount = [
    filters.brand,
    filters.fuel,
    filters.transmission,
    filters.seats,
    filters.budget,
  ].filter((value) => value !== "all").length;

  const results = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();

    const filtered = explorerVehicles.filter((vehicle) => {
      const searchableText =
        `${vehicle.brand} ${vehicle.model} ${vehicle.category} ${vehicle.description}`.toLowerCase();

      return (
        (!searchTerm || searchableText.includes(searchTerm)) &&
        (filters.brand === "all" || vehicle.brand === filters.brand) &&
        (filters.fuel === "all" || vehicle.fuel.includes(filters.fuel)) &&
        (filters.transmission === "all" ||
          vehicle.transmission.includes(filters.transmission)) &&
        (filters.seats === "all" ||
          vehicle.seats === Number(filters.seats)) &&
        matchesBudget(vehicle.price, filters.budget)
      );
    });

    switch (filters.sort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.model.localeCompare(b.model));
        break;
      default:
        break;
    }

    return filtered;
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <section
      className="suv-explorer section"
      id="explore"
      aria-labelledby="suv-explorer-title"
    >
      <div className="container">
        <header className="suv-explorer__header">
          <p className="eyebrow">Your next chapter starts here</p>
          <h2 className="section-title" id="suv-explorer-title">
            Find the SUV
            <br />
            <span>that fits your world.</span>
          </h2>
          <p className="body-copy">
            Start with what matters to you. Explore the options, narrow the
            field, and build your shortlist.
          </p>
        </header>

        <div className="explorer-search">
          <FiSearch aria-hidden="true" />
          <label className="sr-only" htmlFor="explorer-search-input">
            Search SUVs by brand, model or category
          </label>
          <input
            id="explorer-search-input"
            type="search"
            value={filters.search}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="Try “Tata”, “family” or “compact SUV”"
          />
          {filters.search && (
            <button
              type="button"
              className="explorer-search__clear"
              onClick={() => updateFilter("search", "")}
              aria-label="Clear search"
            >
              <FiX aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="explorer-controls">
          <button
            type="button"
            className={`explorer-controls__toggle ${
              filtersOpen ? "is-open" : ""
            }`}
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="explorer-filter-panel"
          >
            <FiSliders aria-hidden="true" />
            Filters
            {activeFilterCount > 0 && (
              <span className="explorer-controls__count">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="explorer-controls__summary" aria-live="polite">
            <strong>{results.length.toString().padStart(2, "0")}</strong>
            <span>{results.length === 1 ? "SUV found" : "SUVs found"}</span>
          </div>

          <label className="explorer-sort">
            <span>Sort by</span>
            <select
              value={filters.sort}
              onChange={(event) => updateFilter("sort", event.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Model name</option>
            </select>
          </label>
        </div>

        <div
          className={`explorer-filter-panel ${
            filtersOpen ? "is-open" : ""
          }`}
          id="explorer-filter-panel"
          hidden={!filtersOpen}
        >
          <div className="explorer-filter-panel__heading">
            <div>
              <span className="eyebrow">Refine your search</span>
              <h3>Make it your own.</h3>
            </div>
            <button type="button" onClick={resetFilters}>
              Reset all
            </button>
          </div>

          <div className="explorer-filter-grid">
            <label>
              <span>Brand</span>
              <select
                value={filters.brand}
                onChange={(event) => updateFilter("brand", event.target.value)}
              >
                <option value="all">All brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Budget</span>
              <select
                value={filters.budget}
                onChange={(event) => updateFilter("budget", event.target.value)}
              >
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Fuel type</span>
              <select
                value={filters.fuel}
                onChange={(event) => updateFilter("fuel", event.target.value)}
              >
                <option value="all">All fuel types</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </label>

            <label>
              <span>Transmission</span>
              <select
                value={filters.transmission}
                onChange={(event) =>
                  updateFilter("transmission", event.target.value)
                }
              >
                <option value="all">Any transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </label>

            <label>
              <span>Seating capacity</span>
              <select
                value={filters.seats}
                onChange={(event) => updateFilter("seats", event.target.value)}
              >
                <option value="all">Any seating</option>
                <option value="5">5 seats</option>
                <option value="7">7 seats</option>
              </select>
            </label>
          </div>
        </div>

        <div className="explorer-results">
          {results.length > 0 ? (
            results.map((vehicle) => (
              <ExplorerVehicleCard key={vehicle.id} vehicle={vehicle} />
            ))
          ) : (
            <div className="explorer-empty">
              <span className="explorer-empty__symbol">
                <FiSearch aria-hidden="true" />
              </span>
              <p className="eyebrow">No exact matches</p>
              <h3>Let's widen the search.</h3>
              <p>
                Try another keyword or clear a filter to discover more SUVs.
              </p>
              <button type="button" onClick={resetFilters}>
                Clear all filters <FiArrowDown aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <p className="suv-explorer__disclaimer">
          *All prices, fuel options, transmission options and vehicle details
          in this demo are illustrative sample data. Images are editorial
          placeholders and may not depict the exact model. Verify current
          specifications and prices with official sources before making a decision.
        </p>
      </div>
    </section>
  );
}

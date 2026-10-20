import { useMemo, useState } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiPlus,
  FiRefreshCw,
  FiX,
} from "react-icons/fi";
import { MdCompareArrows } from "react-icons/md";
import "./SUVCompare.css";

// =========================================================
// PHASE 2G — SUV COMPARE
// Illustrative data only. Not verified specifications or prices.
// =========================================================

const comparisonVehicles = [
  {
    id: "nexon",
    brand: "Tata",
    model: "Nexon",
    price: "₹9–15 lakh",
    category: "Compact SUV",
    fuel: "Petrol / Diesel / EV",
    transmission: "Manual / Automatic",
    seats: "5 seats",
    drivetrain: "Variant-dependent",
    useCase: "City & everyday",
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Nexon/11115/1779101151711/front-left-side-47.jpg",
    imageAlt: "Illustrative SUV photography for Tata Nexon",
  },
  {
    id: "creta",
    brand: "Hyundai",
    model: "Creta",
    price: "₹11–21 lakh",
    category: "Mid-size SUV",
    fuel: "Petrol / Diesel",
    transmission: "Manual / Automatic",
    seats: "5 seats",
    drivetrain: "Variant-dependent",
    useCase: "Family & everyday",
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/8667/1755765115423/front-left-side-47.jpg",
    imageAlt: "Illustrative SUV photography for Hyundai Creta",
  },
  {
    id: "xuv3xo",
    brand: "Mahindra",
    model: "XUV 3XO",
    price: "₹8–15 lakh",
    category: "Compact SUV",
    fuel: "Petrol / Diesel",
    transmission: "Manual / Automatic",
    seats: "5 seats",
    drivetrain: "Variant-dependent",
    useCase: "City & everyday",
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV-3XO/10184/1758199247932/front-left-side-47.jpg",
    imageAlt: "Illustrative SUV photography for Mahindra XUV 3XO",
  },
  {
    id: "scorpio-n",
    brand: "Mahindra",
    model: "Scorpio-N",
    price: "₹14–25 lakh",
    category: "Full-size SUV",
    fuel: "Petrol / Diesel",
    transmission: "Manual / Automatic",
    seats: "5 / 6 / 7 seats, variant-dependent",
    drivetrain: "Variant-dependent",
    useCase: "Family & adventure",
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Scorpio-N/13740/1785926288341/front-left-side-47.jpg",
    imageAlt: "Illustrative SUV photography for Mahindra Scorpio-N",
  },
  {
    id: "grand-vitara",
    brand: "Maruti Suzuki",
    model: "Grand Vitara",
    price: "₹11–20 lakh",
    category: "Mid-size SUV",
    fuel: "Petrol / Hybrid / CNG",
    transmission: "Manual / Automatic",
    seats: "5 seats",
    drivetrain: "Variant-dependent",
    useCase: "Family & everyday",
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Grand-Vitara/10508/1779258364618/front-left-side-47.jpg",
    imageAlt: "Illustrative SUV photography for Maruti Suzuki Grand Vitara",
  },
  {
    id: "fortuner",
    brand: "Toyota",
    model: "Fortuner",
    price: "₹35–55 lakh",
    category: "Premium SUV",
    fuel: "Petrol / Diesel",
    transmission: "Manual / Automatic",
    seats: "7 seats",
    drivetrain: "Variant-dependent",
    useCase: "Premium & adventure",
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Toyota/Fortuner/10904/1755846017683/front-left-side-47.jpg",
    imageAlt: "Illustrative SUV photography for Toyota Fortuner",
  },
];

const comparisonRows = [
  { key: "price", label: "Illustrative price range", group: "Budget" },
  { key: "category", label: "SUV category", group: "Overview" },
  { key: "seats", label: "Seating capacity", group: "Practicality" },
  { key: "fuel", label: "Fuel options", group: "Powertrain" },
  { key: "transmission", label: "Transmission options", group: "Powertrain" },
  { key: "drivetrain", label: "Drivetrain", group: "Powertrain" },
  { key: "useCase", label: "Suggested use", group: "Lifestyle" },
];

const DEFAULT_SELECTION = ["nexon", "creta", null];
const MAX_SELECTIONS = 3;

function getVehicleName(vehicle) {
  return `${vehicle.brand} ${vehicle.model}`;
}

// =========================================================
// REUSABLE VEHICLE SLOT
// =========================================================

function CompareVehicleSlot({
  vehicle,
  slotIndex,
  availableVehicles,
  onSelect,
  onRemove,
}) {
  const slotNumber = String(slotIndex + 1).padStart(2, "0");
  const selectId = `compare-select-${slotIndex}`;
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      className={`compare-slot ${
        vehicle ? "" : "compare-slot--empty"
      }`}
    >
      {vehicle ? (
        <>
          <div className="compare-slot__image-wrap">
            {imageFailed ? (
              <div
                className="compare-slot__image-fallback"
                role="img"
                aria-label={`Image unavailable for ${getVehicleName(vehicle)}`}
              >
                <span>{vehicle.brand}</span>
                <strong>{vehicle.model}</strong>
                <small>Image unavailable</small>
              </div>
            ) : (
              <img
                src={vehicle.image}
                alt={vehicle.imageAlt}
                loading="lazy"
                decoding="async"
                onError={() => setImageFailed(true)}
              />
            )}

            <span className="compare-slot__number">
              SUV / {slotNumber}
            </span>

            <button
              type="button"
              className="compare-slot__remove"
              onClick={onRemove}
              aria-label={`Remove ${getVehicleName(vehicle)} from comparison`}
            >
              <FiX aria-hidden="true" />
            </button>
          </div>

          <div className="compare-slot__identity">
            <p>{vehicle.brand}</p>
            <h3>{vehicle.model}</h3>
            <span>{vehicle.category}</span>
          </div>
        </>
      ) : (
        <div className="compare-slot__empty-content">
          <div className="compare-slot__icon">
            <FiPlus aria-hidden="true" />
          </div>
          <span className="compare-slot__eyebrow">
            VEHICLE / {slotNumber}
          </span>
          <h3>Add an SUV</h3>
          <p>
            Choose a vehicle to compare its details with your shortlist.
          </p>
        </div>
      )}

      <label className="compare-slot__change" htmlFor={selectId}>
        {vehicle ? "Change vehicle" : "Choose a vehicle"}

        <select
          id={selectId}
          value={vehicle?.id ?? ""}
          onChange={(event) => onSelect(event.target.value)}
        >
          <option value="" disabled>
            {vehicle ? "Select replacement" : "Select an SUV"}
          </option>

          {availableVehicles.map((option) => (
            <option key={option.id} value={option.id}>
              {option.brand} {option.model}
            </option>
          ))}
        </select>
      </label>
    </article>
  );
}

// =========================================================
// COMPARISON SPECIFICATIONS
// =========================================================

function ComparisonTable({ vehicles }) {
  if (vehicles.length < 2) {
    return (
      <div className="suv-compare__empty">
        <MdCompareArrows aria-hidden="true" />
        <h3>Choose one more SUV.</h3>
        <p>
          Select at least two vehicles to see their details side by side.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`suv-compare__specs suv-compare__specs--${vehicles.length}`}
      role="table"
      aria-label="Side-by-side SUV comparison"
    >
      {comparisonRows.map((row) => (
        <div
          className="suv-compare__spec-row"
          role="row"
          key={row.key}
        >
          <div
            className="suv-compare__spec-label"
            role="rowheader"
          >
            <span>{row.group}</span>
            <strong>{row.label}</strong>
          </div>

          {vehicles.map((vehicle) => (
            <div
              className="suv-compare__spec-value"
              role="cell"
              key={`${vehicle.id}-${row.key}`}
              data-vehicle={getVehicleName(vehicle)}
            >
              {vehicle[row.key] || "Not available"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// =========================================================
// MAIN SUV COMPARE SECTION
// =========================================================

export default function SUVCompare() {
  // Three stable slots: removing a vehicle won't shift other vehicles.
  const [selectedIds, setSelectedIds] = useState(DEFAULT_SELECTION);
  const [announcement, setAnnouncement] = useState("");

  const selectedVehicles = useMemo(
    () =>
      selectedIds.map(
        (id) => comparisonVehicles.find((vehicle) => vehicle.id === id) ?? null
      ),
    [selectedIds]
  );

  const selectedCount = selectedIds.filter(Boolean).length;

  const getAvailableVehicles = (slotIndex) =>
    comparisonVehicles.filter(
      (vehicle) =>
        vehicle.id === selectedIds[slotIndex] ||
        !selectedIds.includes(vehicle.id)
    );

  const handleSelect = (slotIndex, vehicleId) => {
    if (!vehicleId) return;

    const alreadyUsedInAnotherSlot = selectedIds.some(
      (id, index) => index !== slotIndex && id === vehicleId
    );

    if (alreadyUsedInAnotherSlot) {
      setAnnouncement("That SUV is already selected in another slot.");
      return;
    }

    const vehicle = comparisonVehicles.find(
      (item) => item.id === vehicleId
    );

    if (!vehicle) return;

    setSelectedIds((current) =>
      current.map((id, index) =>
        index === slotIndex ? vehicleId : id
      )
    );

    setAnnouncement(`${getVehicleName(vehicle)} selected for comparison.`);
  };

  const handleAdd = () => {
    const emptySlotIndex = selectedIds.findIndex((id) => id === null);

    if (emptySlotIndex === -1) return;

    const nextVehicle = comparisonVehicles.find(
      (vehicle) => !selectedIds.includes(vehicle.id)
    );

    if (!nextVehicle) return;

    setSelectedIds((current) =>
      current.map((id, index) =>
        index === emptySlotIndex ? nextVehicle.id : id
      )
    );

    setAnnouncement(`${getVehicleName(nextVehicle)} added to comparison.`);
  };

  const handleRemove = (slotIndex) => {
    const vehicleId = selectedIds[slotIndex];
    if (!vehicleId) return;

    const vehicle = comparisonVehicles.find(
      (item) => item.id === vehicleId
    );

    setSelectedIds((current) =>
      current.map((id, index) =>
        index === slotIndex ? null : id
      )
    );

    setAnnouncement(`${getVehicleName(vehicle)} removed from comparison.`);
  };

  const handleReset = () => {
    setSelectedIds([...DEFAULT_SELECTION]);
    setAnnouncement("Comparison reset to the default SUVs.");
  };

  return (
    <section
      className="suv-compare section"
      id="compare"
      aria-labelledby="suv-compare-title"
    >
      <div className="container">
        <header className="suv-compare__header">
          <p className="eyebrow">
            <span className="suv-compare__eyebrow-line" />
            Less guesswork. More clarity.
          </p>

          <h2 className="section-title" id="suv-compare-title">
            Two good options.
            <br />
            <span>One clearer decision.</span>
          </h2>

          <p className="body-copy">
            Put your shortlist side by side. See what lines up, what differs,
            and what deserves a closer look.
          </p>
        </header>

        <div className="suv-compare__toolbar">
          <div className="suv-compare__count" aria-live="polite">
            <MdCompareArrows aria-hidden="true" />
            <span>
              <strong>{selectedCount}</strong> of {MAX_SELECTIONS} SUVs selected
            </span>
          </div>

          <div className="suv-compare__actions">
            <button
              type="button"
              className="suv-compare__reset"
              onClick={handleReset}
            >
              <FiRefreshCw aria-hidden="true" />
              Reset comparison
            </button>

            <button
              type="button"
              className="suv-compare__add"
              onClick={handleAdd}
              disabled={
                selectedCount >= MAX_SELECTIONS ||
                !selectedIds.includes(null) ||
                comparisonVehicles.every((vehicle) =>
                  selectedIds.includes(vehicle.id)
                )
              }
            >
              <FiPlus aria-hidden="true" />
              Add SUV
            </button>
          </div>
        </div>

        <div
          className={`suv-compare__vehicle-grid suv-compare__vehicle-grid--${selectedCount}`}
        >
          {selectedIds.map((id, slotIndex) => {
            const vehicle =
              comparisonVehicles.find((item) => item.id === id) ?? null;

            return (
              <CompareVehicleSlot
                key={`compare-slot-${slotIndex}`}
                vehicle={vehicle}
                slotIndex={slotIndex}
                availableVehicles={getAvailableVehicles(slotIndex)}
                onSelect={(vehicleId) =>
                  handleSelect(slotIndex, vehicleId)
                }
                onRemove={() => handleRemove(slotIndex)}
              />
            );
          })}
        </div>

        <div className="suv-compare__table-heading">
          <div>
            <p className="eyebrow">The details</p>
            <h3>Side by side.</h3>
          </div>
          <span>Illustrative sample data</span>
        </div>

        <ComparisonTable vehicles={selectedVehicles.filter(Boolean)} />

        <div className="suv-compare__note">
          <FiCheck aria-hidden="true" />
          <p>
            <strong>Compare thoughtfully.</strong> The price ranges and vehicle
            attributes in this demo are illustrative. Actual features, fuel
            options, transmissions, seating and prices depend on the specific
            variant and model year. Confirm them with official sources.
          </p>
        </div>

        <a className="suv-compare__back-link" href="#explore">
          Explore more SUVs <FiArrowUpRight aria-hidden="true" />
        </a>

        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>
      </div>
    </section>
  );
}

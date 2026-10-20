
import { useMemo, useState } from "react";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiBookOpen,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiDroplet,
  FiShield,
  FiTool,
  FiTrendingUp,
} from "react-icons/fi";
import "./Ownership.css";

// =========================================================
// PHASE 2H — SUV OWNERSHIP
// Ownership education and an illustrative cost estimator.
// =========================================================

const ownershipGuides = [
  {
    id: "maintenance",
    number: "01",
    category: "CARE & MAINTENANCE",
    title: "Look after the machine.",
    description:
      "Understand routine servicing, tyre care, fluids and the small checks that help keep your SUV road-ready.",
    readTime: "5 min read",
    icon: FiTool,
    theme: "olive",
    tips: [
      "Follow the service schedule in the owner's manual.",
      "Check tyre pressure and tread condition regularly.",
      "Watch for dashboard warnings, unusual sounds or leaks.",
      "Keep service invoices and maintenance records together.",
    ],
  },
  {
    id: "running-costs",
    number: "02",
    category: "MONEY & OWNERSHIP",
    title: "Look beyond the price tag.",
    description:
      "Plan for fuel, insurance, servicing, tyres and other costs that come with owning an SUV.",
    readTime: "6 min read",
    icon: FiTrendingUp,
    theme: "stone",
    tips: [
      "Estimate fuel spending using your actual monthly distance.",
      "Compare insurance quotes and policy coverage.",
      "Set aside a maintenance reserve.",
      "Review total ownership costs, not only the EMI.",
    ],
  },
  {
    id: "insurance",
    number: "03",
    category: "PROTECTION",
    title: "Know what protects you.",
    description:
      "Get familiar with insurance cover, policy exclusions, renewals and the documents you should keep handy.",
    readTime: "4 min read",
    icon: FiShield,
    theme: "dark",
    tips: [
      "Review the policy's coverage and exclusions.",
      "Compare deductibles, add-ons and claim conditions.",
      "Keep policy and registration documents accessible.",
      "Check renewal dates before your policy expires.",
    ],
  },
  {
    id: "road-trips",
    number: "04",
    category: "LIFE ON THE ROAD",
    title: "Make every trip count.",
    description:
      "Prepare your SUV for everyday driving, weekend escapes and longer journeys with practical checks.",
    readTime: "4 min read",
    icon: FiDroplet,
    theme: "olive",
    tips: [
      "Check tyres, lights, fluids and brakes before a long trip.",
      "Carry essential documents and emergency contacts.",
      "Plan fuel stops and rest breaks on longer routes.",
      "Never ignore a warning light or a safety-related fault.",
    ],
  },
];

const initialCalculator = {
  distance: "1000",
  mileage: "15",
  fuelPrice: "100",
  insurance: "18000",
  maintenance: "12000",
  other: "6000",
};

function formatRupees(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function numericValue(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

// =========================================================
// REUSABLE GUIDE CARD
// =========================================================

function OwnershipGuideCard({ guide, onOpen }) {
  const GuideIcon = guide.icon;

  return (
    <article className={`ownership-card ownership-card--${guide.theme}`}>
      <div className="ownership-card__top">
        <span className="ownership-card__number">{guide.number}</span>
        <span className="ownership-card__icon">
          <GuideIcon aria-hidden="true" />
        </span>
      </div>

      <p className="ownership-card__category">{guide.category}</p>
      <h3>{guide.title}</h3>
      <p className="ownership-card__description">{guide.description}</p>

      <div className="ownership-card__bottom">
        <span>
          <FiClock aria-hidden="true" />
          {guide.readTime}
        </span>

        <button
          type="button"
          onClick={() => onOpen(guide)}
          aria-label={`Read ${guide.title} guide`}
        >
          Explore guide
          <FiArrowUpRight aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

// =========================================================
// GUIDE DETAILS DIALOG
// =========================================================

function OwnershipGuideDialog({ guide, onClose }) {
  if (!guide) return null;

  const GuideIcon = guide.icon;

  return (
    <div
      className="ownership-dialog__backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="ownership-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ownership-dialog-title"
      >
        <div className="ownership-dialog__header">
          <span className="ownership-dialog__icon">
            <GuideIcon aria-hidden="true" />
          </span>

          <button
            type="button"
            className="ownership-dialog__close"
            onClick={onClose}
            aria-label="Close guide"
            autoFocus
          >
            ×
          </button>
        </div>

        <p className="eyebrow">{guide.category}</p>
        <h2 id="ownership-dialog-title">{guide.title}</h2>
        <p className="ownership-dialog__intro">{guide.description}</p>

        <h3>Your practical checklist</h3>
        <ul className="ownership-dialog__list">
          {guide.tips.map((tip) => (
            <li key={tip}>
              <FiCheckCircle aria-hidden="true" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>

        <p className="ownership-dialog__note">
          These are general educational tips. Follow your vehicle's official
          owner's manual and seek a qualified professional for vehicle-specific
          maintenance or safety concerns.
        </p>

        <button
          type="button"
          className="ownership-dialog__done"
          onClick={onClose}
        >
          Back to ownership
          <FiChevronRight aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}

// =========================================================
// RUNNING-COST ESTIMATOR
// =========================================================

function RunningCostEstimator() {
  const [values, setValues] = useState(initialCalculator);

  const updateValue = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const calculations = useMemo(() => {
    const distance = numericValue(values.distance);
    const mileage = numericValue(values.mileage);
    const fuelPrice = numericValue(values.fuelPrice);
    const insurance = numericValue(values.insurance);
    const maintenance = numericValue(values.maintenance);
    const other = numericValue(values.other);

    const monthlyFuel =
      mileage > 0 ? (distance / mileage) * fuelPrice : 0;

    const annualFuel = monthlyFuel * 12;
    const annualTotal = annualFuel + insurance + maintenance + other;

    return {
      monthlyFuel,
      annualFuel,
      annualTotal,
      monthlyAverage: annualTotal / 12,
    };
  }, [values]);

  const resetValues = () => setValues({ ...initialCalculator });

  return (
    <section
      className="ownership-calculator"
      id="ownership-cost-calculator"
      aria-labelledby="ownership-calculator-title"
    >
      <div className="ownership-calculator__intro">
        <p className="eyebrow">
          <span className="ownership-section__line" />
          A clearer picture of ownership
        </p>

        <h3 id="ownership-calculator-title">
          What might your SUV
          <br />
          <span>cost to run?</span>
        </h3>

        <p>
          Adjust the numbers to estimate your fuel spending and annual
          running costs. Use your own figures for a more useful estimate.
        </p>

        <div className="ownership-calculator__disclaimer">
          <FiBookOpen aria-hidden="true" />
          <span>
            An estimate, not a quote. Loan EMIs, depreciation, parking and
            unexpected repairs are not included unless you account for them
            in the relevant fields.
          </span>
        </div>
      </div>

      <div className="ownership-calculator__panel">
        <div className="ownership-calculator__panel-heading">
          <div>
            <span className="ownership-calculator__panel-label">
              YOUR ASSUMPTIONS
            </span>
            <h4>Set your numbers</h4>
          </div>

          <button type="button" onClick={resetValues}>
            Reset
          </button>
        </div>

        <div className="ownership-calculator__fields">
          <label className="ownership-field">
            <span>Monthly distance</span>
            <span className="ownership-field__input">
              <input
                type="number"
                min="0"
                step="100"
                value={values.distance}
                onChange={(event) =>
                  updateValue("distance", event.target.value)
                }
                inputMode="decimal"
              />
              <span>km</span>
            </span>
          </label>

          <label className="ownership-field">
            <span>Fuel efficiency</span>
            <span className="ownership-field__input">
              <input
                type="number"
                min="0"
                step="0.5"
                value={values.mileage}
                onChange={(event) =>
                  updateValue("mileage", event.target.value)
                }
                inputMode="decimal"
              />
              <span>km/L</span>
            </span>
          </label>

          <label className="ownership-field">
            <span>Fuel price</span>
            <span className="ownership-field__input">
              <span>₹</span>
              <input
                type="number"
                min="0"
                step="1"
                value={values.fuelPrice}
                onChange={(event) =>
                  updateValue("fuelPrice", event.target.value)
                }
                inputMode="decimal"
              />
              <span>/L</span>
            </span>
          </label>

          <label className="ownership-field">
            <span>Annual insurance</span>
            <span className="ownership-field__input">
              <span>₹</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={values.insurance}
                onChange={(event) =>
                  updateValue("insurance", event.target.value)
                }
                inputMode="decimal"
              />
            </span>
          </label>

          <label className="ownership-field">
            <span>Annual maintenance</span>
            <span className="ownership-field__input">
              <span>₹</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={values.maintenance}
                onChange={(event) =>
                  updateValue("maintenance", event.target.value)
                }
                inputMode="decimal"
              />
            </span>
          </label>

          <label className="ownership-field">
            <span>Other annual costs</span>
            <span className="ownership-field__input">
              <span>₹</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={values.other}
                onChange={(event) =>
                  updateValue("other", event.target.value)
                }
                inputMode="decimal"
              />
            </span>
          </label>
        </div>

        <div className="ownership-calculator__results" aria-live="polite">
          <div className="ownership-calculator__result-main">
            <span>ESTIMATED ANNUAL RUNNING COST</span>
            <strong>{formatRupees(calculations.annualTotal)}</strong>
            <small>Based on the assumptions you entered</small>
          </div>

          <div className="ownership-calculator__result-row">
            <span>
              <FiDroplet aria-hidden="true" />
              Monthly fuel
            </span>
            <strong>{formatRupees(calculations.monthlyFuel)}</strong>
          </div>

          <div className="ownership-calculator__result-row">
            <span>
              <FiTrendingUp aria-hidden="true" />
              Annual fuel
            </span>
            <strong>{formatRupees(calculations.annualFuel)}</strong>
          </div>

          <div className="ownership-calculator__result-row">
            <span>
              <FiArrowDownRight aria-hidden="true" />
              Monthly average of listed costs
            </span>
            <strong>{formatRupees(calculations.monthlyAverage)}</strong>
          </div>
        </div>

        {numericValue(values.mileage) === 0 && (
          <p className="ownership-calculator__validation" role="status">
            Enter a fuel efficiency greater than zero to calculate fuel costs.
          </p>
        )}
      </div>
    </section>
  );
}

// =========================================================
// MAIN OWNERSHIP SECTION
// =========================================================

export default function Ownership() {
  const [activeGuide, setActiveGuide] = useState(null);

  return (
    <section
      className="ownership section"
      id="ownership"
      aria-labelledby="ownership-title"
    >
      <div className="container">
        <header className="ownership-section__header">
          <div className="ownership-section__heading">
            <p className="eyebrow">
              <span className="ownership-section__line" />
              Beyond the showroom
            </p>

            <h2 className="section-title" id="ownership-title">
              The real journey
              <br />
              <span>begins with ownership.</span>
            </h2>
          </div>

          <div className="ownership-section__description">
            <p className="body-copy">
              The right SUV is about more than the drive. Make informed
              decisions about maintenance, protection and the costs of
              everyday ownership.
            </p>

            <a href="#ownership-cost-calculator">
              Estimate your running costs
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </header>

        <div className="ownership-section__banner">
          <div className="ownership-section__banner-content">
            <span>THE OWNERSHIP PLAYBOOK / 2026</span>
            <h3>
              Own with confidence.
              <br />
              Drive with clarity.
            </h3>
            <p>
              Practical knowledge for the miles ahead, from the first service
              to the next big road trip.
            </p>
          </div>

          <div className="ownership-section__banner-mark" aria-hidden="true">
            <span>SV</span>
            <div />
            <small>YOUR SUV JOURNEY</small>
          </div>
        </div>

        <div className="ownership-section__cards-heading">
          <div>
            <p className="eyebrow">THE ESSENTIALS</p>
            <h3>Good ownership starts here.</h3>
          </div>
          <span>04 FIELD GUIDES</span>
        </div>

        <div className="ownership-section__grid">
          {ownershipGuides.map((guide) => (
            <OwnershipGuideCard
              key={guide.id}
              guide={guide}
              onOpen={setActiveGuide}
            />
          ))}
        </div>

        <RunningCostEstimator />

        <div className="ownership-section__closing">
          <div>
            <p className="eyebrow">MAKE THE NEXT MOVE COUNT</p>
            <h3>Knowledge first. Keys next.</h3>
          </div>

          <a href="#explore">
            Find your SUV
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <OwnershipGuideDialog
        guide={activeGuide}
        onClose={() => setActiveGuide(null)}
      />
    </section>
  );
}

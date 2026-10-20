
import { FiUsers, FiArrowUpRight } from "react-icons/fi";
import "./SUVCard.css";

function SUVCard({ suv }) {
  return (
    <article className="suv-card">
      <div className="suv-card__image-wrap">
        <img
          className="suv-card__image"
          src={suv.image}
          alt={`${suv.brand} ${suv.name}`}
        />

        <span className="suv-card__brand">{suv.brand}</span>
      </div>

      <div className="suv-card__content">
        <p className="suv-card__category">{suv.category}</p>

        <h3>{suv.name}</h3>

        <p className="suv-card__description">
          {suv.description}
        </p>

        <div className="suv-card__details">
          <span>{suv.fuel}</span>
          <span>{suv.transmission}</span>
          <span>
            <FiUsers /> {suv.seats} seats
          </span>
        </div>

        <div className="suv-card__footer">
          <div>
            <small>Indicative price</small>
            <strong>₹{suv.price.toFixed(2)} lakh*</strong>
          </div>

          <button
            className="suv-card__button"
            type="button"
            aria-label={`Explore ${suv.brand} ${suv.name}`}
          >
            <FiArrowUpRight />
          </button>
        </div>
      </div>
    </article>
  );
}

export default SUVCard;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDestinationSettings } from "../../context/useDestinationSettings";

export function DestinationPhoto({ src }) {
  const [failedImage, setFailedImage] = useState(null);

  if (!src || failedImage === src) return null;

  return (
    <img
      className="ex-card-image"
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailedImage(src)}
    />
  );
}

export default function DestinationCard({ d }) {
  const { isArabic, text, destinationText, price } = useDestinationSettings();
  const copy = destinationText(d);
  return (
    <Link
      className="ex-card"
      data-region={d.region}
      to={`/explore/${d.id}`}
      aria-labelledby={`destination-${d.id}`}
    >
      <DestinationPhoto src={d.img} />
      <div className="ex-card-labels">
        <span className="ex-card-tag">{copy.tag}</span>
        <span>{copy.location}</span>
      </div>
      <div className="ex-card-content">
        <h3 id={`destination-${d.id}`}>{copy.name}</h3>
        <p className="ex-card-description">{copy.text}</p>
        <div className="ex-card-footer">
          <span>{text("تقدير من", "Est. from")} <strong><bdi>{price(d.price)}</bdi></strong> / {text("يوم", "day")}</span>
          <span className="ex-card-action">{text("استكشف الوجهة", "Explore destination")} {isArabic ? "←" : "→"}</span>
        </div>
      </div>
    </Link>
  );
}

import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { territories } from "../data/exploreData";
import { useDestinationSettings } from "../context/useDestinationSettings";
import { getTours } from "../data/tourCatalog";
import "./Tours.css";

function TourPhoto({ src }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return null;

  return (
    <img
      className="tours-photo"
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function TourCard({ tour, destination }) {
  const { text, price, term } = useDestinationSettings();
  return (
    <article className="tours-card">
      <TourPhoto key={tour.img} src={tour.img} />
      <div className="tours-card-content">
        <p className="tours-meta">{term(tour.category)} · {tour.days}</p>
        <h2>{tour.title}</h2>
        <p className="tours-route">{tour.stops}</p>
        <div className="tours-card-footer">
          <p><strong><bdi>{price(tour.price)}</bdi></strong> / {text("شخص للرحلة", "person per tour")}</p>
          <Link
            className="tours-link"
            to={{
              pathname: `/tours/${tour.id}`,
              search: destination ? `?destination=${destination}` : "",
            }}
            aria-label={`View details for ${tour.title}`}
          >
            {text("عرض التفاصيل ←", "View details →")}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Tours() {
  const { text, number, destinationText } = useDestinationSettings();
  const [params, setParams] = useSearchParams();
  const selection = territories.find((item) => item.id === params.get("destination"));
  const destination = selection?.id ?? "";
  const tours = getTours();
  const results = destination
    ? tours.filter((tour) => tour.destinations.includes(destination))
    : tours;

  return (
    <main className="tours-page">
      <header className="tours-intro">
        <div className="container tours-intro-layout">
          <div>
            <p className="tours-meta">{text("رحلات الأردن", "Tours in Jordan")}</p>
            <h1>{text("اختَر رحلتك في الأردن", "Find your Jordan tour")}</h1>
            <p>{text("قارن المسارات والمدد والأسعار للرحلات في الأردن.", "Compare routes, durations and prices for guided trips across Jordan.")}</p>
          </div>
          <label className="tours-filter">
            {text("فلترة حسب الوجهة", "Filter by destination")}
            <select
              value={selection?.id ?? ""}
              onChange={(event) => setParams(
                event.target.value ? { destination: event.target.value } : {},
              )}
            >
              <option value="">{text("كل الوجهات", "All destinations")}</option>
              {territories.map((item) => (
                <option key={item.id} value={item.id}>{destinationText(item).name}</option>
              ))}
            </select>
          </label>
        </div>
      </header>
      <section className="container tours-results" aria-label="Tour results">
        <p className="tours-count">{text("الأسعار المعروضة تجريبية وبانتظار الاعتماد.", "Listed prices are provisional and pending approval.")}</p>
        <p className="tours-count" role="status">
          {number(results.length)} {text("رحلة", results.length === 1 ? "tour" : "tours")}
          {selection ? ` · ${destinationText(selection).name}` : ""}
        </p>
        {results.length ? (
          <div className="tours-grid">
            {results.map((tour) => (
              <TourCard key={tour.id} tour={tour} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="tours-empty">
            <p>{text("ما في رحلات مدرجة لهاي الوجهة لسه.", "No tours are listed for this destination yet.")}</p>
            <Link className="tours-link" to="/tours">{text("تصفّح كل الرحلات ←", "Browse all tours →")}</Link>
          </div>
        )}
      </section>
    </main>
  );
}

export function TourDetails() {
  const { text, price, term } = useDestinationSettings();
  const { tourId } = useParams();
  const [params] = useSearchParams();
  const destination = params.get("destination");
  const origin = params.get("from") === "destination"
    ? territories.find((item) => item.id === destination)
    : null;
  const backToTours = {
    pathname: "/tours",
    search: destination ? `?${new URLSearchParams({ destination })}` : "",
  };
  const tour = getTours().find((item) => String(item.id) === tourId);

  return (
    <main className="tours-page">
      <div className="container tours-detail">
        <Link className="tours-link" to={origin ? `/explore/${origin.id}` : backToTours}>
          {origin ? text("الرجوع للوجهة ←", "← Back to destination") : text("الرجوع للرحلات ←", "← Back to tours")}
        </Link>
        {tour ? (
          <article className="tours-detail-card">
            <TourPhoto key={tour.img} src={tour.img} />
            <div className="tours-card-content">
              <p className="tours-meta">{term(tour.category)}</p>
              <h1>{tour.title}</h1>
              {tour.description && <p className="tours-route">{tour.description}</p>}
              <dl>
                <div><dt>{text("المدة", "Duration")}</dt><dd>{tour.days}</dd></div>
                <div><dt>{text("السعر التجريبي", "Sample price")}</dt><dd><bdi>{price(tour.price)}</bdi> / {text("شخص للرحلة", "person per tour")}</dd></div>
                {tour.maxTravelers && <div><dt>{text("عدد المسافرين", "Group size")}</dt><dd>Up to {tour.maxTravelers} travelers</dd></div>}
                {tour.guide && <div><dt>{text("المرشد", "Guide")}</dt><dd>{tour.guide} · {tour.role}</dd></div>}
              </dl>
              <h2>{text("المسار", "Route")}</h2>
              <ol className="tours-stops">
                {tour.stops.split(" → ").map((stop, index) => (
                  <li key={index}>{stop}</li>
                ))}
              </ol>
            </div>
          </article>
        ) : (
          <h1>{text("الرحلة غير موجودة", "Tour not found")}</h1>
        )}
      </div>
    </main>
  );
}

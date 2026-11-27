import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import { categoryLabelsAr } from "../data/homeData";
import { getTrips, localizeTrip } from "../services/trips";
import "../pages/Home.css";

const initials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

export default function TripListings({ standalone = false }) {
  const { language, isArabic } = useSettings();
  const [params] = useSearchParams();
  const keyword = params.get("keyword")?.trim() || "";
  const date = params.get("date") || "";
  const travelers = Number(params.get("travelers")) || 0;
  const amount = new Intl.NumberFormat(isArabic ? "ar-JO" : "en-US");
  const Heading = standalone ? "h1" : "h2";

  const [cat, setCat] = useState(null);
  const [result, setResult] = useState({ key: null, trips: [], status: "loading" });
  const [attempt, setAttempt] = useState(0);

  const requestKey = `${keyword}:${attempt}`;
  const { trips, status: tripsStatus } = result.key === requestKey ? result : { trips: [], status: "loading" };

  useEffect(() => {
    const controller = new AbortController();

    getTrips({ signal: controller.signal, keyword })
      .then((data) => {
        if (controller.signal.aborted) return;
        const upcoming = data.filter((trip) => trip.tripStatus === "Upcoming");
        setResult({ key: requestKey, trips: upcoming, status: "ready" });
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setResult({ key: requestKey, trips: [], status: "error" });
        }
      });

    return () => controller.abort();
  }, [requestKey, keyword]);


  const tripCategories = new Map();
  for (const trip of trips) {
    if (trip.categoryId != null && trip.categoryName) {
      tripCategories.set(trip.categoryId, trip.categoryName);
    }
  }

  const activeCategory = tripCategories.has(cat) ? cat : null;
  const shown = trips.filter((trip) => (activeCategory === null || trip.categoryId === activeCategory)
    && (!date || trip.startDate?.slice(0, 10) === date)
    && (!travelers || trip.maxParticipants >= travelers));

  const dateFormatter = new Intl.DateTimeFormat(isArabic ? "ar-JO" : "en-US", {
    day: "numeric",
    month: "short",
  });

  function formatTripDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
  }

  const text = (ar, en) => (isArabic ? ar : en);

  return (
    <section className={`section container${standalone ? " trip-listings-page" : ""}`}>
      <div className="sec-head">
        <div>
          <span className="eyebrow">
            {text("رحلات بمجموعات صغيرة", "Curated small groups")}
          </span>

          <Heading>{standalone ? text("الرحلات", "Trips") : text("اختر مغامرتك القادمة", "Handcrafted Expeditions")}</Heading>

          <p>
            {text(
              "استكشف الرحلات القادمة واختر التجربة اللي بتناسبك.",
              "Explore upcoming trips and find the experience that suits you.",
            )}
          </p>
        </div>

        {tripsStatus === "ready" && trips.length > 0 && (
          <div className="chips">
            <button
              type="button"
              className={activeCategory === null ? "chip on" : "chip"}
              aria-pressed={activeCategory === null}
              onClick={() => setCat(null)}
            >
              {text("كل الرحلات", "All Trips")}
            </button>
            {Array.from(tripCategories, ([id, name]) => (
              <button
                type="button"
                key={id}
                className={activeCategory === id ? "chip on" : "chip"}
                aria-pressed={activeCategory === id}
                onClick={() => setCat(id)}
              >
                {isArabic ? categoryLabelsAr[name] || name : name}
              </button>
            ))}
          </div>
        )}
      </div>

      {tripsStatus === "loading" && (
        <p role="status">{text("جارٍ تحميل الرحلات…", "Loading trips…")}</p>
      )}

      {tripsStatus === "error" && (
        <div className="card card-body trip-listings-offline">
          <p role="alert">
            {text(
              "الرحلات المباشرة غير متاحة حالياً.",
              "Live trips are temporarily unavailable.",
            )}
          </p>
          <div className="trip-listings-actions">
          <button
            type="button"
            className="btn btn-blue"
            onClick={() => {
              setAttempt((current) => current + 1);
            }}
          >
            {text("إعادة المحاولة", "Try again")}
          </button>
          <Link className="link" to="/tours">{text("تصفّح الرحلات التجريبية", "Browse sample tours")}</Link>
          </div>
        </div>
      )}

      {tripsStatus === "ready" && (
        <div className="cards3">
          {shown.map((trip) => localizeTrip(trip, language)).map((trip) => (
            <article className="card" key={trip.tripId}>
              <div className="trip-img">
                {trip.tripImageUrl && (
                  <img
                    src={trip.tripImageUrl}
                    alt=""
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
                {trip.pricePerPerson != null && <span className="price-tag"><bdi>{amount.format(trip.pricePerPerson)}</bdi> / {text("للشخص", "person")}</span>}
                {trip.startDate && (
                  <span className="date">
                    {formatTripDate(trip.startDate)}
                    {trip.endDate && <> – {formatTripDate(trip.endDate)}</>}
                  </span>
                )}
              </div>

              <div className="card-body">
                <h3><bdi>{trip.title}</bdi></h3>
                {trip.maxParticipants != null && <p className="meta">{text("الحد الأقصى:", "Maximum group size:")} {amount.format(trip.maxParticipants)}</p>}
                {trip.description && <p><bdi>{trip.description}</bdi></p>}

                <div className="trip-card-footer">
                  {trip.guideName && (
                    <div className="guide-mini">
                      <span className="avatar">{initials(trip.guideName)}</span>
                      <strong><bdi>{trip.guideName}</bdi></strong>
                    </div>
                  )}
                  <Link
                    to={`/trips/${trip.tripId}`}
                    className="trip-summary-link"
                  >
                    {text("عرض ملخّص الرحلة", "View trip summary")}
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {shown.length === 0 && (
            <p role="status">
              {trips.length === 0
                ? text(
                    "ما في رحلات متاحة حاليًا.",
                    "No trips are available right now.",
                  )
                : text(
                    "ما في رحلات بتطابق البحث والفلاتر.",
                    "No trips match your search and filters.",
                  )}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

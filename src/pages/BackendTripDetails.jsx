import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import { getTrip, localizeTrip } from "../services/trips";
import "./Tours.css";

export default function BackendTripDetails() {
  const { tripId } = useParams();
  const { isArabic, language } = useSettings();
  const [result, setResult] = useState(null);
  const text = (ar, en) => isArabic ? ar : en;
  const current = result?.id === tripId ? result : null;
  const trip = localizeTrip(current?.trip, language);
  const number = new Intl.NumberFormat(isArabic ? "ar-JO" : "en-US");

  useEffect(() => {
    const controller = new AbortController();
    getTrip(tripId, { signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) setResult({ id: tripId, trip: data });
      })
      .catch(() => {
        if (!controller.signal.aborted) setResult({ id: tripId, error: true });
      });
    return () => controller.abort();
  }, [tripId]);

  return <main className="tours-page"><div className="container tours-detail">
    <Link className="tours-link" to="/trips">{text("الرجوع للرحلات", "Back to trips")}</Link>
    {!current && <p role="status">{text("جارٍ تحميل الرحلة…", "Loading trip…")}</p>}
    {current?.error && <p role="alert">{text("تعذّر تحميل تفاصيل الرحلة.", "Could not load the trip details.")}</p>}
    {current && !current.error && !trip && <h1>{text("الرحلة غير متاحة", "Trip unavailable")}</h1>}
    {trip && <article className="tours-detail-card">
      {trip.tripImageUrl && <img className="tours-photo" src={trip.tripImageUrl} alt="" />}
      <div className="tours-card-content">
        <p className="tours-meta">{trip.categoryName}</p>
        <h1>{trip.title}</h1><p>{trip.description}</p>
        <dl>
          <div><dt>{text("تاريخ البداية", "Starts")}</dt><dd><bdi>{trip.startDate?.replace("T", " ")}</bdi></dd></div>
          <div><dt>{text("تاريخ النهاية", "Ends")}</dt><dd><bdi>{trip.endDate?.replace("T", " ")}</bdi></dd></div>
          <div><dt>{text("الحد الأقصى للمشاركين", "Group capacity")}</dt><dd>{number.format(trip.maxParticipants)}</dd></div>
          <div><dt>{text("السعر للشخص", "Price per person")}</dt><dd>{number.format(trip.pricePerPerson)}</dd></div>
          {trip.guideName && <div><dt>{text("المرشد", "Guide")}</dt><dd>{trip.guideName}</dd></div>}
        </dl>
        <p className="meta">{text("عملة السعر غير محددة في بيانات الرحلة.", "The trip data does not specify a currency.")}</p>
      </div>
    </article>}
  </div></main>;
}

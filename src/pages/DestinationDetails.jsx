import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DestinationCard, { DestinationPhoto } from "../components/explore/DestinationCard";
import { destinationDetails } from "../data/destinationDetails";
import { territories } from "../data/exploreData";
import { guides } from "../data/homeData";
import { getTours } from "../data/tourCatalog";
import "./Explore.css";
import "./DestinationDetails.css";

import { useDestinationSettings } from "../context/useDestinationSettings";
const photoStyle = (src) => ({ backgroundImage: src ? `url("${src}")` : undefined });
const initials = (name) => name.split(" ").slice(0, 2).map((part) => part[0]).join("");

function Heading({ label, children }) {
  return <div className="dd-heading"><p className="eyebrow">{label}</p><h2>{children}</h2></div>;
}

function DestinationActions({ id }) {
  const key = `sindibad:saved:${id}`;
  const [saved, setSaved] = useState(() => typeof window !== "undefined" && window.localStorage.getItem(key) === "true");
  const [feedback, setFeedback] = useState("");

  function toggleSave() {
    localStorage.setItem(key, String(!saved));
    setSaved(!saved);
    setFeedback(saved ? "Removed from saved destinations." : "Destination saved.");
  }

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setFeedback("Link copied.");
      }
    } catch (error) {
      if (error.name !== "AbortError") setFeedback("Copy the page URL to share this destination.");
    }
  }

  return (
    <div className="dd-actions">
      <button type="button" onClick={toggleSave} aria-label="Save destination" aria-pressed={saved}>{saved ? "♥" : "♡"}</button>
      <button type="button" onClick={share} aria-label="Share destination">↗</button>
      <span role="status">{feedback}</span>
    </div>
  );
}

function Booking({ destination, profile, selectedTour }) {
  const { text, price, number } = useDestinationSettings();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [notice, setNotice] = useState("");
  const travelers = adults + children;
  const today = new Date();
  const start = [today.getFullYear(), today.getMonth() + 1, today.getDate()]
    .map((part) => String(part).padStart(2, "0")).join("-");
  const rate = selectedTour?.price ?? destination.price;
  const maxTravelers = selectedTour?.maxTravelers ?? 10;

  return (
    <aside className="dd-sidebar">
      <form className="card dd-booking" id="plan-trip" onSubmit={(event) => {
        event.preventDefault();
        setNotice("Your estimate is ready. Online reservations are not enabled in this preview.");
      }}>
        <p className="dd-book-price">{!selectedTour && text("تقدير من ", "Est. from ")}<strong>{price(rate)}</strong> / {selectedTour ? text("شخص", "person") : text("يوم", "day")}</p>
        {selectedTour && <strong>{selectedTour.title}</strong>}
        <p className="meta">{text("الأسعار تجريبية وبانتظار الاعتماد.", "Sample pricing pending approval.")}</p>
        {profile.rating && <p className="stars">★ {profile.rating} <span className="meta">({profile.reviewCount} reviews)</span></p>}
        <fieldset className="dd-dates">
          <legend>{text("اختَر التواريخ", "Select dates")}</legend>
          <label>{text("من", "From")}<input type="date" required min={start} name="from" onChange={(event) => {
            event.currentTarget.form.elements.to.min = event.currentTarget.value || start;
          }} /></label>
          <label>{text("إلى", "To")}<input type="date" required min={start} name="to" /></label>
        </fieldset>
        <fieldset className="dd-travelers">
          <legend>{text("المسافرون", "Travelers")}</legend>
          {[[ "Adults", adults, setAdults, 1 ], [ "Children", children, setChildren, 0 ]].map(([label, value, setValue, min]) => (
            <div key={label} className="dd-stepper">
              <span>{label}</span>
              <button type="button" aria-label={`Remove one from ${label.toLowerCase()}`} disabled={value <= min} onClick={() => setValue(value - 1)}>−</button>
              <output aria-label={label}>{value}</output>
              <button type="button" aria-label={`Add one to ${label.toLowerCase()}`} disabled={travelers >= maxTravelers} onClick={() => setValue(value + 1)}>+</button>
            </div>
          ))}
        </fieldset>
        <label className="dd-expedition-type">{text("نوع الرحلة", "Expedition type")}
          <select name="type"><option>{text("مجموعة صغيرة", "Small group")}</option><option>{text("رحلة خاصة", "Private")}</option></select>
        </label>
        <div className="dd-estimate">
          <span>{selectedTour ? text("التكلفة التقديرية للرحلة", "Estimated trip total") : text("التكلفة اليومية التقديرية", "Estimated daily total")}<small>{price(rate)} × {number(travelers)} {text("مسافر", "travelers")}</small></span>
          <output>{price(rate * travelers)}</output>
        </div>
        <button className="btn btn-blue" type="submit">{text("احجز مقعدك", "Reserve Your Seat")}</button>
        <Link className="btn dd-outline" to="/contact">{text("اسأل مختصاً", "Ask a Specialist")}</Link>
        <p className="meta" role="status">{notice}</p>
        <ul className="dd-reassurance">
          <li>✓ Confirm cancellation terms with your expedition</li>
          <li>✓ Confirmation varies by departure</li>
          <li>✓ Certified local guides</li>
        </ul>
      </form>
      {(profile.drive || profile.mapDestination) && (
        <a className="card dd-map" href={`https://www.google.com/maps/dir/?api=1&origin=Amman%2C+Jordan&destination=${encodeURIComponent((profile.mapDestination ?? profile.shortName) + ", Jordan")}`} target="_blank" rel="noreferrer">
          <span aria-hidden="true">📍</span><strong>{profile.drive ? `${profile.drive} from Amman` : profile.mapDestination}</strong><small>{text("افتح الاتجاهات ↗", "Open directions ↗")}</small>
        </a>
      )}
    </aside>
  );
}

function ExpeditionCard({ tour, destination, onSelect, fallbackPhoto }) {
  const { text, price } = useDestinationSettings();
  const details = `/tours/${tour.id}?${new URLSearchParams({ destination, from: "destination" })}`;
  return (
    <article className="card dd-expedition">
      <div className="trip-img" style={{ backgroundImage: [tour.img, fallbackPhoto].filter(Boolean).map((src) => photoStyle(src).backgroundImage).join(", ") }}>
        {tour.date && <span className="date">{tour.date}</span>}
        {tour.seats && <span className="seats">{tour.seats}</span>}
        <span className="price-tag">{price(tour.price)} / {text("شخص للرحلة", "person per tour")}</span>
      </div>
      <div className="card-body">
        <p className="meta">{[tour.days, tour.category, tour.maxTravelers && `Max ${tour.maxTravelers} travelers`].filter(Boolean).join(" · ")} {tour.rating && <span className="stars">★ {tour.rating}</span>}</p>
        <h3>{tour.title}</h3>
        <p className="stops">{tour.stops}</p>
        {tour.description && <p className="dd-copy">{tour.description}</p>}
        {tour.guide && (
          <div className="guide-mini">
            <span className="avatar">{initials(tour.guide)}</span><strong>{tour.guide} <span className="dd-verified" aria-label="Verified">✓</span></strong>
          </div>
        )}
        <div className="card-foot"><Link className="btn dd-dossier" to={details}>{text("تفاصيل الرحلة", "Full Dossier")}</Link><a className="btn btn-blue" href="#plan-trip" onClick={() => onSelect(tour)}>{text("احجز مقعدك", "Reserve Seat")}</a></div>
      </div>
    </article>
  );
}

function Gallery({ photos }) {
  const { text } = useDestinationSettings();
  const [expanded, setExpanded] = useState(false);
  const credits = photos.filter((photo) => photo.source);
  const single = photos.length === 1;
  return (
    <section>
      <Heading label={text("نظرة أقرب", "A closer look")}>{text("معرض الصور", "Gallery")}</Heading>
      <div className={`dd-gallery${single ? " dd-gallery-single" : expanded ? " dd-gallery-expanded" : ""}`}>
        {photos.map(({ src, label }) => (
          <div className="dd-gallery-tile" key={src}>
            <DestinationPhoto src={src} />
            <span>{label}</span>
          </div>
        ))}
      </div>
      {!single && <button className="btn dd-dossier" type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>{expanded ? text("عرض مصغّر", "Show compact gallery") : text("شوف كل الصور", "View all photos")}</button>}
      {credits.length > 0 && <details className="dd-credits">
        <summary>{text("مصادر الصور", "Photo credits")}</summary>
        <ul>{credits.map((photo) => <li key={photo.src}><a href={photo.source}>{photo.label} by {photo.credit}</a> · <a href={photo.license}>{text("الترخيص", "License")}</a> · cropped to fit</li>)}</ul>
      </details>}
    </section>
  );
}

function Visit({ profile }) {
  const { text } = useDestinationSettings();
  return (
    <section>
      <Heading label={text("قبل الزيارة", "Before you go")}>{text("خطّط لزيارتك", "Plan Your Visit")}</Heading>
      <div className="dd-panels">
        {profile.visit.map(([label, copy]) => <article className="card card-body" key={label}><h3>{label}</h3><p className="dd-copy">{copy}</p></article>)}
        {profile.weather && <article className="card card-body dd-weather">
          <h3>{text("الطقس حسب الشهر", "Weather by month")}</h3>
          <p className="meta">Illustrative daytime temperatures in °C</p>
          <ul>{profile.months.map((month, index) => (
            <li key={month}><span>{profile.weather[index]}°</span><i style={{ height: profile.weather[index] * 2 }} /><small>{month}</small></li>
          ))}</ul>
        </article>}
      </div>
    </section>
  );
}

function Reviews({ profile }) {
  const { text } = useDestinationSettings();
  return (
    <section>
      <Heading label={text("تجارب المسافرين", "Traveler stories")}>{text("المراجعات", "Reviews")}</Heading>
      <div className="card card-body dd-review-summary">
        <div><strong>{profile.rating}</strong><p className="stars">★★★★★</p><p className="meta">{profile.reviewCount} sample reviews</p></div>
        <div>{[99, 1, 0, 0, 0].map((share, index) => <label key={index}>{5 - index} ★ <meter min="0" max="100" value={share}>{share}%</meter></label>)}</div>
      </div>
      <div className="dd-panels dd-reviews">
        {profile.reviews.map(([name, country, quote, trip]) => (
          <article className="card card-body" key={name}>
            <div className="guide-mini"><span className="avatar">{initials(name)}</span><div><strong>{name}</strong><p className="meta">{country}</p></div></div>
            <p className="stars">★★★★★</p><p className="quote">“{quote}”</p><p className="meta">{trip}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function LocalGuides({ ids, name }) {
  const { text, price } = useDestinationSettings();
  return (
    <section className="dd-wide-section">
      <Heading label={text("مرشدون محليون", "Local voices")}>{text(`تعرّف على مرشدي ${name}`, `Guided by True Guardians of ${name}.`)}</Heading>
      <div className="dd-three">
        {ids.map((id) => guides.find((guide) => guide.id === id)).filter(Boolean).map((guide) => (
          <article className="card card-body" key={guide.id}>
            <div className="guide-top"><span className="avatar lg" style={photoStyle(guide.img)}>{initials(guide.name)}</span><div>
              <h3>{guide.name} <span className="dd-verified" aria-label="Verified">✓</span></h3>
              <p className="dd-guide-role">{guide.role}</p><span className="stars">★ {guide.rating}</span>
            </div></div>
            <p className="quote">“{guide.quote}”</p>
            <div className="pills">{guide.tags.map((tag) => <span className="pill" key={tag}>{tag}</span>)}</div>
            <p className="meta">Languages: {guide.langs}</p>
            <div className="card-foot"><span>{text("الأجر اليومي", "Day rate")} <bdi>{price(guide.rate)}</bdi> / {text("يوم", "day")}</span><a className="btn btn-blue" href="#plan-trip">{text("احجز مرشداً", "Book Guide")}</a></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DestinationView({ destination }) {
  const { isArabic, text, price, destinationText, term } = useDestinationSettings();
  const [selectedTour, setSelectedTour] = useState(null);
  const profile = destinationDetails[destination.id] ?? {};
  const localized = destinationText(destination);
  const name = isArabic ? localized.name.split(" — ")[0] : profile.shortName ?? destination.name;
  const region = isArabic ? localized.location : profile.governorate ?? destination.location;
  const expeditions = getTours().filter((tour) => tour.destinations.includes(destination.id));
  const featured = expeditions.filter((tour) => tour.featuredDestination === destination.id);
  const displayedTours = featured.length ? featured : expeditions;
  const nearby = (profile.nearby ?? territories.filter((item) => item.id !== destination.id && item.region === destination.region).slice(0, 3).map((item) => item.id))
    .map((id) => territories.find((item) => item.id === id)).filter(Boolean);
  const facts = [
    ["◷", text("المدة المقترحة", "Recommended stay"), profile.stay], ["⌖", text("المنطقة", "Region"), region],
    ["↗", text("المسافة من عمّان", "Distance from Amman"), profile.drive], ["△", text("الصعوبة", "Difficulty"), profile.difficulty],
    ["✦", text("مناسبة لـ", "Best for"), profile.bestFor],
  ].filter(([, , value]) => value);

  return (
    <main className="dd-page ex-directory">
      <header className="dd-hero">
        <DestinationPhoto src={profile.photos?.[0]?.src ?? destination.img} />
        <div className="dd-container dd-hero-content">
          <nav aria-label="Breadcrumb"><Link to="/">{text("الرئيسية", "Home")}</Link><span>/</span><Link to="/explore">{text("استكشف الأردن", "Explore Jordan")}</Link><span>/</span><span aria-current="page">{name}</span></nav>
          <DestinationActions id={destination.id} />
          <div className="dd-hero-copy">
            <p className="dd-hero-label"><span>{localized.tag}</span>{region}</p>
            <h1>{isArabic ? localized.name : profile.name ?? destination.name}</h1>
            <p>{isArabic ? localized.text : profile.lead ?? destination.text}</p>
            <ul className="dd-stats">
              {profile.rating && <li><span>★</span> {profile.rating} ({profile.reviewCount} reviews)</li>}
              <li><span>◈</span> {text("تقدير من", "Est. from")} <bdi>{price(destination.price)}</bdi> / {text("يوم", "day")}</li>
              {profile.season && <li><span>◷</span> {text("أفضل وقت:", "Best time:")} {profile.season}</li>}
            </ul>
          </div>
        </div>
      </header>

      <div className="dd-container">
        <dl className="card dd-facts" style={{ "--dd-facts": facts.length }}>
          {facts.map(([icon, label, value]) => (
            <div key={label}><span aria-hidden="true">{icon}</span><div><dt>{label}</dt><dd>{value}</dd></div></div>
          ))}
        </dl>
        <div className="dd-layout">
          <div className="dd-main">
            <section>
              <Heading label={text("عن الوجهة", "About this territory")}>{isArabic ? localized.name : profile.heading ?? destination.name}</Heading>
              {(isArabic ? [localized.text] : profile.about ?? [destination.text]).map((copy) => <p className="dd-copy" key={copy}>{copy}</p>)}
              <div className="pills">{(profile.chips ?? destination.categories).map((chip) => <span key={chip} className="pill">{term(chip)}</span>)}</div>
            </section>
            {profile.highlights && <section>
              <Heading label={text("أماكن تستحق الزيارة", "Worth the detour")}>{text("أبرز المعالم", "Highlights")}</Heading>
              <div className="dd-three">{profile.highlights.map(([icon, label, copy]) => (
                <article className="card card-body dd-highlight" key={label}><span aria-hidden="true">{icon}</span><h3>{label}</h3><p className="dd-copy">{copy}</p></article>
              ))}</div>
            </section>}
            {profile.photos && <Gallery photos={profile.photos} />}
            <section>
              <Heading label={text("رحلات مختارة", "Handcrafted expeditions")}>{text(`رحلات في ${name}`, `Journeys Through ${name}`)}</Heading>
              {displayedTours.length ? <div className="dd-three dd-expeditions">{displayedTours.map((tour) => (
                <ExpeditionCard key={tour.id} tour={tour} destination={destination.id} onSelect={setSelectedTour} fallbackPhoto={profile.photos?.[0]?.src} />
              ))}</div> : <p className="card card-body">No tours are listed here yet. <Link className="link" to="/tours">Browse all tours →</Link></p>}
              {expeditions.length > displayedTours.length && <Link className="link dd-all-tours" to={`/tours?destination=${destination.id}`}>See all tours in {name} →</Link>}
            </section>
            {profile.itinerary && <section>
              <Heading label={text("على الطريق", "On the trail")}>{text("خط سير الرحلة", profile.itineraryLabel ?? "Day-by-Day Itinerary")}</Heading>
              <ol className="dd-timeline">{profile.itinerary.map(([title, copy, tags], index) => (
                <li key={title}><p className="eyebrow">{profile.itineraryStep ?? "Day"} {index + 1}</p><h3>{title}</h3><p className="dd-copy">{copy}</p><div className="pills">{tags.map((tag) => <span className="pill" key={tag}>{tag}</span>)}</div></li>
              ))}</ol>
            </section>}
            {profile.included && <section>
              <Heading label={text("تفاصيل الرحلة", "Expedition essentials")}>{text("ماذا تشمل الرحلة؟", "What’s Included")}</Heading>
              <p className="dd-copy">{text("هاي أمثلة عامة. التفاصيل النهائية بتعتمد على الرحلة المختارة وبتحتاج تأكيد.", "These are sample inclusions. Confirm what is included for your selected tour.")}</p>
              <div className="dd-panels dd-inclusions">
                {[[ text("تشمل", "Included"), profile.included, "✓" ], [ text("لا تشمل", "Not included"), profile.excluded, "×" ]].map(([label, items, icon]) => (
                  <article className="card card-body" key={label}><h3>{label}</h3><ul>{items.map((item) => <li key={item}><span aria-hidden="true">{icon}</span> {item}</li>)}</ul></article>
                ))}
              </div>
            </section>}
            {profile.visit && <Visit profile={profile} />}
            {profile.reviews ? <Reviews profile={profile} /> : <section>
              <Heading label={text("تجارب المسافرين", "Traveler stories")}>{text("المراجعات", "Reviews")}</Heading>
              <p className="card card-body">{text("ما في مراجعات لهاي الوجهة لسه.", "No traveler reviews for this destination yet.")}</p>
            </section>}
          </div>
          <Booking key={selectedTour?.id ?? "destination"} destination={destination} profile={profile} selectedTour={selectedTour} />
        </div>
        {profile.guideIds ? <LocalGuides ids={profile.guideIds} name={name} /> : <section className="dd-wide-section">
          <Heading label={text("مرشدون محليون", "Local voices")}>{text(`مرشدون في ${name}`, `Guides in ${name}`)}</Heading>
          <p className="card card-body">{text("المرشدون المحليون رح يظهروا هون لما تتوفر بياناتهم.", "Guide profiles for this destination will appear here when available.")}</p>
        </section>}
        {nearby.length > 0 && <section className="dd-wide-section">
          <Heading label={text("كمّل الاستكشاف", "Keep exploring")}>{text(`وجهات قريبة من ${name}`, `Pair ${name} With`)}</Heading>
          <ul className="ex-grid">{nearby.map((item) => <li key={item.id}><DestinationCard d={item} /></li>)}</ul>
        </section>}
        <section className="cta dd-cta">
          <p className="badge">{text("ابدأ رحلتك", "Begin your journey")}</p>
          <h2>{text(`${name} بانتظارك. خلّيها قصّتك.`, `${name} Is Waiting. Make It Your Story.`)}</h2>
          <div className="hero-btns"><a className="btn btn-amber" href="#plan-trip">{text("ابدأ رحلتك الآن", "Start Your Journey Now")}</a><Link className="btn btn-ghost" to="/contact">{text("تواصل مع مختص بالأردن", "Speak to a Jordan Specialist")}</Link></div>
        </section>
      </div>
    </main>
  );
}

export default function DestinationDetails() {
  const { text } = useDestinationSettings();
  const { destinationId } = useParams();
  const destination = territories.find((item) => item.id === destinationId);
  useEffect(() => { window.scrollTo(0, 0); }, [destinationId]);

  return destination ? <DestinationView key={destinationId} destination={destination} /> : (
    <main className="ex-directory"><div className="container ex-detail-results"><h1>{text("الوجهة غير موجودة", "Destination not found")}</h1><Link className="ex-detail-link" to="/explore">{text("كل الوجهات ←", "← All destinations")}</Link></div></main>
  );
}

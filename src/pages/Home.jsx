import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import { getHomeData, categoryLabelsAr } from "../data/homeData";
import "./Home.css";

const shade = (img) => ({
  backgroundImage: `linear-gradient(to top, rgba(8,16,28,.85), rgba(8,16,28,.1)), url(${img})`,
});

const photo = (img) => ({
  backgroundImage: `url(${img})`,
});

const initials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

export default function Home() {
  const {
    language,
    isArabic,
    currency,
    formatMoney,
    ratesLoading,
    ratesError,
  } = useSettings();

  const [cat, setCat] = useState("All Trips");
  const navigate = useNavigate();

  const {
    destinations,
    categories,
    trips,
    guides,
    features,
    reviews,
  } = getHomeData(language);

  const shown =
    cat === "All Trips"
      ? trips
      : trips.filter((trip) => trip.category === cat);

  const text = (ar, en) => (isArabic ? ar : en);

  const displayPrice = (amount) => {
    const converted = formatMoney(amount);

    if (converted !== null) {
      return converted;
    }

    // نعرض السعر بالدولار بوضوح إذا لم يتوفر التحويل.
    return new Intl.NumberFormat(
      isArabic ? "ar-JO" : "en-US",
      {
        style: "currency",
        currency: "USD",
        currencyDisplay: "code",
      }
    ).format(amount);
  };

  return (
    <>
      {/* بداية الصفحة */}
      <section className="hero">
        <div className="container">
          <span className="badge">
            {text(
              "أرض التاريخ والحضارة",
              "The kingdom of time and wonders"
            )}
          </span>

          <h1>
            {text(
              "اكتشف الأردن بعيون أهل البلد",
              "Explore Jordan Like Never Before"
            )}
          </h1>

          <p>
            {text(
              "من الغابات الخضراء إلى القلاع القديمة ورمال الصحراء، اختر تجربتك ودع المغامرة تبدأ.",
              "From lush forests to ancient castles, your next adventure starts here."
            )}
          </p>

          <div className="hero-btns">
            <Link to="/explore" className="btn btn-blue">
              {text("اكتشف الوجهات", "Explore Destinations")}
            </Link>

            <Link to="/guides" className="btn btn-ghost">
              {text("اختر مرشدك", "Find Your Tour Guide")}
            </Link>
          </div>

          <form
            className="search"
            onSubmit={(event) => {
              event.preventDefault();
              navigate("/explore");
            }}
          >
            <div>
              <label htmlFor="home-destination">
                {text("وين حاب تروح؟", "Where to?")}
              </label>

              <input
                id="home-destination"
                placeholder={text(
                  "البتراء، وادي رم، البحر الميت",
                  "Petra, Wadi Rum, Dead Sea"
                )}
              />
            </div>

            <div>
              <label htmlFor="home-dates">
                {text("موعد الرحلة", "When?")}
              </label>

              <input
                id="home-dates"
                placeholder={text(
                  "مثلاً: 12–22 أكتوبر",
                  "Oct 12 – 22"
                )}
              />
            </div>

            <div>
              <label htmlFor="home-travelers">
                {text("عدد المسافرين", "Travelers")}
              </label>

              <input
                id="home-travelers"
                placeholder={text("مثلاً: شخصان", "2 Travelers")}
              />
            </div>

            <button type="submit" className="btn btn-amber">
              {text("ابحث عن رحلتك", "Search Experiences")}
            </button>
          </form>

          <div className="trust">
            <span>
              {text(
                "★ تقييم 4.97 من مسافرينا — أكثر من 3,400 رحلة",
                "★ 4.97 Traveler rating (3,400+ journeys)"
              )}
            </span>

            <span>
              {text(
                "✓ تجارب محلية وضيافة بدوية أصيلة",
                "✓ 100% authentic Bedouin and local immersion"
              )}
            </span>

            <span>
              {text(
                "مرشدون أردنيون معتمدون يعرفون المكان وحكاياته",
                "Certified Jordanian desert and heritage guides"
              )}
            </span>
          </div>
        </div>
      </section>

      {/* حالة تحويل العملة ومصدر أسعار الصرف */}
      {currency !== "USD" && (
        <div
          className="container"
          style={{
            paddingBlock: "16px",
            color: "var(--muted)",
            fontSize: "13px",
          }}
        >
          <p role="status">
            {ratesLoading
              ? text(
                  "جارٍ تحديث أسعار الصرف. أي سعر يظهر برمز USD هو بالدولار.",
                  "Updating exchange rates. Prices marked USD are in US dollars."
                )
              : ratesError
                ? text(
                    "تعذّر تحديث أسعار الصرف. تأكد من رمز العملة بجانب كل سعر، أو اختر الدولار.",
                    "Exchange rates could not be updated. Check each price’s currency code, or select USD."
                  )
                : text(
                    "الأسعار المحوّلة تقديرية وقد تختلف عن المبلغ النهائي عند الدفع.",
                    "Converted prices are estimates and may differ from the final payment amount."
                  )}
          </p>

          <a
            href="https://www.exchangerate-api.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "4px",
              color: "var(--blue)",
              textDecoration: "underline",
            }}
          >
            {text(
              "أسعار الصرف من ExchangeRate-API",
              "Rates by ExchangeRate-API"
            )}
          </a>
        </div>
      )}

      {/* الوجهات */}
      <section className="section container">
        <div className="sec-head">
          <div>
            <span className="eyebrow">
              {text(
                "أماكن تستحق الزيارة",
                "Destinations of wonder"
              )}
            </span>

            <h2>
              {text(
                "اكتشف أجمل ما في الأردن",
                "The Jewels of Jordan"
              )}
            </h2>
          </div>

          <Link to="/explore" className="link">
            {text(
              "شاهد كل الوجهات",
              "View all 14 curated territories"
            )}
          </Link>
        </div>

        <div className="dest-grid">
          {destinations.map((destination) => (
            <Link
              to="/explore"
              key={destination.id}
              className={`dest ${destination.large ? "large" : ""}`}
              style={shade(destination.img)}
            >
              <span className="tag">{destination.tag}</span>
              <h3>{destination.name}</h3>
              <p>{destination.text}</p>

              <div className="dest-foot">
                <span>
                  {text("من", "From")}{" "}
                  <bdi>{displayPrice(destination.price)}</bdi>{" "}
                  / {text("اليوم", "day")}
                </span>

                {destination.cta && (
                  <span>{destination.cta}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* الرحلات */}
      <section className="section container">
        <div className="sec-head">
          <div>
            <span className="eyebrow">
              {text(
                "رحلات بمجموعات صغيرة",
                "Curated small groups"
              )}
            </span>

            <h2>
              {text(
                "اختر مغامرتك القادمة",
                "Handcrafted Expeditions"
              )}
            </h2>

            <p>
              {text(
                "مع 10 مسافرين كحد أقصى، خذ وقتك في الاستكشاف واستمتع بحكايات كل مكان.",
                "Intimate journeys strictly limited to 10 travelers, with deep historical pacing."
              )}
            </p>
          </div>

          <div className="chips">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`chip ${category === cat ? "on" : ""}`}
                onClick={() => setCat(category)}
                aria-pressed={category === cat}
              >
                {isArabic
                  ? categoryLabelsAr[category] || category
                  : category}
              </button>
            ))}
          </div>
        </div>

        <div className="cards3">
          {shown.map((trip) => (
            <article className="card" key={trip.id}>
              <div className="trip-img" style={photo(trip.img)}>
                <span className="date">{trip.date}</span>
                <span className="seats">{trip.seats}</span>

                <span className="price-tag">
                  <bdi>{displayPrice(trip.price)}</bdi>{" "}
                  / {text("للشخص", "person")}
                </span>
              </div>

              <div className="card-body">
                <div className="meta">
                  {trip.days} • ★ <bdi>{trip.rating}</bdi>
                </div>

                <h3>{trip.title}</h3>
                <div className="stops">{trip.stops}</div>

                <div className="guide-mini">
                  <span className="avatar">
                    {initials(trip.guide)}
                  </span>

                  <div>
                    <strong>{trip.guide}</strong>
                    <div className="meta">{trip.role}</div>
                  </div>
                </div>

                <div className="card-foot">
                  <Link to="/trips" className="link">
                    {text("تفاصيل الرحلة", "Full Dossier")}
                  </Link>

                  <Link
                    to={`/checkout/${trip.id}`}
                    className="btn btn-blue"
                  >
                    {text("احجز مقعدك", "Reserve Seat")}
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {shown.length === 0 && (
            <p>
              {text(
                "ما في رحلات ضمن هذا التصنيف حاليًا. جرّب تصنيفًا آخر.",
                "No trips in this category yet."
              )}
            </p>
          )}
        </div>
      </section>

      {/* المرشدون */}
      <section className="section container">
        <div className="sec-head">
          <div>
            <span className="eyebrow">
              {text("تعرّف على أهل البلد", "Local voices")}
            </span>

            <h2>
              {text(
                "مع مرشد يعرف الدرب والحكاية",
                "Guided by True Guardians"
              )}
            </h2>

            <p>
              {text(
                "اختر مرشدك من خبراء التاريخ والآثار ومغامرات الصحراء، واكتشف الأردن من منظور مختلف.",
                "Connect directly with licensed Jordanian storytellers, historians and desert navigators."
              )}
            </p>
          </div>

          <Link to="/guides" className="link">
            {text(
              "تعرّف على كل المرشدين",
              "Browse all 42 registered guides"
            )}
          </Link>
        </div>

        <div className="cards3">
          {guides.map((guide) => (
            <article className="card card-body" key={guide.id}>
              <div className="guide-top">
                <span
                  className="avatar lg"
                  style={photo(guide.img)}
                >
                  {initials(guide.name)}
                </span>

                <div>
                  <h3>{guide.name}</h3>
                  <div className="meta">{guide.role}</div>

                  <span className="stars">
                    ★ {guide.rating}
                  </span>{" "}
                  <span className="meta">
                    ({guide.reviews})
                  </span>
                </div>
              </div>

              <p className="quote">“{guide.quote}”</p>

              <div className="pills">
                {guide.tags.map((tag) => (
                  <span className="pill" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="meta">
                {text("يتحدث:", "Languages:")} {guide.langs}
              </div>

              <div className="card-foot">
                <span>
                  <bdi>{displayPrice(guide.rate)}</bdi>{" "}
                  / {text("اليوم", "day")}
                </span>

                <button type="button" className="btn btn-blue">
                  {text("احجز مع المرشد", "Book Guide")}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* مميزات سندباد */}
      <section className="section container center">
        <h2>
          {text(
            "رحلتك بعناية، وضيافتك من القلب",
            "Precision Travel, Soulful Hospitality"
          )}
        </h2>

        <p className="sub">
          {text(
            "نهتم بالتفاصيل لتستمتع برحلتك، ونعمل مع أهل البلد ليكون للسياحة أثر طيب عليهم.",
            "Designed to replace aggregator chaos with quiet luxury and fair local compensation."
          )}
        </p>

        <div className="features">
          {features.map((feature) => (
            <div className="card feature" key={feature.title}>
              <div className="ico">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p className="meta">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* آراء المسافرين */}
      <section className="section container">
        <div className="sec-head">
          <div>
            <span className="eyebrow">
              {text(
                "من رحلاتهم معنا",
                "Unfiltered memories"
              )}
            </span>

            <h2>
              {text("تجارب مسافرينا", "Voices From the Trail")}
            </h2>
          </div>

          <span className="stars">
            <bdi>4.97 / 5.0 ★★★★★</bdi>{" "}
            <span className="meta">
              {text(
                "(أكثر من 3,400 تقييم)",
                "(3,400+ reviews)"
              )}
            </span>
          </span>
        </div>

        <div className="cards3">
          {reviews.map((review) => (
            <article className="card card-body" key={review.id}>
              <span className="stars">★★★★★</span>
              <p className="quote">“{review.text}”</p>
              <strong>{review.name}</strong>
              <div className="meta">{review.place}</div>
            </article>
          ))}
        </div>
      </section>

      {/* الدعوة لبدء الرحلة */}
      <section className="container">
        <div className="cta">
          <h2>
            {text(
              "مغامرتك في الأردن بتبدأ هون",
              "Jordan Is Waiting. Make It Your Story."
            )}
          </h2>

          <p>
            {text(
              "من البتراء الوردية إلى ليالي الصحراء تحت النجوم، خلّينا نساعدك تخطّط لرحلة تشبهك.",
              "From ancient rose-red canyons to starlit desert valleys, craft your bespoke Jordanian journey with our curators."
            )}
          </p>

          <div className="hero-btns">
            <Link to="/register" className="btn btn-amber">
              {text("ابدأ رحلتك الآن", "Start Your Journey Now")}
            </Link>

            <Link to="/contact?topic=trip" className="btn btn-ghost">
              {text(
                "احكي معنا لنخطّط رحلتك",
                "Speak to a Jordan Specialist"
              )}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

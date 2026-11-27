import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import "./Company.css";

function CompanyHero({ label, title, description, children }) {
  return <header className="company-hero"><div className="container">
    <p className="company-eyebrow">{label}</p>
    <h1>{title}</h1><p>{description}</p>
    {children}
  </div></header>;
}

export function About() {
  const { isArabic } = useSettings();
  const t = (en, ar) => isArabic ? ar : en;

  return <main className="company-page">
    <CompanyHero
      label={t("About Sindibad", "عن سندباد")}
      title={t("Jordan, through local eyes", "الأردن بعيون أهل البلد")}
      description={t("Discover the places, stories and people behind your next journey.", "اكتشف الأماكن والحكايات والناس اللي رح تتعرّف عليهم برحلتك الجاية.")}
    >
      <Link className="btn btn-amber" to="/explore">{t("Explore destinations", "استكشف الوجهات")}</Link>
    </CompanyHero>
    <div className="container company-wrap">
      <section className="company-story" aria-labelledby="our-story">
        <div>
          <p className="company-eyebrow">{t("Our story", "قصّتنا")}</p>
          <h2 id="our-story">{t("Make the journey yours", "خطّط لرحلة بتشبهك")}</h2>
          <p>{t("Sindibad brings Jordan’s destinations and guided tours together in one place. Start with the sandstone trails of Petra, the markets of Amman or the quiet of Wadi Rum, and build a journey around what interests you.", "سندباد بجمع وجهات الأردن ورحلاته مع المرشدين بمكان واحد. ابدأ من دروب البتراء، أو أسواق عمّان، أو هدوء وادي رم، وابنِ رحلتك حول الأماكن والتجارب اللي بتهمّك.")}</p>
          <p>{t("Each destination has its own story. We help you compare routes, understand the pace of a tour and plan time for the places you want to explore.", "لكل وجهة قصّتها. بنساعدك تقارن المسارات وتعرف طبيعة كل رحلة وتخصّص وقت للأماكن اللي حاب تستكشفها.")}</p>
        </div>
        <figure>
          <img src="/images/destinations/wadirum.jpg" alt={t("Sandstone mountain in Wadi Rum", "جبل من الحجر الرملي في وادي رم")} loading="lazy" />
          <figcaption><a href="https://commons.wikimedia.org/wiki/File:Mountain_in_Wadi_Rum,_Jordan.jpg">Daniel Case</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a></figcaption>
        </figure>
      </section>
      <section aria-labelledby="our-approach">
        <p className="company-eyebrow">{t("How we travel", "كيف بنسافر")}</p>
        <h2 id="our-approach">{t("Local knowledge, thoughtful routes", "معرفة محلية ومسارات مدروسة")}</h2>
        <div className="company-values">
          {[
            ["⌖", t("Local perspectives", "تجارب من أهل البلد"), t("Learn what makes each place distinctive, from its architecture to the stories shared along the way.", "تعرّف على خصوصية كل مكان، من عمارته لقصص أهله.")],
            ["◇", t("Travel at your pace", "سافر على راحتك"), t("Compare the duration, route and group size before choosing your tour.", "قارن المدة والمسار وحجم المجموعة قبل ما تختار رحلتك.")],
            ["✦", t("Respect for places", "احترام المكان"), t("Plan time for local communities, cultural sites and natural reserves.", "خلّي بخطتك وقت للمجتمعات المحلية والمواقع الثقافية والمحميات الطبيعية.")],
          ].map(([icon, title, description]) => <article className="card card-body" key={title}>
            <span className="company-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{description}</p>
          </article>)}
        </div>
      </section>
      <section className="company-cta">
        <h2>{t("Have a trip in mind?", "في رحلة ببالك؟")}</h2>
        <Link className="btn btn-amber" to="/contact">{t("Contact us", "تواصل معنا")}</Link>
      </section>
    </div>
  </main>;
}

const contact = {
  phone: "+962 7 0000 0000",
  email: "hello@sindibad.example",
  isPreview: true,
};


export function Contact() {
  const { isArabic } = useSettings();
  const t = (en, ar) => isArabic ? ar : en;
  const methods = [
    { icon: "☎", label: t("Phone", "الهاتف"), value: contact.phone, href: `tel:${contact.phone.replaceAll(" ", "")}` },
    { icon: "✉", label: t("Email", "البريد الإلكتروني"), value: contact.email, href: `mailto:${contact.email}` },
  ];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="company-page">
      <CompanyHero
        label={t("Sindibad Support", "دعم سندباد")}
        title={t("Contact us", "تواصل معنا")}
        description={t("Questions about a trip or booking? Get in touch with the Sindibad team.", "عندك سؤال عن رحلة أو حجز؟ تواصل مع فريق سندباد.")}
      />
      <div className="container company-wrap">
        <section className="company-contact" aria-labelledby="contact-title">
          <div className="company-contact-copy">
            <h2 id="contact-title">{t("Contact details", "معلومات التواصل")}</h2>
            <dl className="company-contact-methods">
              {methods.map(({ icon, label, value, href }) => (
                <div key={href}>
                  <span className="company-icon" aria-hidden="true">{icon}</span>
                  <div><dt>{label}</dt><dd>
                    {contact.isPreview ? <bdi dir="ltr">{value}</bdi> : <a href={href}><bdi dir="ltr">{value}</bdi></a>}
                  </dd></div>
                </div>
              ))}
            </dl>
          </div>
          <div className="company-contact-gallery">
            <img src="/images/wadirum.jpg" alt={t("Sandstone arch at sunset in Wadi Rum", "قوس صخري وقت الغروب في وادي رم")} />
            <img src="/images/petra.jpg" alt={t("Petra’s sandstone facade", "واجهة أثرية منحوتة في صخور البتراء")} loading="lazy" />
            <img src="/images/aqaba.jpg" alt={t("Boats on the Gulf of Aqaba at sunset", "قوارب على خليج العقبة وقت الغروب")} loading="lazy" />
          </div>
        </section>
      </div>
    </main>
  );
}

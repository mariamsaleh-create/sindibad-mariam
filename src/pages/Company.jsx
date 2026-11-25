import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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

const draftKey = "sindibad:contact-draft:v1";
const topics = ["trip", "booking", "general"];

function loadDraft() {
  try {
    const draft = JSON.parse(globalThis.localStorage?.getItem(draftKey) ?? "null");
    return draft && typeof draft === "object" ? draft : {};
  } catch {
    return {};
  }
}

export function Contact() {
  const { isArabic } = useSettings();
  const [params] = useSearchParams();
  const t = (en, ar) => isArabic ? ar : en;
  const [draft, setDraft] = useState(() => {
    const saved = loadDraft();
    const topic = params.get("topic");
    return {
      name: typeof saved.name === "string" ? saved.name : "",
      email: typeof saved.email === "string" ? saved.email : "",
      message: typeof saved.message === "string" ? saved.message : "",
      topic: topics.includes(topic) ? topic : topics.includes(saved.topic) ? saved.topic : "general",
    };
  });
  const [status, setStatus] = useState("");
  const labels = { trip: t("Trip planning", "تخطيط رحلة"), booking: t("Booking question", "استفسار عن حجز"), general: t("General inquiry", "استفسار عام") };

  function field(event) {
    const { name, value } = event.target;
    setDraft({ ...draft, [name]: value });
    setStatus("");
  }

  function save(event) {
    event.preventDefault();
    if (!draft.name.trim() || !draft.message.trim()) {
      setStatus("required");
      return;
    }
    try {
      globalThis.localStorage.setItem(draftKey, JSON.stringify({ ...draft, name: draft.name.trim(), email: draft.email.trim(), message: draft.message.trim() }));
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  return <main className="company-page">
    <CompanyHero
      label={t("Contact Sindibad", "تواصل مع سندباد")}
      title={t("How can we help?", "كيف بنقدر نساعدك؟")}
      description={t("Tell us what you’re planning or what you’d like to know about an existing booking.", "احكيلنا عن الرحلة اللي بتخطّط إلها، أو عن استفسارك بخصوص حجز.")}
    />
    <div className="container company-wrap company-contact">
      <aside className="card card-body company-contact-info">
        <p className="company-eyebrow">{t("Before you write", "قبل ما تكتب")}</p>
        <h2>{t("Find what you need", "لاقِ اللي بتدور عليه")}</h2>
        <ul>
          <li><Link to="/explore">{t("Browse destinations", "تصفّح الوجهات")} ↗</Link></li>
          <li><Link to="/tours">{t("Compare tours", "قارن الرحلات")} ↗</Link></li>
        </ul>
        <p>{t("For booking questions, include your booking reference if you have one.", "إذا استفسارك عن حجز، اكتب رقمه إذا كان متوفر عندك.")}</p>
      </aside>
      <form className="card card-body company-form" onSubmit={save}>
        <h2>{t("Write your message", "اكتب رسالتك")}</h2>
        <p>{t("You can save a draft in this browser. Message delivery is not connected yet.", "بتقدر تحفظ مسودة على هالمتصفح. إرسال الرسائل لسه مش مربوط.")}</p>
        <div className="company-form-row">
          <label>{t("Name", "الاسم")}<input name="name" autoComplete="name" maxLength={100} required value={draft.name} onChange={field} /></label>
          <label>{t("Email", "البريد الإلكتروني")}<input name="email" type="email" autoComplete="email" maxLength={254} required value={draft.email} onChange={field} /></label>
        </div>
        <label>{t("Topic", "الموضوع")}<select name="topic" value={draft.topic} onChange={field}>{topics.map((topic) => <option key={topic} value={topic}>{labels[topic]}</option>)}</select></label>
        <label>{t("Message", "الرسالة")}<textarea name="message" rows={5} maxLength={3000} required value={draft.message} onChange={field} /></label>
        <button className="btn btn-blue" type="submit">{t("Save draft", "احفظ المسودة")}</button>
        {status && <p role="status">{{
          saved: t("Draft saved in this browser.", "انحفظت المسودة على هالمتصفح."),
          required: t("Enter your name and message.", "اكتب اسمك ورسالتك."),
          error: t("The draft couldn’t be saved in this browser.", "تعذّر حفظ المسودة على هالمتصفح."),
        }[status]}</p>}
      </form>
    </div>
  </main>;
}

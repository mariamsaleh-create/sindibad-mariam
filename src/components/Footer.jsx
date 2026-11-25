import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";

const content = {
  en: {
    description:
      "Contemplative luxury expeditions across the Hashemite Kingdom of Jordan, led by local guides.",
    copyright:
      "© 2026 Sindibad Jordan Luxury Expeditions. All rights reserved.",
    cols: [
      {
        title: "Destinations",
        items: [
          "Petra Treasury",
          "Wadi Rum Monoliths",
          "Dead Sea Mineral Coast",
          "Jerash Decapolis",
          "Aqaba Red Sea Coral",
        ],
      },
      {
        title: "Concierge",
        items: [
          "Jordan Pass & Visas",
          "Private Chauffeurs",
          "Verified Guide Register",
          "Safety & Travel Protocol",
        ],
      },
      {
        title: "Company",
        items: [
          "Our Mission",
          "Sustainable Tourism",
          "Amman Headquarters",
          "Press & Journal",
          "Careers",
        ],
      },
    ],
  },

  ar: {
    description:
      "اكتشف أجمل ما في الأردن برحلات مصمّمة بعناية، ومرشدين من أهل البلد يشاركونك حكاياته وأسراره.",
    copyright: "© 2026 سندباد. جميع الحقوق محفوظة.",
    cols: [
      {
        title: "اكتشف الأردن",
        items: [
          "البتراء والخزنة",
          "وادي رم",
          "البحر الميت",
          "جرش الأثرية",
          "العقبة والبحر الأحمر",
        ],
      },
      {
        title: "خطّط لرحلتك",
        items: [
          "الأردن باس وتأشيرات الدخول",
          "التنقّل مع سائق خاص",
          "تعرّف على مرشدينا",
          "نصائح السفر والسلامة",
        ],
      },
      {
        title: "عن سندباد",
        items: [
          "قصتنا ورسالتنا",
          "السياحة المستدامة",
          "مكتبنا في عمّان",
          "أخبارنا ومقالاتنا",
          "انضم لفريقنا",
        ],
      },
    ],
  },
};

export default function Footer() {
  const { language, isArabic } = useSettings();
  const { description, copyright, cols } = content[language];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo">
              <img
                className="logo-light"
                src="/images/logo-light.png"
                alt={isArabic ? "سندباد" : "Sindibad"}
              />

              <img
                className="logo-dark"
                src="/images/logo-dark.png"
                alt={isArabic ? "سندباد" : "Sindibad"}
              />
            </div>

            <p>{description}</p>
          </div>

          {cols.map((column) => (
            <div key={column.title}>
              <h4>{column.title}</h4>

              <ul>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="copy">
          <p>{copyright}</p>
          <Link to="/about">{isArabic ? "عن سندباد" : "About Sindibad"}</Link>
          {" · "}
          <Link to="/contact">{isArabic ? "تواصل معنا" : "Contact Us"}</Link>
        </div>
      </div>
    </footer>
  );
}

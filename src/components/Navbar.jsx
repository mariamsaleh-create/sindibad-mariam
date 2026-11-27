import { Link, NavLink } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import UserMenu from "./UserMenu";
import SiteSettings from "./SiteSettings";

export default function Navbar() {
  const { isArabic } = useSettings();

  const links = [
    { id: "home", to: "/", label: isArabic ? "الرئيسية" : "Home" },
    {
      id: "destinations",
      to: "/explore",
      label: isArabic ? "الوجهات" : "Destinations",
    },
    {
      id: "tours",
      to: "/trips",
      label: isArabic ? "الجولات" : "Tours",
    },
    {
      id: "guides",
      to: "/#local-guides",
      label: isArabic ? "المرشدون السياحيون" : "Tour Guides",
    },
    {
      id: "about",
      to: "/about",
      label: isArabic ? "من نحن" : "About Us",
    },
  ];

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <img
            className="logo-light"
            src="/images/logo-light.png"
            alt="Sindibad"
          />
          <img
            className="logo-dark"
            src="/images/logo-dark.png"
            alt="Sindibad"
          />
        </Link>

        <nav
          className="nav-links"
          aria-label={isArabic ? "القائمة الرئيسية" : "Main navigation"}
        >
          {links.map((link) => (
            link.id === "guides" ? <Link key={link.id} to={link.to}>{link.label}</Link> : <NavLink key={link.id} to={link.to} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <SiteSettings />

          <UserMenu />

          <Link to="/trips" className="btn btn-amber">
            {isArabic ? "ابدأ رحلتك" : "Start Your Journey"}
          </Link>
        </div>
      </div>
    </header>
  );
}

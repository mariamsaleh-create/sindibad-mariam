import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { apiRequest, readAdminSession, writeAdminSession } from "../services/adminApi";
import "../pages/admin/Admin.css";
import "../pages/admin/AdminOperations.css";

const links = [
  ["/admin", "Overview", "▦"],
  ["/admin/trips", "Group Trips", "🗺️"],
  ["/admin/categories", "Trip Categories", "◈"],
  ["/admin/guides", "Guide Approvals", "🧭"],
  ["/admin/bookings", "Direct Guide Bookings", "🎫"],
];

function AdminSignIn({ onSignIn }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function signIn(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const data = await apiRequest("auth/login", { method: "POST", body: { email: fields.get("email").trim(), password: fields.get("password") } });
      if (data?.role?.toUpperCase() !== "ADMIN" || !data.token) throw new Error("Use an admin account from the backend.");
      onSignIn({ token: data.token, name: [data.user?.firstName, data.user?.lastName].filter(Boolean).join(" ") || fields.get("email") });
    } catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }

  return <main className="ad-main ad-content">
    <form className="ad-card ad-ops-section ad-api-login" onSubmit={signIn}>
      <h1>Admin sign in</h1>
      <p className="ad-muted">Use your Spring Boot admin account.</p>
      <label>Email<input type="email" name="email" autoComplete="username" required /></label>
      <label>Password<input type="password" name="password" autoComplete="current-password" required /></label>
      <button className="ad-btn" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      {error && <p role="alert">{error}</p>}
      <Link className="ad-link" to="/">Back to Sindibad</Link>
    </form>
  </main>;
}

export default function AdminLayout() {
  const [session, setSession] = useState(readAdminSession);
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  function updateSession(next) {
    writeAdminSession(next);
    setSession(next);
  }

  return <div className="ad-root" data-theme={dark ? "dark" : "light"} dir="ltr">
    {!session?.token ? <AdminSignIn onSignIn={updateSession} /> : <>
      <aside className={`ad-side ${open ? "open" : ""}`}>
        <Link to="/" className="ad-logo"><img src="/images/logo-dark.png" alt="Sindibad" /><small>JORDAN ADMIN</small></Link>
        <nav className="ad-nav" aria-label="Admin navigation">
          {links.map(([to, label, icon]) => <NavLink key={to} to={to} end={to === "/admin"} onClick={() => setOpen(false)}><span aria-hidden="true">{icon}</span>{label}</NavLink>)}
        </nav>
      </aside>
      <div className="ad-main">
        <header className="ad-top">
          <button className="ad-icon ad-menu" onClick={() => setOpen(!open)} aria-label="Toggle admin menu" aria-expanded={open}>☰</button>
          <strong>{session.name}</strong>
          <div className="ad-top-actions">
            <button className="ad-icon" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? "🌙" : "☀️"}</button>
            <button className="ad-ghost" onClick={() => updateSession(null)}>Sign out</button>
          </div>
        </header>
        <main className="ad-content"><Outlet context={{ token: session.token }} /></main>
      </div>
    </>}
  </div>;
}

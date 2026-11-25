import { Link } from "react-router-dom";
import { useAdminStatuses } from "../../data/useAdminStatuses";
import { useState } from "react";
import {
  kpis,
  months,
  bookingsSeries,
  revenueSeries,
  alerts,
  pendingGuides,
  revenueByDest,
  bookings,
} from "../../data/adminData";

const initials = (n) =>
  n
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

function Chart({ mode }) {
  const W = 600,
    H = 200,
    n = months.length,
    slot = W / n;
  const scale = (a) => {
    const m = Math.max(...a);
    return a.map((v) => H - (v / m) * (H - 24));
  };
  const b = scale(bookingsSeries),
    r = scale(revenueSeries);
  const path = (ys) =>
    ys.map((y, i) => `${i ? "L" : "M"}${(i * W) / (n - 1)},${y}`).join(" ");
  return (
    <svg
      viewBox={`0 0 ${W} ${H + 4}`}
      className="ad-chart"
      role="img"
      aria-label="Bookings and revenue by month"
    >
      {mode === "line" ? (
        <>
          <path
            d={`${path(b)} L${W},${H} L0,${H} Z`}
            fill="var(--blue)"
            opacity=".12"
          />
          <path d={path(b)} fill="none" stroke="var(--blue)" strokeWidth="3" />
          <path
            d={path(r)}
            fill="none"
            stroke="var(--amber)"
            strokeWidth="2.5"
            strokeDasharray="5 5"
          />
        </>
      ) : (
        months.map((m, i) => (
          <g key={m}>
            <rect
              x={i * slot + slot * 0.15}
              y={b[i]}
              width={slot * 0.3}
              height={H - b[i]}
              rx="3"
              fill="var(--blue)"
            />
            <rect
              x={i * slot + slot * 0.5}
              y={r[i]}
              width={slot * 0.3}
              height={H - r[i]}
              rx="3"
              fill="var(--amber)"
            />
          </g>
        ))
      )}
    </svg>
  );
}

export default function Overview() {
  const [range, setRange] = useState("Last 30 Days");
  const [mode, setMode] = useState("line");
  const { statuses } = useAdminStatuses("guide-review");
  const pending = pendingGuides.filter((guide) => !statuses[guide.id] || statuses[guide.id] === "Pending");
  const [page, setPage] = useState(1);

  return (
    <>
      <div className="ad-head">
        <div>
          <div className="ad-crumb">
            Home / <b>Overview</b>
          </div>
          <h1>Dashboard Overview</h1>
        </div>
        <div className="ad-top-actions">
          <div className="ad-seg">
            {["Last 30 Days", "This Month", "Year to Date"].map((r) => (
              <button
                key={r}
                className={r === range ? "on" : ""}
                onClick={() => setRange(r)}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="ad-btn">⭳ Export Summary Report</button>
        </div>
      </div>

      <div className="ad-kpis">
        {kpis.map((k) => (
          <div className="ad-card" key={k.label}>
            <div className="ad-kpi-top">
              <span>{k.label}</span>
              <span className={`ad-ico ${k.amber ? "amber" : ""}`}>
                {k.icon}
              </span>
            </div>
            <b className="ad-big">
              {k.value}
              {k.unit && <small>{k.unit}</small>}
            </b>
            <span className="ad-up">{k.note}</span>
          </div>
        ))}
      </div>

      <div className="ad-grid2">
        <div className="ad-card">
          <div className="ad-row">
            <h2>Bookings & Revenue Dynamics</h2>
            <div className="ad-seg">
              <button
                className={mode === "line" ? "on" : ""}
                onClick={() => setMode("line")}
              >
                Line
              </button>
              <button
                className={mode === "bar" ? "on" : ""}
                onClick={() => setMode("bar")}
              >
                Bar
              </button>
            </div>
          </div>
          <p className="ad-sub">
            Monthly trajectory cross-referenced with peak Jordanian tourism
            waves.
          </p>
          <Chart mode={mode} />
          <div className="ad-months">
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <div className="ad-legend">
            <span>
              <i style={{ background: "var(--blue)" }} /> Tour Bookings (Vol)
            </span>
            <span>
              <i style={{ background: "var(--amber)" }} /> Gross Revenue (JOD)
            </span>
          </div>
        </div>

        <div className="ad-card">
          <div className="ad-row">
            <h2>Operational Alerts</h2>
            <span className="ad-pill pending">3 Urgent</span>
          </div>
          <p className="ad-sub">Items that need your attention today.</p>
          {alerts.map((a) => (
            <div key={a.id} className={`ad-alert ${a.crit ? "crit" : ""}`}>
              <div className="ad-row">
                <b>{a.title}</b>
                <span className="ad-muted">{a.tag}</span>
              </div>
              {a.text}
            </div>
          ))}
          <div className="ad-row ad-foot">
            <span>Server Uptime & API sync</span>
            <span>● 99.98% OK</span>
          </div>
        </div>
      </div>

      <div className="ad-grid2 alt">
        <div className="ad-card">
          <div className="ad-row">
            <h2>Pending Guide Licensures</h2>
            <Link className="ad-link" to="/admin/guides">View All ({pending.length})</Link>
          </div>
          <p className="ad-sub">
            Review authentic Jordan Tourist Guide Association credentials.
          </p>
          {pending.length === 0 && (
            <p className="ad-muted">
              All applications reviewed. Nothing pending.
            </p>
          )}
          {pending.map((g) => (
            <div className="ad-guide" key={g.id}>
              <span
                className="ad-avatar"
                style={{ backgroundImage: `url(${g.img})` }}
              >
                {initials(g.name)}
              </span>
              <div className="grow">
                <strong>{g.name}</strong>{" "}
                <span className="ad-pill soft">Badge {g.badge}</span>
                <div className="ad-muted">{g.info}</div>
              </div>
              <Link className="ad-btn" to="/admin/guides">Review application</Link>
            </div>
          ))}
        </div>

        <div className="ad-card">
          <h2>Revenue by Destination</h2>
          <p className="ad-sub">Regional performance across active packages.</p>
          {revenueByDest.map((d) => (
            <div key={d.name}>
              <div className="ad-row">
                <span>{d.name}</span>
                <span className="ad-muted">
                  {d.pct}% ({d.jod} JOD)
                </span>
              </div>
              <div className="ad-bar">
                <i style={{ width: `${d.pct * 2}%`, background: d.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ad-card">
        <div className="ad-row">
          <h2>Recent Booking Dispatches</h2>
          <Link className="ad-link" to="/admin/bookings">View All Bookings</Link>
        </div>
        <p className="ad-sub">
          Sample bookings and traveler allocations.
        </p>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Traveler</th>
                <th>Tour / Expedition</th>
                <th>Date & Time</th>
                <th>Amount (JOD)</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="ad-id">{b.id}</td>
                  <td>
                    <div className="ad-guide-mini">
                      <span className="ad-avatar sm">{initials(b.name)}</span>
                      <div>
                        <strong>{b.name}</strong>
                        <div className="ad-muted">{b.who}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong>{b.tour}</strong>
                    <div className="ad-muted">{b.sub}</div>
                  </td>
                  <td>{b.date}</td>
                  <td>
                    <strong>{b.amount}</strong>
                  </td>
                  <td>
                    <span
                      className={`ad-pill ${b.status === "Paid" ? "paid" : "pending"}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td>👁 🧾</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ad-pager">
          <span>Showing 4 of 1,280 transactions</span>
          <div>
            <button onClick={() => setPage(Math.max(1, page - 1))}>
              ← Prev
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={p === page ? "on" : ""}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button onClick={() => setPage(Math.min(3, page + 1))}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

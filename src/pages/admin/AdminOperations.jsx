import { useState } from "react";
import { bookings, pendingGuides } from "../../data/adminData";
import { useAdminStatuses } from "../../data/useAdminStatuses";
import "./AdminOperations.css";

const guideStatuses = ["Pending", "Approved", "Rejected"];
const bookingStatuses = ["New", "In progress", "Confirmed", "Cancelled"];
const bookingStatusKey = "booking-follow-up";

function Status({ value }) {
  const tone = ["Approved", "Confirmed", "Paid"].includes(value) ? "paid"
    : ["Pending", "In progress"].includes(value) ? "pending" : "soft";
  return <span className={`ad-pill ${tone}`}>{value}</span>;
}

function Filters({ query, setQuery, filter, setFilter, options, placeholder }) {
  return (
    <div className="ad-ops-filters">
      <label>Search<input type="search" value={query} placeholder={placeholder} onChange={(event) => setQuery(event.target.value)} /></label>
      <label>Status
        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option value="">All statuses</option>
          {options.map((status) => <option key={status}>{status}</option>)}
        </select>
      </label>
    </div>
  );
}

export function GuideApprovals() {
  const { statuses, update, error } = useAdminStatuses("guide-review");
  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const applications = pendingGuides.map((guide) => ({ ...guide, status: statuses[guide.id] ?? "Pending" }));
  const shown = applications.filter((guide) => (!filter || guide.status === filter)
    && `${guide.name} ${guide.badge} ${guide.info}`.toLowerCase().includes(query.trim().toLowerCase()));

  function decide(guide, status) {
    if (update(guide.id, status)) setNotice(`${guide.name}: ${status}.`);
    else setNotice("");
  }

  return (
    <>
      <header className="ad-head"><div><p className="ad-crumb">Operations / Tour Guides</p><h1>Guide Approvals</h1></div></header>
      <p className="ad-sub">Review sample guide applications. Decisions are saved in this browser.</p>
      <section className="ad-card ad-ops-section" aria-labelledby="guide-applications">
        <h2 id="guide-applications">Guide applications</h2>
        <Filters query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} options={guideStatuses} placeholder="Name, badge or specialty" />
        {shown.length ? shown.map((guide) => (
          <article key={guide.id} className="ad-guide ad-ops-guide">
            <span className="ad-avatar" aria-hidden="true">{guide.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
            <div className="grow"><strong>{guide.name}</strong> <span className="ad-pill soft">Badge {guide.badge}</span><p className="ad-muted">{guide.info}</p></div>
            <Status value={guide.status} />
            <div className="ad-ops-actions" aria-label={`Actions for ${guide.name}`}>
              {guide.status === "Pending" ? <>
                <button className="ad-ghost" type="button" onClick={() => decide(guide, "Rejected")}>Reject</button>
                <button className="ad-btn" type="button" onClick={() => decide(guide, "Approved")}>Approve</button>
              </> : <button className="ad-ghost" type="button" onClick={() => decide(guide, "Pending")}>Reopen review</button>}
            </div>
          </article>
        )) : <p className="ad-muted">No guide applications match your filters.</p>}
        {error && <p role="alert">{error}</p>}
        {notice && <p className="ad-ops-notice" role="status">{notice}</p>}
      </section>
    </>
  );
}

export function BookingFollowUp() {
  const { statuses, update, error } = useAdminStatuses(bookingStatusKey);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [notice, setNotice] = useState("");
  const records = bookings.map((booking) => ({ ...booking, followUp: statuses[booking.id] ?? "New" }));
  const shown = records.filter((booking) => (!filter || booking.followUp === filter)
    && `${booking.id} ${booking.name} ${booking.tour}`.toLowerCase().includes(query.trim().toLowerCase()));

  function changeStatus(booking, status) {
    if (update(booking.id, status)) setNotice(`${booking.id}: ${status}.`);
    else setNotice("");
  }

  return (
    <>
      <header className="ad-head"><div><p className="ad-crumb">Operations / Bookings</p><h1>Booking Follow-up</h1></div></header>
      <p className="ad-sub">Track sample bookings. Follow-up changes are saved in this browser.</p>
      <section className="ad-card ad-ops-section" aria-labelledby="booking-records">
        <h2 id="booking-records">Booking records</h2>
        <Filters query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} options={bookingStatuses} placeholder="Booking ID, traveler or tour" />
        {shown.length ? <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr>{["Booking", "Traveler", "Tour", "Date & time", "Amount (JOD)", "Payment", "Follow-up"].map((label) => <th scope="col" key={label}>{label}</th>)}</tr></thead>
            <tbody>{shown.map((booking) => <tr key={booking.id}>
              <td className="ad-id">{booking.id}</td>
              <td><strong>{booking.name}</strong><p className="ad-muted">{booking.who}</p></td>
              <td><strong>{booking.tour}</strong><p className="ad-muted">{booking.sub}</p></td>
              <td>{booking.date}</td><td>{booking.amount}</td><td><Status value={booking.status} /></td>
              <td><select aria-label={`Follow-up status for ${booking.id}`} value={booking.followUp} onChange={(event) => changeStatus(booking, event.target.value)}>
                {bookingStatuses.map((status) => <option key={status}>{status}</option>)}
              </select></td>
            </tr>)}</tbody>
          </table>
        </div> : <p className="ad-muted">No bookings match your filters.</p>}
        {error && <p role="alert">{error}</p>}
        {notice && <p className="ad-ops-notice" role="status">{notice}</p>}
      </section>
    </>
  );
}

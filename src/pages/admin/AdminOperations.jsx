import { useState } from "react";
import { useAdminData } from "./useAdminData";
import "./AdminOperations.css";

function useOperation() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function run(action) {
    setBusy(true);
    setError("");
    try { await action(); }
    catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }
  return { busy, error, run };
}

function Heading({ title, source }) {
  return <header className="ad-head"><h1>{title}</h1><button className="ad-ghost" disabled={source.loading} onClick={source.reload}>Refresh</button></header>;
}

function Feedback({ source, operation, empty }) {
  return <>
    {source.loading && <p role="status">Loading…</p>}
    {source.error && <p role="alert">{source.error}</p>}
    {operation?.error && <p role="alert">{operation.error}</p>}
    {!source.loading && !source.error && !source.data?.length && <p>{empty}</p>}
  </>;
}

export function GuideApprovals() {
  const source = useAdminData("admin/guides/pending");
  const operation = useOperation();
  const [guideId, setGuideId] = useState("");

  function decide(guide, status) {
    void operation.run(async () => {
      await source.request(`admin/guides/${guide.guideId}/approval?status=${status}`, { method: "PUT" });
      source.reload();
    });
  }

  function suspend(event) {
    event.preventDefault();
    if (!window.confirm(`Suspend guide #${guideId}?`)) return;
    void operation.run(async () => {
      await source.request(`admin/guides/${guideId}`, { method: "DELETE" });
      setGuideId("");
      source.reload();
    });
  }

  return <>
    <Heading title="Guide Approvals" source={source} />
    <section className="ad-card ad-ops-section">
      <h2>Pending applications</h2>
      <Feedback source={source} operation={operation} empty="No pending applications." />
      {source.data?.map((guide) => <article className="ad-guide ad-ops-guide" key={guide.guideId}>
        <div className="grow">
          <strong>{guide.firstName} {guide.lastName} · #{guide.guideId}</strong>
          <p className="ad-muted">{guide.email} {guide.phoneNumber}</p>
          {guide.bio && <p>{guide.bio}</p>}
          <p className="ad-muted">{guide.experienceYears ?? "—"} years of experience · {guide.availableDays ?? "—"} {guide.startTime} {guide.endTime}</p>
        </div>
        <div className="ad-ops-actions">
          <button className="ad-ghost" disabled={operation.busy} onClick={() => decide(guide, "Rejected")}>Reject</button>
          <button className="ad-btn" disabled={operation.busy} onClick={() => decide(guide, "Approved")}>Approve</button>
        </div>
      </article>)}
    </section>
    <form className="ad-card ad-ops-section" onSubmit={suspend}>
      <h2>Suspend guide access</h2>
      <div className="ad-ops-filters">
        <label>Guide ID<input required type="number" min="1" value={guideId} onChange={(event) => setGuideId(event.target.value)} /></label>
        <button className="ad-ghost" disabled={operation.busy}>Suspend guide</button>
      </div>
    </form>
  </>;
}

export function BookingFollowUp() {
  const source = useAdminData("admin/bookings/guide-direct");
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const rows = source.data?.filter((booking) => [booking.bookingId, booking.touristName, booking.guideName, booking.bookingStatus].join(" ").toLowerCase().includes(needle)) ?? [];

  return <>
    <Heading title="Direct Guide Bookings" source={source} />
    <section className="ad-card ad-ops-section">
      <div className="ad-ops-filters"><label>Search bookings<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div>
      <Feedback source={source} empty="No direct guide bookings." />
      {!rows.length && !!source.data?.length && <p>No matching bookings.</p>}
      {!!rows.length && <div className="ad-table-wrap"><table className="ad-table">
        <thead><tr>{["ID", "Traveler", "Guide", "Date", "Guests", "Total", "Status"].map((label) => <th scope="col" key={label}>{label}</th>)}</tr></thead>
        <tbody>{rows.map((booking) => <tr key={booking.bookingId}>
          <td>#{booking.bookingId}</td><td>{booking.touristName}</td><td>{booking.guideName}</td>
          <td>{booking.bookingDate?.replace("T", " ")}</td><td>{booking.numberOfGuests}</td><td>{booking.totalPrice}</td><td>{booking.bookingStatus}</td>
        </tr>)}</tbody>
      </table></div>}
    </section>
  </>;
}

export function ManageCategories() {
  const source = useAdminData("categories");
  const operation = useOperation();
  const [draft, setDraft] = useState(null);

  function save(event) {
    event.preventDefault();
    const categoryName = draft.categoryName.trim();
    if (!categoryName) return;
    void operation.run(async () => {
      await source.request(draft.categoryId ? `admin/categories/${draft.categoryId}` : "admin/categories", {
        method: draft.categoryId ? "PUT" : "POST",
        body: { categoryName, description: draft.description?.trim() ?? "" },
      });
      setDraft(null);
      source.reload();
    });
  }

  return <>
    <Heading title="Trip Categories" source={source} />
    <section className="ad-card ad-ops-section">
      <button className="ad-btn" disabled={operation.busy} onClick={() => setDraft({ categoryName: "", description: "" })}>Add category</button>
      <Feedback source={source} operation={operation} empty="No categories." />
      {draft && <form className="ad-ops-filters" onSubmit={save}>
        <label>Name<input required value={draft.categoryName} onChange={(event) => setDraft({ ...draft, categoryName: event.target.value })} /></label>
        <label>Description<input value={draft.description ?? ""} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></label>
        <button className="ad-btn" disabled={operation.busy}>Save category</button>
        <button type="button" className="ad-ghost" disabled={operation.busy} onClick={() => setDraft(null)}>Cancel</button>
      </form>}
      {source.data?.map((category) => <article key={category.categoryId} className="ad-guide ad-ops-guide">
        <div className="grow"><strong>{category.categoryName}</strong><p className="ad-muted">{category.description}</p></div>
        <div className="ad-ops-actions">
          <button className="ad-ghost" disabled={operation.busy} onClick={() => setDraft(category)}>Edit</button>
          <button className="ad-ghost" disabled={operation.busy} onClick={() => {
            if (window.confirm(`Delete "${category.categoryName}"?`)) void operation.run(async () => {
              await source.request(`admin/categories/${category.categoryId}`, { method: "DELETE" });
              setDraft((current) => current?.categoryId === category.categoryId ? null : current);
              source.reload();
            });
          }}>Delete</button>
        </div>
      </article>)}
    </section>
  </>;
}

import { useState } from "react";
import { useAdminData } from "./useAdminData";
import "./ManageTrips.css";

const blank = { guideId: "", categoryId: "", title: "", description: "", startDate: "", endDate: "", maxParticipants: "", pricePerPerson: "" };
const fields = [
  ["title", "Title", "text"],
  ["guideId", "Approved guide ID", "number"],
  ["startDate", "Start date", "datetime-local"],
  ["endDate", "End date", "datetime-local"],
  ["maxParticipants", "Maximum participants", "number"],
  ["pricePerPerson", "Price per person", "number"],
];

export default function ManageTrips() {
  const { data, error, loading, request, reload } = useAdminData("admin/trips");
  const categories = useAdminData("categories");
  const [draft, setDraft] = useState(null);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [errorAction, setErrorAction] = useState("");
  const [busy, setBusy] = useState(false);
  const shown = (data ?? []).filter((trip) => `${trip.title} ${trip.guideName ?? ""} ${trip.categoryName ?? ""}`.toLowerCase().includes(query.trim().toLowerCase()));

  function edit(trip) {
    setMessage("");
    setErrorAction("");
    setDraft(trip ? {
      ...trip,
      startDate: trip.startDate?.slice(0, 16) ?? "",
      endDate: trip.endDate?.slice(0, 16) ?? "",
    } : { ...blank });
  }

  async function act(task, success) {
    setBusy(true);
    setErrorAction("");
    setMessage("");
    try {
      await task();
      reload();
      setMessage(success);
    } catch (error) {
      setErrorAction(error.message);
    } finally {
      setBusy(false);
    }
  }

  function save(event) {
    event.preventDefault();
    if (draft.endDate <= draft.startDate) {
      setErrorAction("End date must be after the start date.");
      return;
    }
    const body = {
      title: draft.title.trim(), description: draft.description.trim(),
      guideId: Number(draft.guideId), categoryId: Number(draft.categoryId),
      startDate: draft.startDate, endDate: draft.endDate,
      maxParticipants: Number(draft.maxParticipants), pricePerPerson: Number(draft.pricePerPerson),
      tripImageUrl: draft.tripImageUrl ?? null,
    };
    void act(async () => {
      await request(draft.tripId ? `admin/trips/${draft.tripId}` : "admin/trips", { method: draft.tripId ? "PUT" : "POST", body });
      setDraft(null);
    }, "Trip saved.");
  }

  function upload(event, tripId) {
    const image = event.currentTarget.files[0];
    event.currentTarget.value = "";
    if (!image) return;
    const body = new FormData();
    body.append("image", image);
    void act(async () => {
      const updated = await request(`admin/trips/${tripId}/image`, { method: "POST", body });
      setDraft((current) => current?.tripId === tripId ? { ...current, tripImageUrl: updated.tripImageUrl } : current);
    }, "Trip image uploaded.");
  }

  return <>
    <header className="ad-head"><h1>Manage Trips</h1><button className="ad-btn" disabled={busy} onClick={() => edit(null)}>Add trip</button></header>
    {errorAction && <p className="ad-trips-error" role="alert">{errorAction}</p>}
    {message && <p role="status">{message}</p>}
    {draft && <form className="ad-card ad-trips-form" onSubmit={save}>
      <h2>{draft.tripId ? "Edit trip" : "New trip"}</h2>
      <div className="ad-trips-fields">
        {fields.map(([name, label, type]) => <label key={name}>{label}
          <input required type={type} value={draft[name]} onChange={(event) => setDraft({ ...draft, [name]: event.target.value })}
            maxLength={name === "title" ? 200 : undefined}
            min={type === "number" ? name === "pricePerPerson" ? "0.01" : "1" : undefined}
            step={name === "pricePerPerson" ? "0.01" : undefined} />
        </label>)}
        <label>Category<select required value={draft.categoryId} onChange={(event) => setDraft({ ...draft, categoryId: event.target.value })}>
          <option value="">Select category</option>
          {(categories.data ?? []).map((category) => <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>)}
        </select></label>
      </div>
      {categories.error && <p role="alert">{categories.error}</p>}
      <label>Description<textarea required value={draft.description} rows={4} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></label>
      <div className="ad-trips-actions">
        <button className="ad-btn" type="submit" disabled={busy || categories.loading}>Save trip</button>
        <button className="ad-ghost" type="button" disabled={busy} onClick={() => setDraft(null)}>Cancel</button>
      </div>
    </form>}
    <section className="ad-card">
      <div className="ad-trips-toolbar">
        <h2>Trip catalog</h2>
        <label className="ad-trips-search">Search trips<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <button className="ad-ghost" onClick={reload} disabled={loading || busy}>Refresh</button>
      </div>
      {loading && <p role="status">Loading trips…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && !shown.length && <p>No matching trips.</p>}
      {shown.length > 0 && <div className="ad-table-wrap"><table className="ad-table">
        <thead><tr>{["Trip", "Start / End", "Price per person", "Capacity", "Status", "Actions"].map((label) => <th scope="col" key={label}>{label}</th>)}</tr></thead>
        <tbody>{shown.map((trip) => <tr key={trip.tripId}>
          <td><strong>{trip.title}</strong><p className="ad-muted">{trip.categoryName} · {trip.guideName}</p></td>
          <td>{trip.startDate?.replace("T", " ")}<br />{trip.endDate?.replace("T", " ")}</td>
          <td>{trip.pricePerPerson}</td><td>{trip.maxParticipants}</td><td>{trip.tripStatus}</td>
          <td><div className="ad-trips-actions">
            <button className="ad-ghost" disabled={busy} onClick={() => edit(trip)}>Edit</button>
            <label className="ad-trip-upload">Upload image<input type="file" accept="image/*" disabled={busy} onChange={(event) => upload(event, trip.tripId)} /></label>
            <button className="ad-ghost" disabled={busy} onClick={() => {
              if (window.confirm(`Delete "${trip.title}"?`)) void act(async () => {
                await request(`admin/trips/${trip.tripId}`, { method: "DELETE" });
                setDraft((current) => current?.tripId === trip.tripId ? null : current);
              }, "Trip deleted.");
            }}>Delete</button>
          </div></td>
        </tr>)}</tbody>
      </table></div>}
    </section>
  </>;
}

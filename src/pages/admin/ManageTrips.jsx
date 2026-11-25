import { useState } from "react";
import { Link } from "react-router-dom";
import { territories } from "../../data/exploreData";
import { getTours, saveTours } from "../../data/tourCatalog";
import "./ManageTrips.css";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const emptyTour = { title: "", category: "", days: "", price: "", maxTravelers: "", stops: "", description: "", destinations: [] };

export default function ManageTrips() {
  const [catalog, setCatalog] = useState(getTours);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const search = query.trim().toLowerCase();
  const shown = catalog.filter((tour) => `${tour.title} ${tour.stops}`.toLowerCase().includes(search));

  function openEditor(tour) {
    setError("");
    setNotice("");
    setDraft(tour);
  }

  function persist(next, message) {
    try {
      saveTours(next);
      setCatalog(next);
      setDraft(null);
      setError("");
      setNotice(message);
    } catch {
      setError("Changes could not be saved in this browser.");
    }
  }

  function save(event) {
    event.preventDefault();
    if (!draft.destinations.length || !["title", "category", "days", "stops"].every((key) => draft[key].trim())) {
      setError("Complete the required fields and select at least one destination.");
      return;
    }

    const { featuredDestination, ...fields } = draft;
    const tour = {
      ...fields,
      id: fields.id ?? globalThis.crypto.randomUUID(),
      title: fields.title.trim(),
      category: fields.category.trim(),
      days: fields.days.trim(),
      stops: fields.stops.trim(),
      price: Number(fields.price),
      maxTravelers: fields.maxTravelers ? Number(fields.maxTravelers) : undefined,
      featuredDestination: fields.destinations.includes(featuredDestination)
        ? featuredDestination
        : fields.destinations[0],
    };
    persist(draft.id ? catalog.map((item) => item.id === draft.id ? tour : item) : [...catalog, tour], "Tour saved.");
  }

  function remove(tour) {
    if (window.confirm(`Remove “${tour.title}” from the tour catalog?`)) {
      persist(catalog.filter((item) => item.id !== tour.id), "Tour removed.");
    }
  }

  return (
    <>
      <header className="ad-head">
        <div><p className="ad-crumb">Operations / Tours</p><h1>Manage Tours</h1></div>
        <button type="button" className="ad-btn" onClick={() => openEditor({ ...emptyTour })}>+ Add tour</button>
      </header>
      <p className="ad-trips-hint ad-muted">Changes are saved in this browser and appear in the public tour catalog on this device.</p>
      {notice && <p className="ad-trips-hint" role="status">{notice}</p>}
      {error && <p className="ad-trips-error" role="alert">{error}</p>}

      {draft && <form className="ad-card ad-trips-form" key={draft.id ?? "new"} onSubmit={save}>
        <h2>{draft.id ? "Edit tour" : "New tour"}</h2>
        <div className="ad-trips-fields">
          {[
            ["title", "Tour title"], ["category", "Category"], ["days", "Duration"],
            ["price", "Price per person (USD)", "number", "0.01"],
            ["maxTravelers", "Maximum travelers", "number", "1"], ["stops", "Route and stops"],
          ].map(([name, label, type = "text", minimum]) => (
            <label key={name}>{label}
              <input
                autoFocus={name === "title"}
                type={type}
                min={minimum}
                step={name === "price" ? "0.01" : undefined}
                required={name !== "maxTravelers"}
                value={draft[name] ?? ""}
                onChange={(event) => setDraft({ ...draft, [name]: event.target.value })}
              />
            </label>
          ))}
        </div>
        <label>Short description
          <textarea rows={3} value={draft.description ?? ""} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
        </label>
        <fieldset>
          <legend>Destinations</legend>
          <div className="ad-trips-destinations">
            {territories.map((destination) => (
              <label key={destination.id}>
                <input
                  type="checkbox"
                  checked={draft.destinations.includes(destination.id)}
                  onChange={(event) => setDraft({
                    ...draft,
                    destinations: event.target.checked
                      ? [...draft.destinations, destination.id]
                      : draft.destinations.filter((id) => id !== destination.id),
                  })}
                />
                {destination.name}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="ad-trips-actions">
          <button className="ad-btn" type="submit">Save tour</button>
          <button className="ad-ghost" type="button" onClick={() => openEditor(null)}>Cancel</button>
        </div>
      </form>}

      <section className="ad-card" aria-labelledby="tour-list-title">
        <div className="ad-trips-toolbar">
          <div><h2 id="tour-list-title">Tour catalog</h2><p className="ad-muted">{shown.length} of {catalog.length} tours</p></div>
          <label className="ad-trips-search">Search tours<input type="search" placeholder="Tour name or route" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        </div>
        {shown.length ? <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr><th scope="col">Tour</th><th scope="col">Duration</th><th scope="col">Price</th><th scope="col">Group size</th><th scope="col">Actions</th></tr></thead>
            <tbody>{shown.map((tour) => (
              <tr key={tour.id}>
                <td><strong>{tour.title}</strong><p className="ad-muted">{tour.stops}</p></td>
                <td>{tour.days}</td><td>{currency.format(tour.price)}</td><td>{tour.maxTravelers ?? "—"}</td>
                <td><div className="ad-trips-actions">
                  <Link className="ad-link" to={`/tours/${tour.id}`}>View</Link>
                  <button type="button" className="ad-ghost" onClick={() => openEditor(tour)}>Edit</button>
                  <button type="button" className="ad-ghost" onClick={() => remove(tour)}>Remove</button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        </div> : <p className="ad-muted ad-trips-hint">No tours match your search.</p>}
      </section>
    </>
  );
}

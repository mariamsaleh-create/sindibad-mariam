import { Link } from "react-router-dom";
import { useAdminData } from "./useAdminData";

const metrics = [
  ["totalPersons", "Total users"], ["totalTourists", "Tourists"],
  ["totalGuides", "Total guides"], ["pendingGuideApprovals", "Pending guide approvals"],
  ["totalTrips", "Trips"], ["totalBookings", "Bookings"], ["totalAdminEarnings", "Admin earnings"],
];
const number = new Intl.NumberFormat();

export default function Overview() {
  const { data, error, loading, reload } = useAdminData("admin/dashboard/stats");
  return <>
    <header className="ad-head"><h1>Dashboard Overview</h1><button className="ad-ghost" onClick={reload} disabled={loading}>Refresh</button></header>
    {loading && <p role="status">Loading statistics…</p>}
    {error && <p role="alert">{error}</p>}
    {data && <div className="ad-kpis">
      {metrics.map(([field, label]) => (
        <div key={field} className="ad-card">
          <h2>{label}</h2><p className="ad-big">{data[field] == null ? "—" : number.format(data[field])}</p>
        </div>
      ))}
    </div>}
    <div className="ad-card ad-ops-section">
      <h2>Operations</h2>
      <div className="ad-ops-actions">
        <Link className="ad-link" to="/admin/trips">Manage trips</Link>
        <Link className="ad-link" to="/admin/categories">Manage categories</Link>
        <Link className="ad-link" to="/admin/guides">Review guide applications</Link>
        <Link className="ad-link" to="/admin/bookings">View direct guide bookings</Link>
      </div>
    </div>
  </>;
}

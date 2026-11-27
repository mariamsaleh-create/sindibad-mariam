import { Routes, Route, Outlet } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/AdminLayout";

import Home from "./pages/Home";
import Trips from "./pages/Trips";
import BackendTripDetails from "./pages/BackendTripDetails";
import { About, Contact } from "./pages/Company";
import Explore from "./pages/Explore";
import DestinationDetails from "./pages/DestinationDetails";
import Tours, { TourDetails } from "./pages/Tours";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Overview from "./pages/admin/Overview";
import ManageTrips from "./pages/admin/ManageTrips";
import { BookingFollowUp, GuideApprovals, ManageCategories } from "./pages/admin/AdminOperations";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:destinationId" element={<DestinationDetails />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trips/:tripId" element={<BackendTripDetails />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:tourId" element={<TourDetails />} />
          <Route path="/checkout/:tripId" element={<Checkout />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="trips" element={<ManageTrips />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="guides" element={<GuideApprovals />} />
          <Route path="bookings" element={<BookingFollowUp />} />
          <Route path="*" element={<p>Coming soon</p>} />
        </Route>
      </Routes>
    </SettingsProvider>
  );
}

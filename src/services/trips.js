export async function getTrips({ signal, keyword } = {}) {
  const path = keyword ? `/api/trips/search?${new URLSearchParams({ keyword })}` : "/api/trips";
  const response = await fetch(path, { signal });

  if (!response.ok) {
    throw new Error(`Failed to load trips (${response.status})`);
  }

  const trips = await response.json();

  if (!Array.isArray(trips)) {
    throw new Error("Expected a list of trips");
  }

  return trips;
}

 
export async function getTrip(id, { signal } = {}) {
  const response = await fetch(`/api/trips/${encodeURIComponent(id)}`, { signal });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to load trip (${response.status})`);
  const trip = await response.json();
  if (trip?.tripId == null) throw new Error("Expected trip details");
  return trip;
}

// Arabic copy for the seeded demo trip. Other trips use translations from the API when available.
export function localizeTrip(trip, language) {
  if (!trip || language !== "ar") return trip;

  const isDemo = trip.title === "Wadi Rum Stargazing (Demo)" &&
    trip.guideName === "Demo Guide";

  return {
    ...trip,
    title: trip.titleAr?.trim() || (isDemo ? "ليلة تحت نجوم وادي رم (رحلة تجريبية)" : trip.title),
    description: trip.descriptionAr?.trim() || (isDemo ? "أمسية في وادي رم لمشاهدة النجوم والاستمتاع بهدوء الصحراء." : trip.description),
    guideName: trip.guideNameAr?.trim() || (isDemo ? "مرشد تجريبي" : trip.guideName),
  };
}

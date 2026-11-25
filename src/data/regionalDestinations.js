import { territories } from "./exploreData";
import { destinationPhotoCredits } from "./destinationPhotoCredits";

const destinationProfiles = {
  "wadi-rum": {
    shortName: "Wadi Rum", governorate: "Aqaba Governorate",
    heading: "Sandstone Valleys Under Open Skies", season: "Oct–Apr", stay: "1–2 days",
    difficulty: "Moderate", bestFor: "Desert scenery and stargazing",
    arrival: "Wadi Rum Visitor Centre",
    pack: "Bring warm layers for evenings and sun protection for the day.",
    access: "Ask your camp about vehicle access and walking distances.",
    nearby: ["petra","aqaba","dana"], guideIds: [1],
    stops: [
      ["Khazali Canyon","Walk into a narrow sandstone cleft."],
      ["Red Dunes","Pause above the valley for wide desert views."],
      ["Bedouin Camp","End the route with tea under the open sky."],
    ],
    expedition: { id: 8, title: "Wadi Rum Dunes & Bedouin Camp", price: 120, maxTravelers: 8 },
  },
  "dead-sea": {
    shortName: "Dead Sea", governorate: "Balqa Governorate",
    heading: "A Quiet Day on the Salt Coast", season: "Mar–May & Sep–Nov", stay: "1 day",
    difficulty: "Easy", bestFor: "Wellness and scenic escapes",
    arrival: "Dead Sea resort coast",
    pack: "Pack swimwear, water and sandals.",
    access: "Confirm beach access and facilities with the chosen resort.",
    nearby: ["wadi-mujib","bethany","mount-nebo"],
    stops: [
      ["Resort Beach","Enjoy a slow morning by the water."],
      ["Dead Sea Float","Visit a designated bathing area."],
      ["Coastal Terrace","Spend the afternoon overlooking the shoreline."],
    ],
    expedition: { id: 9, title: "Dead Sea Salt Coast Retreat", price: 85, maxTravelers: 8 },
  },
  "jerash": {
    shortName: "Jerash", governorate: "Jerash Governorate",
    heading: "A Roman City in the Northern Hills", season: "Mar–May & Sep–Nov", stay: "Half day–1 day",
    difficulty: "Easy to moderate", bestFor: "Roman history and architecture",
    arrival: "Jerash Visitor Centre",
    pack: "Bring walking shoes, water and a hat.",
    access: "Expect cobbled paths and stairs at some monuments.",
    nearby: ["ajloun","umm-qais","amman"], guideIds: [2],
    stops: [
      ["Hadrian’s Arch","Enter through the monumental southern gateway."],
      ["Oval Plaza","Cross the colonnaded public square."],
      ["South Theatre","Explore the stone auditorium with your guide."],
    ],
    expedition: { id: 10, title: "Jerash Colonnades & Roman Theatre", price: 75, maxTravelers: 10 },
  },
  "aqaba": {
    shortName: "Aqaba", governorate: "Aqaba Governorate",
    heading: "Where the Mountains Meet the Reef", season: "Mar–May & Sep–Nov", stay: "1–2 days",
    difficulty: "Easy to moderate", bestFor: "Marine life and coastal escapes",
    arrival: "Aqaba waterfront",
    pack: "Bring swimwear, sun protection and a towel.",
    access: "Check vessel access and swimming requirements with the operator.",
    nearby: ["wadi-rum","petra","dana"], guideIds: [3],
    stops: [
      ["Aqaba Waterfront","Begin with views of the gulf and its mountain backdrop."],
      ["South Beach","Explore the reef from a suitable designated site."],
      ["Old Town","Finish with a stroll near the market and waterfront."],
    ],
    expedition: { id: 11, title: "Aqaba Reef & Waterfront Discovery", price: 110, maxTravelers: 8 },
  },
  "amman": {
    shortName: "Amman", governorate: "Amman Governorate",
    heading: "From the Citadel to Downtown", season: "Mar–May & Sep–Nov", stay: "1–2 days",
    difficulty: "Moderate", bestFor: "History, food and city walks",
    arrival: "Amman Citadel",
    pack: "Wear comfortable shoes for hills and uneven sidewalks.",
    access: "Ask for a vehicle transfer between the Citadel and downtown if needed.",
    nearby: ["jerash","madaba","mount-nebo"],
    stops: [
      ["Amman Citadel","Take in the city’s hills from Jabal Al-Qal’a."],
      ["Roman Theatre","Explore the auditorium below the Citadel."],
      ["Downtown Souks","Finish among market stalls and cafés."],
    ],
    expedition: { id: 12, title: "Amman Citadel & Downtown Walk", price: 70, maxTravelers: 10 },
  },
  "wadi-mujib": {
    shortName: "Wadi Mujib", governorate: "Dead Sea corridor",
    heading: "Between the Walls of the Gorge", season: "During authorized trail openings", stay: "1 day",
    difficulty: "Challenging", bestFor: "Canyons and active travelers",
    arrival: "Mujib Adventure Center",
    pack: "Bring footwear suitable for getting wet and check equipment requirements with the operator.",
    access: "Wet trails have fitness, age and access requirements. Confirm conditions before departure.",
    nearby: ["dead-sea","karak","mount-nebo"], guideIds: [3],
    stops: [
      ["Mujib Adventure Center","Meet your guide for the conditions and eligibility briefing."],
      ["Approved Canyon Trail","Follow an open trail selected for local conditions."],
      ["Dead Sea Viewpoint","End the outing with views across the coast."],
    ],
    expedition: { id: 13, title: "Wadi Mujib Guided Canyon Outing", price: 90, maxTravelers: 6 },
  },
  "dana": {
    shortName: "Dana", governorate: "Tafilah Governorate",
    heading: "From Stone Village to Rift Valley", season: "Mar–May & Sep–Nov", stay: "1–2 days",
    difficulty: "Moderate", bestFor: "Hiking and nature photography",
    arrival: "Dana village",
    pack: "Pack sturdy shoes, layers and drinking water.",
    access: "Confirm trail length and elevation with your guide.",
    nearby: ["petra","karak","wadi-rum"],
    stops: [
      ["Dana Village","Walk through the stone lanes above the valley."],
      ["Rift Viewpoint","Stop for wide views into the reserve."],
      ["Guided Nature Trail","Follow a route matched to conditions and walking ability."],
    ],
    expedition: { id: 14, title: "Dana Village & Rift Valley Hike", price: 100, maxTravelers: 8 },
  },
  "madaba": {
    shortName: "Madaba", governorate: "Madaba Governorate",
    heading: "Stories in Byzantine Stone", season: "Mar–May & Sep–Nov", stay: "Half day–1 day",
    difficulty: "Easy", bestFor: "Mosaics and cultural history",
    arrival: "Madaba city centre",
    pack: "Bring comfortable shoes and clothes suitable for church visits.",
    access: "Confirm access to individual churches and archaeological sites.",
    nearby: ["mount-nebo","bethany","amman"],
    stops: [
      ["St. George’s Church","Visit the mosaic map when the church is open."],
      ["Madaba Archaeological Park","Look for the detail in preserved mosaic floors."],
      ["Old Town","Browse nearby mosaic workshops."],
    ],
    expedition: { id: 15, title: "Madaba Mosaic Map & Old Town", price: 65, maxTravelers: 10 },
  },
  "mount-nebo": {
    shortName: "Mount Nebo", governorate: "Madaba Governorate",
    heading: "A Hilltop Above the Jordan Valley", season: "Mar–May & Sep–Nov", stay: "Half day",
    difficulty: "Easy", bestFor: "Pilgrimage, mosaics and views",
    arrival: "Mount Nebo memorial site",
    pack: "Bring a light layer for the exposed ridge.",
    access: "Ask the visitor centre about accessible routes on the hilltop.",
    nearby: ["madaba","bethany","dead-sea"],
    stops: [
      ["Memorial Church","Explore the church and its mosaics when open."],
      ["Hilltop Terrace","Look out over the Jordan Valley in clear weather."],
      ["Madaba Highlands","Take a short scenic stop on the return route."],
    ],
    expedition: { id: 16, title: "Mount Nebo Mosaics & Valley Views", price: 60, maxTravelers: 10 },
  },
  "ajloun": {
    shortName: "Ajloun", governorate: "Ajloun Governorate",
    heading: "Forest Trails and a Hilltop Fortress", season: "Mar–May & Sep–Nov", stay: "1 day",
    difficulty: "Moderate", bestFor: "Forest walks and medieval history",
    arrival: "Ajloun Castle",
    pack: "Pack walking shoes and a layer for the highlands.",
    access: "Castle passages include steps; ask about a gentler forest route.",
    nearby: ["jerash","umm-qais","amman"],
    stops: [
      ["Ajloun Castle","Explore a fortress built above the surrounding hills."],
      ["Forest Reserve","Walk a route chosen for local conditions."],
      ["Highland Viewpoint","Pause above oak-covered slopes."],
    ],
    expedition: { id: 17, title: "Ajloun Castle & Forest Walk", price: 70, maxTravelers: 8 },
  },
  "karak": {
    shortName: "Karak", governorate: "Karak Governorate",
    heading: "Vaulted Passages on the King’s Highway", season: "Mar–May & Sep–Nov", stay: "Half day–1 day",
    difficulty: "Moderate", bestFor: "Medieval history and viewpoints",
    arrival: "Karak Castle",
    pack: "Wear sturdy shoes for uneven stone and pack a light layer.",
    access: "Check access to stepped and enclosed passages on arrival.",
    nearby: ["dana","wadi-mujib","petra"],
    stops: [
      ["Karak Castle","Enter the fortress above the town."],
      ["Vaulted Halls","Explore the accessible stone passages with your guide."],
      ["King’s Highway View","Look across the ridges from an outdoor terrace."],
    ],
    expedition: { id: 18, title: "Karak Castle & King’s Highway Heritage", price: 75, maxTravelers: 10 },
  },
  "umm-qais": {
    shortName: "Umm Qais", governorate: "Irbid Governorate",
    heading: "Basalt Streets Above the Valley", season: "Mar–May & Sep–Nov", stay: "Half day–1 day",
    difficulty: "Moderate", bestFor: "Archaeology and panoramic views",
    arrival: "Umm Qais archaeological site",
    pack: "Bring shoes with grip for basalt paving.",
    access: "Some paths are uneven; ask your guide to plan a shorter route.",
    nearby: ["ajloun","jerash","amman"],
    stops: [
      ["Gadara Ruins","Walk the streets of the ancient city."],
      ["West Theatre","Explore the dark basalt auditorium."],
      ["Lookout Terrace","Take in the valley and lake views when visibility permits."],
    ],
    expedition: { id: 19, title: "Umm Qais Gadara & Valley Outlook", price: 60, maxTravelers: 8 },
  },
  "bethany": {
    shortName: "Bethany Beyond the Jordan", governorate: "Balqa Governorate",
    heading: "A Pilgrimage Along the Jordan River", season: "Oct–Apr", stay: "Half day",
    difficulty: "Easy", bestFor: "Pilgrimage and cultural history",
    arrival: "Bethany Beyond the Jordan visitor centre",
    pack: "Bring water, modest clothing and shade protection.",
    access: "Confirm current visitor arrangements and path access before travel.",
    nearby: ["mount-nebo","madaba","dead-sea"],
    stops: [
      ["Visitor Centre","Begin with an orientation to the archaeological site."],
      ["Baptism Site","Follow the authorized route to the historic pilgrimage area."],
      ["Jordan River","Pause at the river overlook on the guided route."],
    ],
    expedition: { id: 20, title: "Bethany Baptism Site & Jordan River", price: 60, maxTravelers: 10 },
  },
};

export const regionalDetails = Object.fromEntries(
  Object.entries(destinationProfiles).map(([id, profile]) => {
    const { shortName, governorate, heading, season, stay, difficulty, bestFor, nearby, guideIds, stops, arrival, pack, access } = profile;
    const destination = territories.find((item) => item.id === id);

    return [id, {
      shortName, governorate, heading, season, stay, difficulty, bestFor, nearby, guideIds,
      highlights: stops.map(([name, copy], index) => [["◇", "⌖", "✦"][index], name, copy]),
      itinerary: stops.map(([name, copy]) => [name, copy, destination.categories]),
      itineraryLabel: "Itinerary Preview",
      itineraryStep: "Stop",
      included: ["Local guiding at the listed stops", "Route briefing for the selected experience"],
      excluded: ["Admission, equipment and transfers unless specified", "Meals and personal expenses unless specified"],
      visit: [
        ["Best season", season],
        ["What to pack", pack],
        ["Getting there", `Start at ${arrival}.`],
        ["Accessibility", access],
      ],
      mapDestination: arrival,
      photos: [{ label: shortName, src: destination.img, ...destinationPhotoCredits[destination.img] }],
    }];
  }),
);

export const regionalTours = Object.entries(destinationProfiles).map(([id, profile]) => {
  const destination = territories.find((item) => item.id === id);

  return {
    ...profile.expedition,
    category: destination.categories[0],
    days: profile.stay === "Half day" ? "Half Day" : "1 Day",
    stops: profile.stops.map(([name]) => name).join(" → "),
    description: `A guided route through ${profile.shortName}, with time to explore ${profile.stops[1][0]}.`,
    date: "Sample itinerary",
    seats: "Preview",
    img: destination.img,
    destinations: [id],
    featuredDestination: id,
  };
});

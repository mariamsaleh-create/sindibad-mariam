export const categories = [
  "All Territories",
  "Historical & Ruins",
  "Desert & Adventure",
  "Nature & Wildlife",
  "Wellness & Relaxation",
  "Culture & City Life",
  "Marine & Diving",
];

export const regions = ["All", "North", "Central", "South"];

export const sortOptions = [
  "Most Popular",
  "Price: Low to High",
  "Price: High to Low",
];

export const trustItems = [
  { icon: "★", text: "4.97 Traveler Rating (2,400+ verified journeys)" },
  { icon: "🛡️", text: "100% Authentic Bedouin & Local Immersion" },
  { icon: "✔", text: "Certified Jordanian Desert & Heritage Guides" },
];

export const spotlight = {
  id: "petra",
  label: "Editor's Spotlight",
  title: "Petra — The Rose City",
  tag: "UNESCO World Wonder",
  location: "Ma'an Governorate, Southern Rift",
  caption: "The Siq & The Treasury (Al-Khazneh)",
  era: "Nabataean Capital • 312 BCE",
  rating: "4.99 (840 reviews)",
  heading: "Carved Rose-Red Majesty",
  text: "Hand-carved directly into vibrant rose sandstone cliffs over two millennia ago. Walk the whispering Siq canyon, ascend to the high places of sacrifice, and wander quiet candlelit evenings before the Treasury facade.",
  facts: [
    { label: "Best Season", value: "Mar–May, Sep–Nov" },
    { label: "Expedition", value: "2 to 3 Days" },
    { label: "Key Anchors", value: "Ad-Deir Monastery" },
  ],
  price: 95,
  img: "/images/destinations/petra.jpg",
};

// الترتيب = الأكثر شعبية. أول اثنين بيطلعوا كبار.
export const territories = [
  { id: "petra", tag: "UNESCO World Wonder", location: "Ma'an", name: "Petra — The Rose City", text: "Rose-red Nabataean canyons, candlelit treasury evenings and secret high places.", price: 95, cta: "Explore Itineraries", region: "South", categories: ["Historical & Ruins"], img: "/images/destinations/petra.jpg" },
  { id: "wadi-rum", tag: "Protected Wilderness", location: "Aqaba", name: "Wadi Rum — Valley of the Moon", text: "Martian red dunes, towering sandstone monoliths and Bedouin fireside feasts.", price: 120, cta: "View Expeditions", region: "South", categories: ["Desert & Adventure", "Nature & Wildlife"], img: "/images/destinations/wadirum.jpg" },
  { id: "dead-sea", tag: "Wellness Oasis", location: "Balqa", name: "The Dead Sea Coast", text: "Mineral waters 430m below sea level, healing mud treatments and luxurious spa retreats.", price: 85, region: "Central", categories: ["Wellness & Relaxation"], img: "/images/destinations/deadsea.jpg" },
  { id: "jerash", tag: "Imperial Antiquity", location: "Jerash", name: "Jerash — Greco-Roman Epic", text: "Roman theaters, colonnaded streets and an intact Oval Forum.", price: 75, region: "North", categories: ["Historical & Ruins"], img: "/images/destinations/jerash.jpg" },
  { id: "aqaba", tag: "Marine Heritage", location: "Aqaba", name: "Aqaba — Red Sea Coral Coast", text: "Pristine coral reefs, bespoke sailing yachts and fresh seafood.", price: 110, region: "South", categories: ["Marine & Diving"], img: "/images/destinations/aqaba.jpg" },
  { id: "amman", tag: "Culture & City Life", location: "Amman", name: "Amman — The Living Capital", text: "Seven hills of old souks, the Roman Theater, rooftop cafés and Jordan's modern art scene.", price: 70, region: "Central", categories: ["Culture & City Life", "Historical & Ruins"], img: "/images/destinations/amman.jpg" },
  { id: "wadi-mujib", tag: "Canyon Adventure", location: "Madaba", name: "Wadi Mujib — Canyon Reserve", text: "The Grand Canyon of Jordan: freshwater gorges, waterfall climbs and rope descents.", price: 90, region: "Central", categories: ["Desert & Adventure", "Nature & Wildlife"], img: "/images/destinations/wadimujib.jpg" },
  { id: "dana", tag: "Nature & Trekking", location: "Tafilah", name: "Dana Biosphere Reserve", text: "Sandstone cliffs, juniper trails and a stone village perched above the Rift Valley.", price: 100, region: "South", categories: ["Nature & Wildlife"], img: "/images/destinations/dana.jpg" },
  { id: "madaba", tag: "Byzantine Heritage", location: "Madaba", name: "Madaba — City of Mosaics", text: "Sixth-century church floors, including the famous Holy Land map in St. George's.", price: 65, region: "Central", categories: ["Historical & Ruins", "Culture & City Life"], img: "/images/destinations/madaba.jpg" },
  { id: "mount-nebo", tag: "Sacred Landscape", location: "Madaba", name: "Mount Nebo — Mosaic Summit", text: "Panoramic views over the Jordan Valley and the Dead Sea from the Moses memorial.", price: 60, region: "Central", categories: ["Historical & Ruins", "Nature & Wildlife"], img: "/images/destinations/nebo.jpg" },
  { id: "ajloun", tag: "Highland Nature", location: "Ajloun", name: "Ajloun — Castle in the Forest", text: "12th-century Ayyubid fortress above oak and pine forests with sweeping valley views.", price: 70, region: "North", categories: ["Historical & Ruins", "Nature & Wildlife"], img: "/images/destinations/ajloun.jpg" },
  { id: "karak", tag: "Crusader History", location: "Karak", name: "Karak — Crusader Fortress", text: "Massive medieval castle with underground halls and a sweeping King's Highway view.", price: 75, region: "South", categories: ["Historical & Ruins"], img: "/images/destinations/karak.jpg" },
  { id: "umm-qais", tag: "Northern Heritage", location: "Irbid", name: "Umm Qais — Gadara Overlook", text: "Black basalt ruins overlooking the Sea of Galilee and the Golan Heights.", price: 60, region: "North", categories: ["Historical & Ruins", "Culture & City Life"], img: "/images/destinations/umm-qais.jpg" },
  { id: "bethany", tag: "Pilgrimage Site", location: "Balqa", name: "Bethany Beyond the Jordan", text: "Archaeological baptism site along the Jordan River, a UNESCO World Heritage pilgrimage place.", price: 60, region: "Central", categories: ["Historical & Ruins"], img: "/images/destinations/bethany.jpg" },
];

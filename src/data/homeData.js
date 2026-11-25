export const destinations = [
  {
    id: 1,
    large: true,
    tag: "UNESCO World Wonder",
    name: "Petra — The Rose City",
    text: "Rose-red Nabataean canyons, candlelit treasury evenings and secret high places.",
    price: 95,
    cta: "Explore Itineraries",
    img: "/images/petra.jpg",
  },
  {
    id: 2,
    large: true,
    tag: "Protected Wilderness",
    name: "Wadi Rum — Valley of the Moon",
    text: "Martian red dunes, towering sandstone monoliths and Bedouin fireside feasts.",
    price: 120,
    cta: "View Expeditions",
    img: "/images/wadirum.jpg",
  },
  {
    id: 3,
    tag: "Wellness Oasis",
    name: "The Dead Sea Coast",
    text: "Mineral waters 430m below sea level and healing mud treatments.",
    price: 85,
    img: "/images/deadsea.jpg",
  },
  {
    id: 4,
    tag: "Imperial Antiquity",
    name: "Jerash — Greco-Roman Epic",
    text: "Roman theaters, colonnaded streets and an intact Oval Forum.",
    price: 75,
    img: "/images/jerash.jpg",
  },
  {
    id: 5,
    tag: "Marine Heritage",
    name: "Aqaba — Red Sea Coral Coast",
    text: "Pristine coral reefs, bespoke sailing yachts and fresh seafood.",
    price: 110,
    img: "/images/aqaba.jpg",
  },
];

export const categories = [
  "All Trips",
  "Desert Adventure",
  "Archaeology & Ruins",
  "Bedouin Living",
  "Culinary & Wellness",
];

export const trips = [
  {
    id: 2,
    date: "Nov 03 – 05",
    seats: "6 Seats Left",
    price: 320,
    days: "3 Days",
    rating: "4.95 (84)",
    title: "Wadi Rum Star-Gazing & 4x4 Camel Nomad Expedition",
    stops: "Wadi Rum Camp → Burdah Arch → Sunset Dunes",
    guide: "Tariq Al-Majali",
    role: "Bedouin Tribe Native",
    category: "Desert Adventure",
    img: "/images/trip2.jpg",
  },
  {
    id: 3,
    date: "Nov 18 – 21",
    seats: "Instant Confirm",
    price: 680,
    days: "4 Days",
    rating: "4.98 (92)",
    title: "Petra by Night & The Hidden Backdoor Canyon Traverse",
    stops: "Petra → Little Petra → Monastery Trail",
    guide: "Layla Haddad",
    role: "Licensed Archaeologist",
    category: "Bedouin Living",
    img: "/images/trip3.jpg",
  },
];

export const guides = [
  {
    id: 1,
    name: "Tariq Al-Majali",
    role: "Bedouin Native Guide",
    rating: "4.99",
    reviews: "214 verified treks",
    quote:
      "I was born under the shadow of Jebel Rum. For 14 years I have explored the silent monoliths with my guests.",
    tags: ["Wadi Rum Monoliths", "Desert Stargazing"],
    langs: "Arabic (Native), English (Fluent), French",
    rate: 160,
    img: "/images/guide1.jpg",
  },
  {
    id: 2,
    name: "Layla Haddad",
    role: "Archaeology & History",
    rating: "4.98",
    reviews: "189 reviews",
    quote:
      "Former field excavator with the Department of Antiquities. I unlock the Nabataean water hydraulics.",
    tags: ["Petra Backdoor Trek", "Jerash Roman Epics"],
    langs: "Arabic, English (C2), Spanish (B2)",
    rate: 180,
    img: "/images/guide2.jpg",
  },
  {
    id: 3,
    name: "Zaid Qasem",
    role: "Canyon Ranger & Diver",
    rating: "4.97",
    reviews: "142 treks",
    quote:
      "Jordan's wilderness is wild water and sheer sandstone. I guarantee safe, exhilarating adventures.",
    tags: ["Wadi Mujib Canyoneering", "Aqaba Coral Reefs"],
    langs: "Arabic, English, German",
    rate: 150,
    img: "/images/guide3.jpg",
  },
];

export const features = [
  {
    icon: "🛡️",
    title: "100% Verified Guides",
    text: "Every guide holds active licensing from Jordan's Ministry of Tourism and Antiquities.",
  },
  {
    icon: "🏺",
    title: "Authentic Culture & Access",
    text: "Privileged access to Bedouin family tent encampments and private after-hours archaeological visits.",
  },
  {
    icon: "🔒",
    title: "Escrow-Backed Booking",
    text: "Funds stay safely held until day of departure, with flexible weather and cancellation buffers.",
  },
  {
    icon: "👥",
    title: "Strict 10-Guest Maximum",
    text: "Small departures mean meaningful conversations and agile movement.",
  },
  {
    icon: "🥘",
    title: "Bespoke Pacing & Diet",
    text: "Personalized route pacing, vegan or halal dietary options, and 4x4 desert transport for every leg.",
  },
  {
    icon: "☎️",
    title: "24/7 Amman Concierge",
    text: "Our Amman headquarters dispatch desk provides round-the-clock assistance on the ground.",
  },
];

export const reviews = [
  {
    id: 1,
    text: "Entering Petra through the Backdoor from Little Petra with Layla felt like stepping into an 18th-century explorer\u2019s journal.",
    name: "Claire Montgomery",
    place: "London, UK • Petra Backdoor Traverse",
  },
  {
    id: 2,
    text: "Wadi Rum under the stars with Tariq was genuinely spiritual. The earth-baked Zarab chicken stayed with us.",
    name: "Marcus & Elena Vance",
    place: "Zurich, Switzerland • Wadi Rum",
  },
  {
    id: 3,
    text: "Flawless logistics. From private airport greeting in Amman to the Red Sea resort, Sindibad is the gold standard for Jordan.",
    name: "David Chen",
    place: "San Francisco, USA • 10-Day Grand Kingdom",
  },
];

const destinationsAr = [
  {
    id: 1,
    tag: "إحدى عجائب الدنيا السبع الجديدة",
    name: "البتراء — المدينة الوردية",
    text: "امشِ بين جبالها الوردية، واكتشف حكايات الأنباط، وعِش سحر الخزنة على ضوء الشموع.",
    cta: "اكتشف رحلات البتراء",
  },
  {
    id: 2,
    tag: "طبيعة محمية",
    name: "وادي رم — وادي القمر",
    text: "مغامرة بين الرمال الحمراء والجبال الشاهقة، تنتهي بجلسة حول النار وضيافة بدوية أصيلة.",
    cta: "اكتشف رحلات وادي رم",
  },
  {
    id: 3,
    tag: "راحة واستجمام",
    name: "البحر الميت",
    text: "خذ استراحة عند أخفض بقعة على اليابسة، واستمتع بالمياه الغنية بالمعادن والطين الطبيعي.",
  },
  {
    id: 4,
    tag: "رحلة عبر التاريخ",
    name: "جرش — حكاية مدينة رومانية",
    text: "تجوّل بين الأعمدة والمسارح والساحات الأثرية، واكتشف تفاصيل الحياة في جرش القديمة.",
  },
  {
    id: 5,
    tag: "بحر ومغامرات",
    name: "العقبة — بوابتك للبحر الأحمر",
    text: "اكتشف الشعاب المرجانية، واستمتع برحلة إبحار ووجبة بحرية طازجة على الساحل.",
  },
];

export const categoryLabelsAr = {
  "All Trips": "كل الرحلات",
  "Desert Adventure": "مغامرات الصحراء",
  "Archaeology & Ruins": "تاريخ وآثار",
  "Bedouin Living": "تجارب بدوية",
  "Culinary & Wellness": "مذاق واسترخاء",
};

const tripsAr = [
  {
    id: 1,
    date: "14–21 أكتوبر",
    seats: "باقي 4 مقاعد",
    days: "7 أيام",
    title: "اكتشف الأردن: من آثار عمّان إلى شواطئ العقبة",
    stops: "عمّان ← جرش ← البتراء ← وادي رم ← البحر الميت",
    guide: "يوسف العليمات",
    role: "مرشد خبير معتمد",
  },
  {
    id: 2,
    date: "3–5 نوفمبر",
    seats: "باقي 6 مقاعد",
    days: "3 أيام",
    title: "ليالي وادي رم: نجوم ومغامرات وركوب جمال",
    stops: "مخيم وادي رم ← قوس بردة ← كثبان الغروب",
    guide: "طارق المجالي",
    role: "مرشد من أهل وادي رم",
  },
  {
    id: 3,
    date: "18–21 نوفمبر",
    seats: "حجز بتأكيد فوري",
    days: "4 أيام",
    title: "البتراء على ضوء الشموع ومغامرة المسار الخلفي",
    stops: "البتراء ← البتراء الصغيرة ← مسار الدير",
    guide: "ليلى حداد",
    role: "متخصصة آثار مرخّصة",
  },
];

const guidesAr = [
  {
    id: 1,
    name: "طارق المجالي",
    role: "مرشد من أهل وادي رم",
    reviews: "214 رحلة موثّقة",
    quote:
      "وُلدت عند سفح جبل رم. ومنذ 14 عامًا، أرافق ضيوفي بين جباله وأشاركهم حكايات المكان الذي أعرفه منذ طفولتي.",
    tags: ["استكشاف وادي رم", "رصد النجوم"],
    langs: "العربية (اللغة الأم)، الإنجليزية بطلاقة، الفرنسية",
  },
  {
    id: 2,
    name: "ليلى حداد",
    role: "متخصصة في الآثار والتاريخ",
    reviews: "189 تقييمًا",
    quote:
      "عملت في التنقيب مع دائرة الآثار، وأحب أن أشارك ضيوفي كيف بنى الأنباط أنظمة مياه مذهلة، وما الذي تخبرنا به عن حياتهم.",
    tags: ["مسار البتراء الخلفي", "آثار جرش"],
    langs: "العربية، الإنجليزية (C2)، الإسبانية (B2)",
  },
  {
    id: 3,
    name: "زيد قاسم",
    role: "مرشد مغامرات وغواص",
    reviews: "142 رحلة",
    quote:
      "أجمل مغامرات الأردن تجمع بين مياه الأودية وجبال الحجر الرملي. أرافقكم لاكتشافها بأمان والاستمتاع بكل لحظة.",
    tags: ["مغامرات وادي الموجب", "شعاب العقبة المرجانية"],
    langs: "العربية، الإنجليزية، الألمانية",
  },
];

const featuresAr = [
  {
    title: "مرشدون مرخّصون ومعتمدون",
    text: "يحمل كل مرشد ترخيصًا ساريًا من وزارة السياحة والآثار الأردنية، لتستكشف الأردن برفقة أهل الخبرة.",
  },
  {
    title: "عِش التجربة مع أهل البلد",
    text: "تعرّف على الحياة البدوية عن قرب، واستمتع بزيارات خاصة للمواقع الأثرية خارج أوقات الدوام.",
  },
  {
    title: "احجز براحة بال",
    text: "يبقى مبلغ حجزك محفوظًا حتى يوم الانطلاق، مع مرونة في حالات تغيّر الطقس والإلغاء.",
  },
  {
    title: "مجموعات لا تتجاوز 10 مسافرين",
    text: "عدد أقل، ووقت أكثر للاستكشاف والتعارف، وتنقّل أسهل طوال الرحلة.",
  },
  {
    title: "رحلة تناسبك",
    text: "وتيرة تناسب راحتك، وخيارات طعام نباتي أو حلال، وتنقّل بسيارات الدفع الرباعي في الصحراء.",
  },
  {
    title: "معك على مدار الساعة",
    text: "فريقنا في عمّان جاهز لمساعدتك أثناء رحلتك، في أي وقت تحتاجنا فيه.",
  },
];

const reviewsAr = [
  {
    id: 1,
    text: "دخلنا البتراء من المسار الخلفي عبر البتراء الصغيرة مع ليلى. شعرت وكأنني مستكشفة أراها للمرة الأولى!",
    name: "كلير مونتغمري",
    place: "لندن، المملكة المتحدة • مسار البتراء الخلفي",
  },
  {
    id: 2,
    text: "ليلة تحت نجوم وادي رم مع طارق كانت تجربة لا تُنسى. وطعم دجاج الزرب المطهو تحت الأرض ما زال في بالنا!",
    name: "ماركوس وإيلينا فانس",
    place: "زيورخ، سويسرا • وادي رم",
  },
  {
    id: 3,
    text: "كل شيء كان مرتّبًا بإتقان، من استقبالنا في مطار عمّان إلى إقامتنا على البحر الأحمر. سندباد جعلت رحلتنا في الأردن مميزة.",
    name: "ديفيد تشين",
    place: "سان فرانسيسكو، الولايات المتحدة • رحلة الأردن في 10 أيام",
  },
];

function mergeById(original, translated) {
  return original.map((item) => ({
    ...item,
    ...translated.find((translation) => translation.id === item.id),
  }));
}

export function getHomeData(language) {
  if (language !== "ar") {
    return {
      destinations,
      categories,
      trips,
      guides,
      features,
      reviews,
    };
  }

  return {
    destinations: mergeById(destinations, destinationsAr),
    categories,
    trips: mergeById(trips, tripsAr),
    guides: mergeById(guides, guidesAr),

    features: features.map((feature, index) => ({
      ...feature,
      ...featuresAr[index],
    })),

    reviews: mergeById(reviews, reviewsAr),
  };
}

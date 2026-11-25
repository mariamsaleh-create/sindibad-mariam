import { useSettings } from "./SettingsContext";

const arabicDestinations = {
  "petra": { name: "البتراء — المدينة الوردية", location: "معان", tag: "أعجوبة عالمية", text: "مرّي عبر السيق إلى مدينة الأنباط المنحوتة في الصخر الوردي." },
  "wadi-rum": { name: "وادي رم — وادي القمر", location: "العقبة", tag: "محمية طبيعية", text: "كثبان حمراء وجبال من الحجر الرملي وأمسيات تحت النجوم." },
  "dead-sea": { name: "ساحل البحر الميت", location: "البلقاء", tag: "وجهة للاسترخاء", text: "مياه غنية بالأملاح وشواطئ هادئة للاستجمام على الساحل." },
  "jerash": { name: "جرش — المدينة الرومانية", location: "جرش", tag: "آثار رومانية", text: "اكتشفي المسارح الرومانية والشوارع المعمّدة والساحة البيضاوية." },
  "aqaba": { name: "العقبة — ساحل البحر الأحمر", location: "العقبة", tag: "تراث بحري", text: "شعاب مرجانية وشواطئ على البحر الأحمر وجولات على الواجهة البحرية." },
  "amman": { name: "عمّان — العاصمة النابضة", location: "عمّان", tag: "ثقافة وحياة المدينة", text: "من جبل القلعة والمدرّج الروماني إلى أسواق وسط البلد ومقاهيه." },
  "wadi-mujib": { name: "وادي الموجب — محمية الأخدود", location: "مادبا", tag: "مغامرات الأودية", text: "أخاديد صخرية وممرات مائية في المحمية المطلة على البحر الميت." },
  "dana": { name: "محمية ضانا للمحيط الحيوي", location: "الطفيلة", tag: "طبيعة ومسارات", text: "قرية حجرية ومسارات طبيعية تطلّ على وادي ضانا." },
  "madaba": { name: "مادبا — مدينة الفسيفساء", location: "مادبا", tag: "تراث بيزنطي", text: "شاهدي أرضيات الفسيفساء وخريطة الأراضي المقدّسة في كنيسة القديس جورج." },
  "mount-nebo": { name: "جبل نيبو", location: "مادبا", tag: "موقع ديني", text: "إطلالات على وادي الأردن والبحر الميت وفسيفساء تاريخية على القمّة." },
  "ajloun": { name: "عجلون — القلعة والغابات", location: "عجلون", tag: "طبيعة جبلية", text: "قلعة أيوبية فوق التلال ومسارات بين أشجار السنديان والصنوبر." },
  "karak": { name: "الكرك — القلعة التاريخية", location: "الكرك", tag: "تاريخ العصور الوسطى", text: "استكشفي أروقة القلعة الحجرية وإطلالاتها على طريق الملوك." },
  "umm-qais": { name: "أم قيس — إطلالة جدارا", location: "إربد", tag: "تراث شمال الأردن", text: "آثار من البازلت الأسود وإطلالات على بحيرة طبريا ووادي الأردن." },
  "bethany": { name: "المغطس — بيت عنيا عبر الأردن", location: "البلقاء", tag: "موقع للحج", text: "موقع أثري وديني على ضفاف نهر الأردن مدرج على قائمة التراث العالمي." },
};

const arabicTerms = {
  North: "شمال الأردن",
  Central: "وسط الأردن",
  South: "جنوب الأردن",
  "Historical & Ruins": "تاريخ وآثار",
  "Desert & Adventure": "صحراء ومغامرات",
  "Nature & Wildlife": "طبيعة وحياة برية",
  "Wellness & Relaxation": "استجمام وراحة",
  "Culture & City Life": "ثقافة وحياة المدينة",
  "Marine & Diving": "بحر وغوص",
  "Most Popular": "الأكثر رواجاً",
  "Price: Low to High": "السعر من الأقل للأعلى",
  "Price: High to Low": "السعر من الأعلى للأقل",
};

const usdFallback = {
  en: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", currencyDisplay: "code" }),
  ar: new Intl.NumberFormat("ar-JO", { style: "currency", currency: "USD", currencyDisplay: "code" }),
};

export function useDestinationSettings() {
  const { isArabic, language, formatMoney } = useSettings();

  return {
    isArabic,
    text: (ar, en) => isArabic ? ar : en,
    term: (value) => (isArabic ? arabicTerms[value] : null) ?? value,
    number: (value) => new Intl.NumberFormat(isArabic ? "ar-JO" : "en-US").format(value),
    destinationText: (destination) => isArabic ? arabicDestinations[destination.id] ?? destination : destination,
    price: (amount) => formatMoney(amount) ?? usdFallback[language].format(amount),
  };
}

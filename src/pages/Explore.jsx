import { useState } from "react";
import { categories, regions, sortOptions, territories } from "../data/exploreData";
import { useDestinationSettings } from "../context/useDestinationSettings";
import DestinationCard from "../components/explore/DestinationCard";
import "./Explore.css";

const [allCategories] = categories;
const [allRegions] = regions;
const [defaultSort] = sortOptions;

export default function Explore() {
  const { text, term, number, destinationText } = useDestinationSettings();
  const [category, setCategory] = useState(allCategories);
  const [region, setRegion] = useState(allRegions);
  const [sort, setSort] = useState(defaultSort);
  const [query, setQuery] = useState("");

  const searchTerm = query.trim().normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
  const results = territories.filter((destination) => {
    const localized = destinationText(destination);
    const searchable = [destination.name, destination.location, destination.region, localized.name, localized.location, term(destination.region)].join(" ").normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
    return (
      (category === allCategories || destination.categories.includes(category)) &&
      (region === allRegions || destination.region === region) &&
      searchable.includes(searchTerm)
    );
  });

  if (sort === sortOptions[1]) results.sort((a, b) => a.price - b.price);
  if (sort === sortOptions[2]) results.sort((a, b) => b.price - a.price);

  const showFeatured = category === allCategories && region === allRegions &&
    sort === defaultSort && !searchTerm;

  function resetFilters() {
    setCategory(allCategories);
    setRegion(allRegions);
    setSort(defaultSort);
    setQuery("");
  }

  return (
    <main className="ex-directory">
      <header className="ex-intro">
        <div className="container ex-intro-layout">
          <div>
            <p className="ex-eyebrow">{text("وجهات الأردن", "Destinations in Jordan")}</p>
            <h1>{text("وين بدك تروح بالأردن؟", "Where to in Jordan?")}</h1>
            <p className="ex-lead">
              {text("اكتشف المدن القديمة والأودية الصحراوية والوجهات الساحلية في الأردن.", "Browse ancient cities, desert valleys and coastal escapes across Jordan.")}
            </p>
          </div>
          <fieldset className="ex-regions">
            <legend>{text("تصفّح حسب المنطقة", "Browse by region")}</legend>
            <div className="ex-region-buttons">
              {regions.map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={region === item}
                  onClick={() => setRegion(item)}
                >
                  {item === allRegions ? text("كل الأردن", "All Jordan") : term(item)}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </header>

      <div className="container ex-directory-layout">
        <aside className="ex-sidebar" aria-label={text("فلاتر الوجهات", "Destination filters")}>
          <label className="ex-search">
            <span>{text("ابحث عن وجهة", "Search destinations")}</span>
            <input
              type="search"
              placeholder={text("جرّب البتراء أو العقبة", "Try Petra or Aqaba")}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <fieldset className="ex-categories">
            <legend>{text("نوع التجربة", "Type of experience")}</legend>
            {categories.map((item) => (
              <label key={item}>
                <input
                  type="radio"
                  name="destination-category"
                  checked={category === item}
                  onChange={() => setCategory(item)}
                />
                {item === allCategories ? text("كل التجارب", "All experiences") : term(item)}
              </label>
            ))}
          </fieldset>
          <button className="ex-reset" type="button" onClick={resetFilters}>
            {text("إعادة ضبط الفلاتر", "Reset filters")}
          </button>
        </aside>

        <section className="ex-results" aria-labelledby="ex-results-title">
          <div className="ex-results-header">
            <div>
              <h2 id="ex-results-title">{text("اختَر وجهتك التالية", "Find your next stop")}</h2>
              <p role="status">{number(results.length)} {text("من","of")} {number(territories.length)} {text("وجهة","destinations")}</p>
            </div>
            <label className="ex-sort">
              {text("رتّب حسب", "Sort by")}
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                {sortOptions.map((option) => <option key={option} value={option}>{term(option)}</option>)}
              </select>
            </label>
          </div>

          {results.length ? (
            <ul className={showFeatured ? "ex-grid ex-grid-featured" : "ex-grid"}>
              {results.map((destination) => (
                <li key={destination.id}>
                  <DestinationCard d={destination} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="ex-empty">{text("ما في وجهات بتطابق بحثك. جرّب منطقة أو نوع تجربة مختلف.", "No destinations match your filters. Try another region, experience, or search.")}</p>
          )}
        </section>
      </div>
    </main>
  );
}

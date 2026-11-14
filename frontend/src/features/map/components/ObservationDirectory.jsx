
import { useState } from "react";

export default function ObservationDirectory({
  observations,
  selected,
  onSelect,
}) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  const regions = [
    "All",
    ...new Set(observations.map((o) => o.region)),
  ];

  const filtered = observations.filter((o) => {
    const matchesSearch =
      `${o.name} ${o.region} ${o.product}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRegion =
      region === "All" || o.region === region;

    return matchesSearch && matchesRegion;
  });

  return (
    <section className="data-section">
      <h3>Observation Directory</h3>

      <input
        className="data-input"
        type="search"
        placeholder="Search observations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="data-input"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        {regions.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <div className="observation-list">
        {filtered.map((o) => (
          <button
            key={o.id}
            type="button"
            className={
              "observation-card " +
              (selected?.id === o.id ? "active" : "")
            }
            onClick={() => onSelect(o)}
          >
            <strong>{o.name}</strong>
            <span>{o.date} · {o.product}</span>
            <small>{o.id}</small>
          </button>
        ))}

        {filtered.length === 0 && (
          <p>No matching observations.</p>
        )}
      </div>
    </section>
  );
}

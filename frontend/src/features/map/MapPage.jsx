
import { useEffect, useState } from "react";
import MapViewer from "./components/MapViewer.jsx";
import DateSlider from "./components/DateSlider.jsx";
import DataPanel from "./components/DataPanel.jsx";
import ObservationComparison from "./components/ObservationComparison.jsx";
import useObservations from "./hooks/useObservations.js";
import "./MapPage.css";

export default function MapPage() {
  const { observations, loading, error, source } =
    useObservations();

  const [selectedRegion, setSelectedRegion] = useState("Bukidnon");
  const [beforeId, setBeforeId] = useState("");
  const [afterId, setAfterId] = useState("");

  const regionObservations = observations.filter(
    (observation) => observation.region === selectedRegion
  );

  useEffect(() => {
    const available = observations
      .filter((observation) => observation.region === selectedRegion)
      .sort((a, b) => a.date.localeCompare(b.date));

    setBeforeId(available[0]?.id ?? "");
    setAfterId(available[1]?.id ?? "");
  }, [selectedRegion, observations]);

  const beforeObservation = regionObservations.find(
    (observation) => observation.id === beforeId
  );

  const afterObservation = regionObservations.find(
    (observation) => observation.id === afterId
  );

  return (
    <section className="scarcast-map-page">
      <MapViewer onRegionSelect={setSelectedRegion} />

      <div aria-live="polite">
        {loading && <p>Loading satellite observations...</p>}

        {error && (
          <p role="alert">
            Unable to load observations: {error}
          </p>
        )}

        {!loading && !error && (
          <p>
            Data source:{" "}
            {source === "demo"
              ? "Demo observations"
              : "Connected observation API"}
          </p>
        )}
      </div>

      <div className="scarcast-map-bottom">
        <div className="scarcast-visualization">
          <DateSlider />

          <ObservationComparison
            beforeObservation={beforeObservation}
            afterObservation={afterObservation}
          />
        </div>

        <DataPanel
          observations={observations}
          selectedRegion={selectedRegion}
          beforeId={beforeId}
          afterId={afterId}
          onBeforeChange={setBeforeId}
          onAfterChange={setAfterId}
        />
      </div>
    </section>
  );
}


import { useState } from "react";
import MapViewer from "./components/MapViewer.jsx";
import DateSlider from "./components/DateSlider.jsx";
import DataPanel from "./components/DataPanel.jsx";
import ObservationComparison from "./components/ObservationComparison.jsx";
import { mockObservations } from "./data/mockObservations.js";
import "./MapPage.css";

export default function MapPage() {
  const [selectedRegion, setSelectedRegion] = useState("Bukidnon");
  const [beforeId, setBeforeId] = useState("DEMO-001");
  const [afterId, setAfterId] = useState("DEMO-002");

  const regionObservations = mockObservations.filter(
    (observation) => observation.region === selectedRegion
  );

  const beforeObservation = regionObservations.find(
    (observation) => observation.id === beforeId
  );

  const afterObservation = regionObservations.find(
    (observation) => observation.id === afterId
  );

  function handleRegionSelect(region) {
    const observations = mockObservations.filter(
      (observation) => observation.region === region
    );

    setSelectedRegion(region);
    setBeforeId(observations[0]?.id ?? "");
    setAfterId(observations[1]?.id ?? "");
  }

  return (
    <section className="scarcast-map-page">
      <MapViewer onRegionSelect={handleRegionSelect} />

      <div className="scarcast-map-bottom">
        <div className="scarcast-visualization">
          <DateSlider />

          <ObservationComparison
            beforeObservation={beforeObservation}
            afterObservation={afterObservation}
          />
        </div>

        <DataPanel
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

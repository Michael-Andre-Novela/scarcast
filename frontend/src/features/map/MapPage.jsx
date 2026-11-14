import { useState } from "react";
import MapViewer from "./components/MapViewer.jsx";
import DateSlider from "./components/DateSlider.jsx";
import DataPanel from "./components/DataPanel.jsx";

export default function MapPage() {
  const [selectedRegion, setSelectedRegion] =
    useState("Bukidnon");

  return (
    <section>
      <MapViewer onRegionSelect={setSelectedRegion} />

      <div className="map-bottom-section">
        <div className="map-visualization">
          <DateSlider />
        </div>

        <DataPanel selectedRegion={selectedRegion} />
      </div>
    </section>
  );
}

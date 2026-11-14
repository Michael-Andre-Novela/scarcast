
import { useEffect, useState } from "react";
import { mockObservations } from "../data/mockObservations";
import ObservationDirectory from "./ObservationDirectory";
import AnalysisControls from "./AnalysisControls";
import EvidenceInspector from "./EvidenceInspector";
import "./DataPanel.css";

export default function DataPanel({
  selectedRegion,
  beforeId,
  afterId,
  onBeforeChange,
  onAfterChange,
}) {
  const [selected, setSelected] = useState(null);
  const [threshold, setThreshold] = useState(45);

  const regionObservations = mockObservations.filter(
    (observation) => observation.region === selectedRegion
  );

  useEffect(() => {
    const firstObservation =
      mockObservations.find(
        (observation) => observation.region === selectedRegion
      ) ?? null;

    setSelected(firstObservation);
  }, [selectedRegion]);

  const beforeObservation = regionObservations.find(
    (observation) => observation.id === beforeId
  );

  const afterObservation = regionObservations.find(
    (observation) => observation.id === afterId
  );

  return (
    <aside className="data-panel">
      <div className="data-panel-heading">
        <span>SCARCAST / DATA EXPLORER</span>
        <h2>Data & Analysis</h2>
        <p>Observation management and evidence review</p>
      </div>

      <ObservationDirectory
        observations={regionObservations}
        selected={selected}
        onSelect={setSelected}
      />

      <AnalysisControls
        observations={regionObservations}
        beforeId={beforeId}
        afterId={afterId}
        onBeforeChange={onBeforeChange}
        onAfterChange={onAfterChange}
        threshold={threshold}
        onThresholdChange={setThreshold}
      />

      <EvidenceInspector
        selected={selected}
        beforeObservation={beforeObservation}
        afterObservation={afterObservation}
      />
    </aside>
  );
}

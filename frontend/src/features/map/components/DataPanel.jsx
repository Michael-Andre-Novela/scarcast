
import { useEffect, useState } from "react";
import { mockObservations } from "../data/mockObservations";
import ObservationDirectory from "./ObservationDirectory";
import AnalysisControls from "./AnalysisControls";
import EvidenceInspector from "./EvidenceInspector";
import "./DataPanel.css";

export default function DataPanel({ selectedRegion }) {
  const [selected, setSelected] = useState(
    mockObservations[0]
  );

  const [beforeId, setBeforeId] = useState("DEMO-001");
  const [afterId, setAfterId] = useState("DEMO-002");
  const [threshold, setThreshold] = useState(45);


  const regionObservations = mockObservations.filter(
    (observation) =>
      observation.region === selectedRegion
  );

  useEffect(() => {
    setSelected(regionObservations[0] ?? null);
    setBeforeId(regionObservations[0]?.id ?? "");
    setAfterId(regionObservations[1]?.id ?? "");
  }, [selectedRegion]);

  
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
        onBeforeChange={setBeforeId}
        onAfterChange={setAfterId}
        threshold={threshold}
        onThresholdChange={setThreshold}
      />

      <EvidenceInspector selected={selected} />
    </aside>
  );
}

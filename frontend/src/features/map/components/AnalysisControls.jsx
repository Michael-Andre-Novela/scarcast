
import { useState } from "react";

export default function AnalysisControls({
  observations,
  beforeId,
  afterId,
  onBeforeChange,
  onAfterChange,
  threshold,
  onThresholdChange,
}) {
  const [message, setMessage] = useState("");

  const before = observations.find((o) => o.id === beforeId);
  const after = observations.find((o) => o.id === afterId);

  let error = "";

  if (!before || !after) {
    error = "Select both before and after observations.";
  } else if (before.id === after.id) {
    error = "Before and after observations must be different.";
  } else if (before.date >= after.date) {
    error = "The after observation must have a later date.";
  } else if (before.region !== after.region) {
    error = "Observations must belong to the same region.";
  } else if (before.product !== after.product) {
    error = "Observations must have the same product type.";
  } else if (before.polarization !== after.polarization) {
    error = "Observations must have compatible polarization.";
  }

  const isValid = error === "";

  function handleRunAnalysis() {
    if (!isValid) return;

    setMessage(
      "Observation pair validated. Analysis processing is not yet connected."
    );
  }

  return (
    <section className="data-section">
      <h3>Analysis Controls</h3>

      <label htmlFor="before-observation">Before Observation</label>
      <select
        id="before-observation"
        className="data-input"
        value={beforeId}
        onChange={(e) => {
          onBeforeChange(e.target.value);
          setMessage("");
        }}
      >
        <option value="">Select an observation</option>
        {observations.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name} ({o.date})
          </option>
        ))}
      </select>

      <label htmlFor="after-observation">After Observation</label>
      <select
        id="after-observation"
        className="data-input"
        value={afterId}
        onChange={(e) => {
          onAfterChange(e.target.value);
          setMessage("");
        }}
      >
        <option value="">Select an observation</option>
        {observations.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name} ({o.date})
          </option>
        ))}
      </select>

      <label htmlFor="analysis-threshold">
        Demo Threshold: {threshold}%
      </label>
      <input
        id="analysis-threshold"
        type="range"
        min="0"
        max="100"
        value={threshold}
        onChange={(e) => {
          onThresholdChange(Number(e.target.value));
          setMessage("");
        }}
      />

      {error && (
        <p className="data-note" role="alert">
          {error}
        </p>
      )}

      <button
        type="button"
        className="analysis-run-button"
        disabled={!isValid}
        onClick={handleRunAnalysis}
      >
        Run Analysis
      </button>

      {message && <p role="status">{message}</p>}

      <p className="data-note">
        Demo controls only. No satellite change detection is
        performed until the processing pipeline is connected.
      </p>
    </section>
  );
}


export default function AnalysisControls({
  observations,
  beforeId,
  afterId,
  onBeforeChange,
  onAfterChange,
  threshold,
  onThresholdChange,
}) {
  return (
    <section className="data-section">
      <h3>Analysis Controls</h3>

      <label>Before Observation</label>
      <select
        className="data-input"
        value={beforeId}
        onChange={(e) => onBeforeChange(e.target.value)}
      >
        {observations.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>

      <label>After Observation</label>
      <select
        className="data-input"
        value={afterId}
        onChange={(e) => onAfterChange(e.target.value)}
      >
        {observations.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>

      <label>
        Demo threshold: {threshold}%
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={threshold}
        onChange={(e) =>
          onThresholdChange(Number(e.target.value))
        }
      />

      <p className="data-note">
        Analysis settings only. No change detection
        is performed until the processing pipeline
        is connected.
      </p>
    </section>
  );
}

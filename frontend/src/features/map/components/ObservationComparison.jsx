
export default function ObservationComparison({
  beforeObservation,
  afterObservation,
}) {
  const valid =
    beforeObservation &&
    afterObservation &&
    beforeObservation.id !== afterObservation.id &&
    beforeObservation.date < afterObservation.date &&
    beforeObservation.region === afterObservation.region &&
    beforeObservation.product === afterObservation.product &&
    beforeObservation.polarization === afterObservation.polarization;

  return (
    <section className="observation-comparison">
      <div className="comparison-heading">
        <span>SCARCAST / CHANGE EXPLORER</span>
        <h3>Observation Comparison</h3>
        <p>Selected datasets for satellite change analysis</p>
      </div>

      <div className="comparison-grid">
        <div className="comparison-card">
          <span className="comparison-label">BEFORE</span>
          <h4>{beforeObservation?.name ?? "Not selected"}</h4>
          <p>{beforeObservation?.date ?? "No date available"}</p>
          <small>
            {beforeObservation
              ? `${beforeObservation.product} · ${beforeObservation.id}`
              : "Select a before observation"}
          </small>
        </div>

        <div className="comparison-card">
          <span className="comparison-label">AFTER</span>
          <h4>{afterObservation?.name ?? "Not selected"}</h4>
          <p>{afterObservation?.date ?? "No date available"}</p>
          <small>
            {afterObservation
              ? `${afterObservation.product} · ${afterObservation.id}`
              : "Select an after observation"}
          </small>
        </div>
      </div>

      <div className="comparison-status" role="status">
        {valid
          ? "Compatible observation pair selected."
          : "Select two compatible observations in chronological order."}
      </div>

      <p className="comparison-disclaimer">
        Dataset preview only. Satellite imagery and change
        detection results will appear when the processing
        pipeline is connected.
      </p>
    </section>
  );
}

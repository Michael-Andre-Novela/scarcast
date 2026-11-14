
export default function EvidenceInspector({
  selected,
  beforeObservation,
  afterObservation,
}) {
  function ObservationDetails({ title, observation }) {
    return (
      <div className="evidence-card">
        <h4>{title}</h4>

        {!observation ? (
          <p className="data-note">No observation selected.</p>
        ) : (
          <>
            <div className="metadata-row">
              <span>Dataset</span>
              <strong>{observation.id}</strong>
            </div>

            <div className="metadata-row">
              <span>Region</span>
              <strong>{observation.region}</strong>
            </div>

            <div className="metadata-row">
              <span>Date</span>
              <strong>{observation.date}</strong>
            </div>

            <div className="metadata-row">
              <span>Product</span>
              <strong>{observation.product}</strong>
            </div>

            <div className="metadata-row">
              <span>Polarization</span>
              <strong>
                {observation.polarization ?? "N/A"}
              </strong>
            </div>
          </>
        )}
      </div>
    );
  }

  const pairValid =
    beforeObservation &&
    afterObservation &&
    beforeObservation.id !== afterObservation.id &&
    beforeObservation.date < afterObservation.date &&
    beforeObservation.region === afterObservation.region &&
    beforeObservation.product === afterObservation.product &&
    beforeObservation.polarization === afterObservation.polarization;

  return (
    <section className="data-section">
      <h3>Evidence Inspector</h3>

      <p className="data-note">
        Compare observation metadata before running
        satellite change analysis.
      </p>

      <div className="evidence-comparison">
        <ObservationDetails
          title="Before Observation"
          observation={beforeObservation}
        />

        <ObservationDetails
          title="After Observation"
          observation={afterObservation}
        />
      </div>

      <div className="analysis-placeholder">
        <strong>
          {pairValid
            ? "Observation pair ready"
            : "Valid observation pair required"}
        </strong>

        <p>
          {pairValid
            ? "The selected datasets are compatible. Change detection processing is not yet connected."
            : "Choose two compatible observations in chronological order."}
        </p>
      </div>

      {selected && (
        <p className="data-note">
          Directory selection: {selected.name}
        </p>
      )}

      <p className="data-note">
        Demo metadata only. Radar change alone does
        not confirm a landslide.
      </p>
    </section>
  );
}

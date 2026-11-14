
export default function EvidenceInspector({
  selected,
}) {
  if (!selected) {
    return <p>Select an observation.</p>;
  }

  return (
    <section className="data-section">
      <h3>Evidence Inspector</h3>

      <div className="metadata-row">
        <span>Dataset</span>
        <strong>{selected.id}</strong>
      </div>

      <div className="metadata-row">
        <span>Region</span>
        <strong>{selected.region}</strong>
      </div>

      <div className="metadata-row">
        <span>Acquisition Date</span>
        <strong>{selected.date}</strong>
      </div>

      <div className="metadata-row">
        <span>Product</span>
        <strong>{selected.product}</strong>
      </div>

      <div className="metadata-row">
        <span>Polarization</span>
        <strong>
          {selected.polarization ?? "N/A"}
        </strong>
      </div>

      <div className="analysis-placeholder">
        <strong>Analysis results unavailable</strong>
        <p>
          Connect processed satellite observations
          to display change measurements.
        </p>
      </div>

      <p className="data-note">
        Demo metadata only. Radar change alone
        does not confirm a landslide.
      </p>
    </section>
  );
}

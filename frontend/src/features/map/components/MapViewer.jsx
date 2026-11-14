
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarkers from "./LocationMarkers.jsx";
import "leaflet/dist/leaflet.css";
import "./MapViewer.css";

export default function MapViewer({ onRegionSelect }) {
  return (
    <section className="map-viewer">
      <div className="map-viewer-header">
        <div>
          <span className="map-eyebrow">
            SCARCAST / SATELLITE EXPLORER
          </span>
          <h2>Satellite Terrain Explorer</h2>
          <p>
            Explore terrain and investigate surface changes.
          </p>
        </div>
        <span className="map-status">
          SATELLITE VIEW
        </span>
      </div>

      <div className="map-container">
        <MapContainer
          center={[8.05, 125.0]}
          zoom={12}
          minZoom={4}
          maxZoom={18}
          scrollWheelZoom={true}
          className="leaflet-map"
        >
          <TileLayer
            attribution='Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={18}
          />

          <LocationMarkers onRegionSelect={onRegionSelect} />
        </MapContainer>
      </div>
    </section>
  );
}

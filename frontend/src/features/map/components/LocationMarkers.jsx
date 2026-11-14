
import { CircleMarker, Popup } from "react-leaflet";

const locations = [
  {
    name: "Bukidnon",
    position: [8.05, 125.0],
  },
  {
    name: "Benguet",
    position: [16.5, 120.7],
  },
  {
    name: "Leyte",
    position: [11.0, 124.8],
  },
];

export default function LocationMarkers({
  onRegionSelect,
}) {
  return (
    <>
      {locations.map((location) => (
        <CircleMarker
          key={location.name}
          center={location.position}
          radius={9}
          pathOptions={{
            color: "#e0a477",
            fillColor: "#d08a58",
            fillOpacity: 0.9,
          }}
          eventHandlers={{
            click: () => onRegionSelect?.(location.name),
          }}
        >
          <Popup>
            <strong>{location.name}</strong>
            <p>View available demo observations</p>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
}

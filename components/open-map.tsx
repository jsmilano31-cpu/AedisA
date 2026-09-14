"use client";

import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MapMode = "risk" | "dispatch";

type MapPoint = {
  name: string;
  position: [number, number];
  risk: "high" | "watch" | "low";
  detail: string;
};

const riskPoints: MapPoint[] = [
  { name: "Barangay San Isidro", position: [14.676, 121.043], risk: "high", detail: "Risk score 91 · breeding-site reports rising" },
  { name: "Barangay Poblacion", position: [14.69, 121.055], risk: "watch", detail: "Risk score 67 · rainfall threshold crossed" },
  { name: "Barangay Maligaya", position: [14.665, 121.058], risk: "high", detail: "Risk score 84 · 8 open reports" },
  { name: "Barangay Santa Cruz", position: [14.658, 121.033], risk: "low", detail: "Risk score 32 · team check complete" },
  { name: "Barangay Payatas", position: [14.716, 121.08], risk: "watch", detail: "Risk score 59 · humidity spike detected" },
];

const dispatchPoints: MapPoint[] = [
  { name: "Team Alpha · San Isidro", position: [14.676, 121.043], risk: "high", detail: "En route · ETA 12 minutes" },
  { name: "Team Bravo · Maligaya", position: [14.665, 121.058], risk: "watch", detail: "On site · inspection in progress" },
  { name: "Team Delta · Poblacion", position: [14.69, 121.055], risk: "low", detail: "Available · last check-in 8 minutes ago" },
];

const markerColors = { high: "#e94d5f", watch: "#e79a3b", low: "#20a999" };

export function OpenMap({ mode = "risk" }: { mode?: MapMode }) {
  const points = mode === "risk" ? riskPoints : dispatchPoints;

  return <MapContainer center={[14.686, 121.057]} zoom={13} scrollWheelZoom className="open-map" aria-label={mode === "risk" ? "OpenStreetMap dengue risk map" : "OpenStreetMap field dispatch map"}>
    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {points.map((point) => <CircleMarker center={point.position} key={point.name} pathOptions={{ color: markerColors[point.risk], fillColor: markerColors[point.risk], fillOpacity: 0.78 }} radius={mode === "risk" ? 12 : 10}>
      <Popup><strong>{point.name}</strong><br />{point.detail}</Popup>
    </CircleMarker>)}
  </MapContainer>;
}

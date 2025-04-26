"use client";

import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

export default function MapModule() {
  const position = [36.671746962189104, 48.505597275314045];

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        {/* لایه‌ی نقشه (OpenStreetMap) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* مارکر (نشانگر موقعیت) */}
        <Marker position={position}>
          <Popup>
            آزمایشگاه دکتر سلیمی <br /> زنجان، دانشگاه اعتمادیه
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

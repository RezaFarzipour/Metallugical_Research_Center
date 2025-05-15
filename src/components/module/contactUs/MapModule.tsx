import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.icon({
  iconUrl: "/images/location.png",
  shadowUrl: "leaflet/dist/images/marker-shadow.png",
  iconSize: [25, 31],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = customIcon;

const Map = () => {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const ZANJAN_COORDS: [number, number] = [36.6703611, 48.5050278];
    const map = L.map("map", {
      center: ZANJAN_COORDS,
      zoom: 16,
      scrollWheelZoom: false,
    });

    const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    const satellite = L.tileLayer(
      "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      {
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );

    osm.addTo(map);
    map.attributionControl.setPrefix(false);

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (!map.scrollWheelZoom.enabled()) {
          map.scrollWheelZoom.enable();
        }
        setShowHint(false);
      } else {
        e.preventDefault();
        if (map.scrollWheelZoom.enabled()) {
          map.scrollWheelZoom.disable();
        }
        setShowHint(true);
      }
    };

    const mapContainer = map.getContainer();
    mapContainer.addEventListener("wheel", handleWheel, { passive: false });

    L.control
      .layers(
        {
          "نقشه عادی": osm,
          "ماهواره‌ای": satellite,
        },
        undefined,
        { position: "topright" }
      )
      .addTo(map);

    L.marker(ZANJAN_COORDS)
      .addTo(map)
      .bindPopup(`
        <strong>دانشگاه آزاد اسلامی واحد زنجان</strong><br>
        آدرس: زنجان،اعتمادیه <br>
        <a href="https://maps.google.com/?q=36.6845,48.5097" target="_blank">مشاهده در Google Maps</a>
      `);

    return () => {
      mapContainer.removeEventListener("wheel", handleWheel);
      map.remove();
    };
  }, []);

  return (
    <div className="relative">
      <div id="map" className="h-[400px] w-full" />
      {showHint && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md text-gray-800 text-sm sm:text-base px-4 py-2 rounded-lg shadow-md z-[9999]">
          برای زوم روی نقشه، کلید <strong>Ctrl</strong> را نگه دارید و اسکرول
          کنید 🔍
        </div>
      )}
    </div>
  );
};

export default Map;

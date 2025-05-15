import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.icon({
  iconUrl: "/images/location.png", // از public استفاده کن
  shadowUrl: "leaflet/dist/images/marker-shadow.png",
  iconSize: [25, 31], // اندازه آیکون
  iconAnchor: [12, 41], // نقطه اتصال آیکون به نقظه
  popupAnchor: [1, -34], // محل ظاهر شدن popup
});
L.Marker.prototype.options.icon = customIcon;
delete L.Icon.Default.prototype._getIconUrl;

const Map = () => {
  useEffect(() => {
    const ZANJAN_COORDS = [36.6703611, 48.5050278];
    const map = L.map("map").setView(ZANJAN_COORDS, 16);

    map.attributionControl.setPrefix(false);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      map
    );

    L.marker(ZANJAN_COORDS).addTo(map).bindPopup(`
      <strong>دانشگاه آزاد اسلامی واحد زنجان</strong><br>
      آدرس: زنجان،اعتمادیه <br>
      <a href="https://maps.google.com/?q=36.6845 ,48.5097" target="_blank">مشاهده در Google Maps</a>
    `);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <div
        id="map"
        style={{ height: "400px", width: "100vw", margin: "0 -20px" }}
      />
    </>
  );
};

export default Map;

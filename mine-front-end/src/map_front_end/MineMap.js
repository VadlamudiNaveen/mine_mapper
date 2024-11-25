// src/MineMap.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Import Leaflet to set up marker icons properly
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
});


// Defining React Component for our application.
const MineMap = () => {
  const [mines, setMines] = useState([]);

  // Fetch the mine locations from the backend
  useEffect(() => {
    fetch("http://localhost:8083/mines")
      .then((response) => response.json())
      .then((data) => {
        setMines(data); // Store the data in state
      })
      .catch((error) => console.error("Error fetching mine data:", error));
  }, []);

  return (
    <MapContainer center={[49.694168, -112.832779]} zoom={8} style={{ height: "500px", width: "100%" }}>
      {/* Add the OpenStreetMap tile layer */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Loop through the mine data and add markers */}
      {mines.map((mine) => (
        <Marker key={mine.id} position={[mine.latitude, mine.longitude]}>
          <Popup>
            <b>{mine.name}</b><br />{mine.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MineMap;

import { useState } from "react";

function Hospitals() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNearbyPlaces = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLoading(true);

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:10000,${lat},${lon});
          node["amenity"="pharmacy"](around:10000,${lat},${lon});

          way["amenity"="hospital"](around:10000,${lat},${lon});
          way["amenity"="pharmacy"](around:10000,${lat},${lon});
        );
        out center;
        `;

        try {
          const response = await fetch(
            "https://overpass-api.de/api/interpreter",
            {
              method: "POST",
              body: query,
            }
          );

          const data = await response.json();

          const results = data.elements.map((item) => {
            const itemLat = item.lat || item.center?.lat;
            const itemLon = item.lon || item.center?.lon;

            const distance =
              calculateDistance(
                lat,
                lon,
                itemLat,
                itemLon
              ).toFixed(1);

            return {
              name:
                item.tags?.name ||
                (item.tags?.amenity === "hospital"
                  ? "Hospital"
                  : "Pharmacy"),

              amenity: item.tags?.amenity,

              lat: itemLat,
              lon: itemLon,

              address:
                `${item.tags?.["addr:housenumber"] || ""} ${
                  item.tags?.["addr:street"] || ""
                }`.trim() || "Address unavailable",

              distance,
            };
          });

          results.sort(
            (a, b) => Number(a.distance) - Number(b.distance)
          );

          setPlaces(results);
        } catch (error) {
          console.log(error);
        }

        setLoading(false);
      },
      () => {
        alert("Location access denied");
      }
    );
  };

  const calculateDistance = (
    lat1,
    lon1,
    lat2,
    lon2
  ) => {
    const R = 3958.8;

    const dLat =
      ((lat2 - lat1) * Math.PI) / 180;

    const dLon =
      ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "auto",
        padding: "30px",
      }}
    >
      <h1>🏥 Nearby Hospitals & Pharmacies</h1>

      <button
        onClick={getNearbyPlaces}
        style={{
          padding: "12px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        📍 Use My Location
      </button>

      {loading && <h3>Loading nearby places...</h3>}

      {places.map((place, index) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h3>
            {place.amenity === "hospital"
              ? "🏥"
              : "💊"}{" "}
            {place.name}
          </h3>

          <p>
            📍 <strong>Address:</strong>{" "}
            {place.address}
          </p>

          <p>
            📏 <strong>Distance:</strong>{" "}
            {place.distance} miles away
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`}
              target="_blank"
              rel="noreferrer"
            >
              🗺 Google Maps
            </a>

            <a
              href={`https://maps.apple.com/?ll=${place.lat},${place.lon}`}
              target="_blank"
              rel="noreferrer"
            >
              🍎 Apple Maps
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Hospitals;
import { useState } from "react";

function SOS() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const findEmergencyServices = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLoading(true);

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLocation({
          lat,
          lon,
        });

        try {
          const geoResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
          );

          const geoData = await geoResponse.json();

          setAddress(geoData.display_name);
        } catch (error) {
          console.log(error);
        }

        const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:10000,${lat},${lon});
          node["amenity"="police"](around:10000,${lat},${lon});
          node["amenity"="fire_station"](around:10000,${lat},${lon});
        );
        out;
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

          const results = data.elements.map((item) => ({
            name:
              item.tags?.name ||
              item.tags?.amenity,

            type:
              item.tags?.amenity,

            lat: item.lat,
            lon: item.lon,
          }));

          setServices(results);
        } catch (error) {
          console.log(error);
        }

        setLoading(false);
      },
      () => alert("Location access denied")
    );
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "auto",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        🚨 Emergency SOS Center
      </h1>

      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={findEmergencyServices}
          style={{
            background: "red",
            color: "white",
            padding: "15px 25px",
            fontSize: "18px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          🚨 FIND HELP NOW
        </button>

        <a
          href="tel:911"
          style={{
            background: "#2563eb",
            color: "white",
            padding: "15px 25px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          📞 CALL 911
        </a>
      </div>

      {loading && (
        <h3 style={{ textAlign: "center" }}>
          Searching nearby emergency services...
        </h3>
      )}

      {location && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "25px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <h3>📍 Your Current Location</h3>

          <p>
            {address || "Fetching address..."}
          </p>
        </div>
      )}

      {services.map((service, index) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "12px",
            boxShadow:
              "0px 2px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h3>
            {service.type === "hospital"
              ? "🏥"
              : service.type === "police"
              ? "👮"
              : "🚒"}{" "}
            {service.name}
          </h3>

          <p>
            <strong>Type:</strong>{" "}
            {service.type}
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${service.lat},${service.lon}`}
              target="_blank"
              rel="noreferrer"
            >
              🗺 Google Maps
            </a>

            <a
              href={`https://maps.apple.com/?ll=${service.lat},${service.lon}`}
              target="_blank"
              rel="noreferrer"
            >
              🍎 Apple Maps
            </a>
          </div>
        </div>
      ))}

      {services.length > 0 && (
        <div
          style={{
            background: "#fff7ed",
            padding: "20px",
            borderRadius: "12px",
            marginTop: "30px",
            border: "1px solid #fdba74",
          }}
        >
          <h2>🚑 Emergency Guidance</h2>

          <p>❤️ Chest Pain → Call 911 immediately.</p>

          <p>🫁 Breathing Issues → Seek emergency care.</p>

          <p>🔥 Fire → Evacuate and call emergency services.</p>

          <p>🧠 Mental Health Crisis → Call 988 Lifeline.</p>

          <p>🚗 Accident → Move to safety and call 911.</p>
        </div>
      )}
    </div>
  );
}

export default SOS;
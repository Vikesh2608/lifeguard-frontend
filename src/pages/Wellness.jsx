import { useState } from "react";

function Wellness() {
  const [email, setEmail] = useState("");
  const [mood, setMood] = useState(8);
  const [sleepHours, setSleepHours] = useState(8);
  const [stressLevel, setStressLevel] = useState(5);

  const [message, setMessage] = useState("");

  const saveWellness = async () => {
    alert("saveWellness function started");

    try {
      const response = await fetch(
        "https://lifeguard-ai-v3.onrender.com/wellness",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
         email,
         mood: String(mood),
         sleep_hours: sleepHours,
         stress_level: stressLevel,
         }),
        }
      );

      alert("Request sent to backend");

      const data = await response.json();

      alert(JSON.stringify(data));

      setMessage(data.message);
    } catch (error) {
      console.error(error);

      setMessage(
        "❌ Failed to save wellness data"
      );

      alert("Error: " + error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="card">

        <h1>😊 Daily Wellness Check-In</h1>

        <p>
          Take 30 seconds to track your wellness today.
        </p>

        <label>
          📧 Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <label
          style={{
            marginTop: "20px",
            display: "block",
          }}
        >
          😊 How are you feeling today?
        </label>

        <select
          value={mood}
          onChange={(e) =>
            setMood(
              Number(e.target.value)
            )
          }
        >
          <option value="10">
            😄 Excellent
          </option>

          <option value="8">
            🙂 Good
          </option>

          <option value="6">
            😐 Average
          </option>

          <option value="4">
            😔 Stressed
          </option>

          <option value="2">
            😢 Very Stressed
          </option>
        </select>

        <label
          style={{
            marginTop: "20px",
            display: "block",
          }}
        >
          😴 How many hours did you sleep?
        </label>

        <select
          value={sleepHours}
          onChange={(e) =>
            setSleepHours(
              Number(e.target.value)
            )
          }
        >
          <option value="4">
            Less than 4 Hours
          </option>

          <option value="6">
            4 - 6 Hours
          </option>

          <option value="8">
            6 - 8 Hours
          </option>

          <option value="10">
            More than 8 Hours
          </option>
        </select>

        <label
          style={{
            marginTop: "20px",
            display: "block",
          }}
        >
          😟 Stress Level Today
        </label>

        <select
          value={stressLevel}
          onChange={(e) =>
            setStressLevel(
              Number(e.target.value)
            )
          }
        >
          <option value="2">
            🟢 Low
          </option>

          <option value="5">
            🟡 Moderate
          </option>

          <option value="8">
            🟠 High
          </option>

          <option value="10">
            🔴 Very High
          </option>
        </select>

        <button
          onClick={() => {
            alert("Button clicked");
            saveWellness();
          }}
          style={{
            marginTop: "25px",
            width: "100%",
          }}
        >
          💾 Save Daily Check-In
        </button>

        {message && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#f5f5f5",
              borderRadius: "10px",
            }}
          >
            {message}
          </div>
        )}

      </div>
    </div>
  );
}

export default Wellness;
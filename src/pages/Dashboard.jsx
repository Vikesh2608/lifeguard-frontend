import { useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(null);
  const [message, setMessage] = useState("");
  const [latestRecord, setLatestRecord] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [videos, setVideos] = useState([]);
  const [history, setHistory] = useState([]);
  const [trendData, setTrendData] = useState(null);
  const [trendMessage, setTrendMessage] = useState("");
  const [streak, setStreak] = useState(0);
  const [riskLevel, setRiskLevel] = useState("");
  const [aiInsight, setAiInsight] = useState("");

  const loadScore = async () => {
    try {
     const url =
  `https://lifeguard-ai-v3.onrender.com/wellness-history/${email}`;

alert(url);

      const response = await fetch(url);

      const data = await response.json();
      

console.log("API DATA:", data);
alert("Records found: " + data.length);

setHistory(data);
setStreak(data.length);

if (!data || data.length === 0) {
  setMessage("❌ No wellness data found.");
  setScore(null);
  setLatestRecord(null);
  return;
}

      const latest = data[data.length - 1];
      const labels = data.map((item) =>
  item.created_at
    ? new Date(item.created_at).toLocaleDateString()
    : `Record ${item.id}`
);

const scores = data.map((item) => {
  const mood = Number(item.mood);
  const sleep = Number(item.sleep_hours);
  const stress = Number(item.stress_level);

  return Math.round(
    (
      mood * 10 +
      sleep * 10 +
      (10 - stress) * 10
    ) / 3
  );
});

setTrendData({
  labels,
  datasets: [
    {
      label: "Wellness Score",
      data: scores,
      borderColor: "#2563eb",
      backgroundColor: "rgba(37,99,235,0.2)",
      tension: 0.4,
    },
  ],
});

if (scores.length >= 2) {
  const latestScore =
    scores[scores.length - 1];

  const previousScore =
    scores[scores.length - 2];

  if (latestScore > previousScore) {
    setTrendMessage(
      "📈 Wellness Improving"
    );
  } else if (
    latestScore < previousScore
  ) {
    setTrendMessage(
      "📉 Wellness Declining"
    );
  } else {
    setTrendMessage(
      "➡️ Wellness Stable"
    );
  }
}

      setLatestRecord(latest);

      const mood = Number(latest.mood);
      const sleep = Number(latest.sleep_hours);
      const stress = Number(latest.stress_level);

      const moodScore = mood * 10;
      const sleepScore = sleep * 10;
      const stressScore = (10 - stress) * 10;

      const total = Math.round(
        (moodScore + sleepScore + stressScore) / 3
      );

      setScore(total);
      let insight = "";

if (total >= 80) {
  setRiskLevel("🟢 Low Risk");

  insight =
    "Your wellness indicators are strong. Continue maintaining healthy habits.";
}
else if (total >= 60) {
  setRiskLevel("🟡 Moderate Risk");

  insight =
    "Your wellness is stable but can improve through exercise and mindfulness.";
}
else {
  setRiskLevel("🔴 High Risk");

  insight =
    "Your wellness requires attention. Prioritize sleep, stress reduction and self-care.";
}

setAiInsight(insight);

      let recs = [];
      let vids = [];

      // Overall Score Recommendations
      if (total >= 80) {
        recs.push(
          "🏆 Excellent wellness habits. Keep following your current routine."
        );
        recs.push(
          "💧 Drink 2-3 liters of water daily."
        );
        recs.push(
          "🏃 Continue exercising 30 minutes daily."
        );
        recs.push(
          "😴 Maintain your healthy sleep routine."
        );

        vids.push({
          title: "Healthy Lifestyle Habits",
          url: "https://www.youtube.com/watch?v=3nJgVPL8Bbs",
        });
      } else if (total >= 60) {
        recs.push(
          "⚠️ Your wellness is good but can improve."
        );
        recs.push(
          "🏃 Add 20-30 minutes of daily activity."
        );
        recs.push(
          "🥗 Focus on balanced nutrition."
        );
        recs.push(
          "🧘 Practice mindfulness."
        );

        vids.push({
          title: "Daily Wellness Improvement",
          url: "https://www.youtube.com/watch?v=lFcSrYw-ARY",
        });
      } else {
        recs.push(
          "🚨 Wellness needs immediate attention."
        );
        recs.push(
          "😴 Improve sleep quality."
        );
        recs.push(
          "🧘 Reduce stress levels."
        );
        recs.push(
          "😊 Spend more time with family and friends."
        );

        vids.push({
          title: "Mental Health Support",
          url: "https://www.youtube.com/watch?v=ZToicYcHIOU",
        });
      }

      // Sleep Analysis
      if (sleep < 6) {
        recs.push(
          "📵 Avoid screens before bedtime."
        );
        recs.push(
          "🌙 Sleep before 11 PM."
        );

        vids.push({
          title: "How To Sleep Better",
          url: "https://www.youtube.com/watch?v=aEqlQvczMJQ",
        });
      }

      // Stress Analysis
      if (stress >= 7) {
        recs.push(
          "🚶 Take a 20-minute walk outdoors."
        );
        recs.push(
          "☕ Reduce caffeine intake."
        );
        recs.push(
          "🎵 Listen to calming music."
        );

        vids.push({
          title: "10 Minute Meditation",
          url: "https://www.youtube.com/watch?v=inpok4MKVLM",
        });
      }

      // Mood Analysis
      if (mood <= 4) {
        recs.push(
          "🌞 Get sunlight exposure daily."
        );
        recs.push(
          "👨‍👩‍👧 Spend time with loved ones."
        );
        recs.push(
          "🎧 Listen to uplifting podcasts."
        );

        vids.push({
          title: "Mental Health Motivation",
          url: "https://www.youtube.com/watch?v=ZToicYcHIOU",
        });
      }

      // Exercise
      if (sleep >= 8 && mood >= 7) {
        recs.push(
          "🏋️ Your energy levels are good. Consider strength training."
        );

        vids.push({
          title: "15 Minute Full Body Workout",
          url: "https://www.youtube.com/watch?v=UBMk30rjy0o",
        });
      }

      setRecommendations(recs);
      setVideos(vids);

      if (total >= 80) {
        setMessage("🟢 Excellent Health Score!");
      } else if (total >= 60) {
        setMessage(
          "🟡 Good Health. Small improvements recommended."
        );
      } else {
        setMessage(
          "🔴 Wellness needs attention."
        );
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "❌ Failed to load wellness data."
      );
    }
  };

  return (
    <div className="page-container">
      <div className="card">

        <h1>📊 Health Score Dashboard</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          onClick={loadScore}
          style={{ marginTop: "15px" }}
        >
          Load Dashboard
        </button>

        {score !== null && (
          <>
            <div style={{ marginTop: "25px" }}>
              <h2>
                🏆 Wellness Score: {score}/100
              </h2>

              <div
                style={{
                  width: "100%",
                  height: "30px",
                  background: "#ddd",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${score}%`,
                    height: "100%",
                    background:
                      score >= 80
                        ? "green"
                        : score >= 60
                        ? "orange"
                        : "red",
                  }}
                />
              </div>

              <h3 style={{ marginTop: "15px" }}>
                {message}
              </h3>
            </div>

            <div
              style={{
                background: "#eef6ff",
                padding: "20px",
                borderRadius: "10px",
                marginTop: "25px",
              }}
            >
              <h2>🤖 LifeGuard AI Coach</h2>
              <div
  style={{
    background: "#f5f5f5",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    fontWeight: "bold",
  }}
>
  {riskLevel}
</div>

<div
  style={{
    background: "#fff9db",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
  }}
>
  🔥 Wellness Streak: {streak} Check-ins
</div>

              <p>
                Based on your latest wellness check:
              </p>

            <ul>
  <li>
    Mood: {latestRecord?.mood}/10
  </li>

  <li>
    Sleep: {latestRecord?.sleep_hours} hours
  </li>

  <li>
    Stress: {latestRecord?.stress_level}/10
  </li>
</ul>

<p>{aiInsight}</p>

</div>

<div
  style={{
    marginTop: "20px",
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
  }}
>
              <h2>📋 Latest Wellness Summary</h2>

              <p>
                😊 Mood: {latestRecord?.mood}/10
              </p>

              <p>
                😴 Sleep Hours: {latestRecord?.sleep_hours}
              </p>

              <p>
                😟 Stress Level: {latestRecord?.stress_level}/10
              </p>
            </div>

            <hr />

            <h2>
              🎯 Personalized Recommendations
            </h2>
            <hr />

<h2>📈 Wellness Trend Analysis</h2>

{trendData && (
  <div
    style={{
      background: "#ffffff",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px",
    }}
  >
    <Line data={trendData} />

    <div
      style={{
        marginTop: "15px",
        padding: "15px",
        background: "#eef6ff",
        borderRadius: "10px",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      {trendMessage}
    </div>
  </div>
)}

<hr />

<h2>📅 Wellness History</h2>

<div
  style={{
    background: "#f8f8f8",
    padding: "15px",
    borderRadius: "10px",
    maxHeight: "300px",
    overflowY: "auto",
  }}
>
  {history.length === 0 ? (
    <p>No wellness history found.</p>
  ) : (
    history
      .slice()
      .reverse()
      .map((record) => (
        <div
          key={record.id}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "10px 0",
          }}
        >
          <p>
            📅{" "}
            {record.created_at
              ? new Date(
                  record.created_at
                ).toLocaleString()
              : "Unknown Date"}
          </p>

          <p>
            😊 Mood: {record.mood}/10
          </p>

          <p>
            😴 Sleep: {record.sleep_hours} hrs
          </p>

          <p>
            😟 Stress: {record.stress_level}/10
          </p>
        </div>
      ))
  )}
</div>

<hr />

            <ul>
              {recommendations.map(
                (item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                )
              )}
            </ul>

            <hr />

            <h2>
              🎥 Recommended Videos
            </h2>

            {videos.map(
              (video, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ▶ {video.title}
                  </a>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
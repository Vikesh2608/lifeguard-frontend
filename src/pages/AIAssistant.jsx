import { useState } from "react";

function AIAssistant() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!message) return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://lifeguard-ai-v3.onrender.com/ai-chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await res.json();

      setResponse(data.response);
    } catch (error) {
      setResponse(
        "❌ Unable to contact LifeGuard AI"
      );
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "30px",
      }}
    >
      <h1>🤖 LifeGuard AI Assistant</h1>

      <p>
        Ask about wellness, stress, diet,
        exercise, emergencies, motivation,
        productivity and more.
      </p>

      <textarea
        rows="6"
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="How are you feeling today?"
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
        }}
      />

      <br />
      <br />

      <button
        onClick={askAI}
        style={{
          padding: "12px 25px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Ask LifeGuard AI
      </button>

      <br />
      <br />

      {loading && (
        <h3>🤖 Thinking...</h3>
      )}

      {response && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.1)",
            whiteSpace: "pre-wrap",
          }}
        >
          {response}
        </div>
      )}
    </div>
  );
}

export default AIAssistant;
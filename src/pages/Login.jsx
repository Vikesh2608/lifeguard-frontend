import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loginUser = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      const response = await fetch(
        "https://lifeguard-ai-v3.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 404) {
        setError("❌ No account found with this email.");
        return;
      }

      if (response.status === 401) {
        setError("❌ Incorrect password.");
        return;
      }

      if (response.ok) {
        setSuccess("✅ Login Successful!");

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        localStorage.setItem(
          "guest",
          "false"
        );

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      setError("Unable to connect to the server.");
    }
  };

  const continueAsGuest = () => {
    localStorage.setItem("guest", "true");

    localStorage.setItem(
      "user",
      JSON.stringify({
        first_name: "Guest",
        last_name: "",
        email: "guest@lifeguard.ai",
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="page-container">

      <h1>🔐 Login</h1>

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={loginUser}>
        Login
      </button>

      <br />
      <br />

      <button
        onClick={continueAsGuest}
        style={{
          background: "#16a34a",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        👤 Continue as Guest
      </button>

      <br />
      <br />

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {success && (
        <p style={{ color: "green" }}>
          {success}
        </p>
      )}

    </div>
  );
}

export default Login;
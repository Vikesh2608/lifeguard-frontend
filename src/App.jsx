import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Wellness from "./pages/Wellness";
import AIAssistant from "./pages/AIAssistant";
import Family from "./pages/Family";
import SOS from "./pages/SOS";
import Hospitals from "./pages/Hospitals";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        {/* ================= NAVIGATION ================= */}

        <div className="navbar">

          <Link to="/">
            🏠 Home
          </Link>

          <Link to="/login">
            🔐 Login
          </Link>

          <Link to="/register">
            📝 Register
          </Link>

          <Link to="/dashboard">
            📊 Dashboard
          </Link>

          <Link to="/wellness">
            😊 Wellness
          </Link>

          <Link to="/family">
            👨‍👩‍👧 Family
          </Link>

          <Link to="/ai">
            🤖 AI Assistant
          </Link>

          <Link to="/sos">
            🚨 SOS
          </Link>

          <Link to="/hospitals">
            🏥 Hospitals
          </Link>

        </div>

        {/* ================= ROUTES ================= */}

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/wellness"
            element={<Wellness />}
          />

          <Route
            path="/family"
            element={<Family />}
          />

          <Route
            path="/ai"
            element={<AIAssistant />}
          />

          <Route
            path="/sos"
            element={<SOS />}
          />

          <Route
            path="/hospitals"
            element={<Hospitals />}
          />

        </Routes>

        {/* ================= FOOTER ================= */}

        <footer
          style={{
            textAlign: "center",
            padding: "30px",
            marginTop: "60px",
            background: "#14213d",
            color: "white",
          }}
        >
          <h2>🛡️ LifeGuard AI</h2>

          <p>
            AI Powered Wellness, Safety &
            Emergency Platform
          </p>

          <p>
            Founded & Developed by
            <strong> Vikesh Bairam</strong>
          </p>

          <p>
            Protecting Lives Through Intelligent
            Technology
          </p>

          <hr
            style={{
              margin: "20px 0",
              borderColor: "#555",
            }}
          />

          <p>
            Version 3.1
          </p>

          <p>
            © 2026 LifeGuard AI.
            All Rights Reserved.
          </p>

        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
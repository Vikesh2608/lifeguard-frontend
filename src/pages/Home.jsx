import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1>🛡️ LifeGuard AI</h1>

        <h2>
          AI Powered Wellness, Safety &
          Emergency Assistance Platform
        </h2>

        <p>
          Protect yourself and your loved ones with AI-powered wellness
          tracking, emergency assistance, family safety, and intelligent
          health insights—all in one platform.
        </p>

        <div className="hero-buttons">
          <button onClick={() => navigate("/register")}>
            🚀 Get Started
          </button>

          <button onClick={() => navigate("/ai")}>
            🤖 Try AI Assistant
          </button>
        </div>
      </section>

      {/* STATS SECTION */}

      <section className="stats-section">

        <div className="stat-card">
          <h2>2500+</h2>
          <p>👥 Users Protected</p>
        </div>

        <div className="stat-card">
          <h2>8000+</h2>
          <p>🤖 AI Sessions</p>
        </div>

        <div className="stat-card">
          <h2>1200+</h2>
          <p>🚨 SOS Alerts</p>
        </div>

        <div className="stat-card">
          <h2>99%</h2>
          <p>❤️ User Satisfaction</p>
        </div>

      </section>

      {/* FEATURES */}

      <section>

        <h2 className="section-title">
          Explore Features
        </h2>

        <div className="feature-grid">

          <div
            className="feature-card"
            onClick={() => navigate("/wellness")}
          >
            <h2>😊 Wellness</h2>

            <p>
              Track your sleep, hydration,
              mood and stress levels.
            </p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate("/ai")}
          >
            <h2>🤖 AI Assistant</h2>

            <p>
              Receive personalized AI
              guidance for wellness and life.
            </p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate("/sos")}
          >
            <h2>🚨 SOS</h2>

            <p>
              Instantly access emergency
              assistance during critical situations.
            </p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate("/hospitals")}
          >
            <h2>🏥 Hospitals</h2>

            <p>
              Locate nearby hospitals and
              emergency medical services.
            </p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate("/family")}
          >
            <h2>👨‍👩‍👧 Family</h2>

            <p>
              Manage family safety and
              emergency contacts.
            </p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate("/dashboard")}
          >
            <h2>📊 Analytics</h2>

            <p>
              Visualize wellness trends
              and health insights.
            </p>
          </div>

        </div>

      </section>

      {/* WHY CHOOSE */}

      <section className="why-section">

        <h2 className="section-title">
          Why Choose LifeGuard AI?
        </h2>

        <div className="why-grid">

          <div className="why-card">
            🤖 AI Wellness Coaching
          </div>

          <div className="why-card">
            🚨 One-Tap SOS
          </div>

          <div className="why-card">
            🏥 Nearby Hospitals
          </div>

          <div className="why-card">
            👨‍👩‍👧 Family Protection
          </div>

          <div className="why-card">
            📊 Wellness Analytics
          </div>

          <div className="why-card">
            🔒 Secure & Private
          </div>

        </div>

      </section>

      {/* CALL TO ACTION */}

      <section className="cta-section">

        <h2>
          Ready to Protect Yourself
          and Your Family?
        </h2>

        <p>
          Join LifeGuard AI today and
          experience AI-powered wellness,
          emergency assistance and
          intelligent health monitoring.
        </p>

        <button
          onClick={() => navigate("/register")}
        >
          Start Your Journey
        </button>

      </section>

    </div>
  );
}

export default Home;
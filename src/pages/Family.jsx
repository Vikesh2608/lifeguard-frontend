function Family() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>👨‍👩‍👧 Family Safety Center</h1>

      <p>
        Manage your family members, emergency contacts and shared safety
        information.
      </p>

      <div
        style={{
          background: "white",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        }}
      >
        <h2>Coming Soon</h2>

        <ul>
          <li>👨 Add Family Members</li>
          <li>📞 Emergency Contacts</li>
          <li>📍 Live Location Sharing</li>
          <li>🚨 SOS Alerts to Family</li>
          <li>❤️ Medical Profiles</li>
        </ul>
      </div>
    </div>
  );
}

export default Family;
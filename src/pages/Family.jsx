import { useEffect, useState } from "react";

const API_URL = "https://lifeguard-ai-v3.onrender.com";

function Family() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    relationship: "",
    phone: "",
    email: "",
    medical_notes: "",
  });

  useEffect(() => {
    if (user?.email) {
      loadFamily();
    }
  }, []);

  const loadFamily = async () => {
    try {
      const response = await fetch(
        `${API_URL}/family/${encodeURIComponent(user.email)}`
      );

      if (!response.ok) return;

      const data = await response.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const addFamilyMember = async () => {
    if (!user?.email) {
      alert("Please login before adding family members.");
      return;
    }

    if (
      !form.first_name.trim() ||
      !form.last_name.trim() ||
      !form.relationship.trim()
    ) {
      alert("First Name, Last Name and Relationship are required.");
      return;
    }

    const payload = {
      owner_email: user.email,
      first_name: form.first_name,
      last_name: form.last_name,
      relationship: form.relationship,
      phone: form.phone,
      email: form.email,
      medical_notes: form.medical_notes,
    };

    console.log("Sending:", payload);

    try {
      const response = await fetch(`${API_URL}/family`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert(
          data.detail
            ? JSON.stringify(data.detail)
            : "Unable to save family member."
        );
        return;
      }

      alert("✅ Family member added successfully!");

      setForm({
        first_name: "",
        last_name: "",
        relationship: "",
        phone: "",
        email: "",
        medical_notes: "",
      });

      loadFamily();
    } catch (err) {
      console.error(err);
      alert("Server connection failed.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1>👨‍👩‍👧 Family Safety Center</h1>

      <p>Manage and protect your loved ones.</p>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0,0,0,.15)",
          marginBottom: "30px",
        }}
      >
        <h2>Add Family Member</h2>

        <input
          placeholder="First Name"
          value={form.first_name}
          onChange={(e) =>
            setForm({ ...form, first_name: e.target.value })
          }
        />

        <br /><br />

        <input
          placeholder="Last Name"
          value={form.last_name}
          onChange={(e) =>
            setForm({ ...form, last_name: e.target.value })
          }
        />

        <br /><br />

        <input
          placeholder="Relationship"
          value={form.relationship}
          onChange={(e) =>
            setForm({ ...form, relationship: e.target.value })
          }
        />

        <br /><br />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <br /><br />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <br /><br />

        <textarea
          rows="4"
          placeholder="Medical Notes"
          value={form.medical_notes}
          onChange={(e) =>
            setForm({
              ...form,
              medical_notes: e.target.value,
            })
          }
        />

        <br /><br />

        <button onClick={addFamilyMember}>
          ➕ Save Family Member
        </button>
      </div>

      <h2>Family Members</h2>

      {members.length === 0 ? (
        <p>No family members found.</p>
      ) : (
        members.map((member) => (
          <div
            key={member.id}
            style={{
              background: "#fff",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "12px",
              boxShadow: "0 0 8px rgba(0,0,0,.15)",
            }}
          >
            <h3>
              👤 {member.first_name} {member.last_name}
            </h3>

            <p>
              <strong>Relationship:</strong> {member.relationship}
            </p>

            <p>
              <strong>Phone:</strong> {member.phone}
            </p>

            <p>
              <strong>Email:</strong> {member.email}
            </p>

            <p>
              <strong>Medical Notes:</strong> {member.medical_notes}
            </p>
          <div style={{ marginTop: "15px" }}>
  <button
    onClick={() => alert("Edit feature coming next")}
  >
    ✏️ Edit
  </button>

  <button
    style={{
      marginLeft: "10px",
      background: "#dc2626",
      color: "white",
    }}
    onClick={() => deleteMember(member.id)}
  >
    🗑 Delete
  </button>
</div>

export default Family;
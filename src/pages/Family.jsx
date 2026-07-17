import { useEffect, useState } from "react";

const API_URL = "https://lifeguard-ai-v3.onrender.com";

function Family() {

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [members, setMembers] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        relationship: "",
        phone: "",
        email: "",
        medical_notes: "",
        blood_group: "",
        allergies: "",
        medications: "",
        doctor: "",
        hospital: ""
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

            const data = await response.json();

            setMembers(Array.isArray(data) ? data : []);

        } catch (err) {

            console.log(err);

        }

    };

    const clearForm = () => {

        setEditingId(null);

        setForm({
            first_name: "",
            last_name: "",
            relationship: "",
            phone: "",
            email: "",
            medical_notes: "",
            blood_group: "",
            allergies: "",
            medications: "",
            doctor: "",
            hospital: ""
        });

    };

    const saveFamily = async () => {

        if (!form.first_name || !form.relationship) {

            alert("Please complete required fields.");

            return;

        }

        const payload = {
            owner_email: user.email,
            ...form
        };

        try {

            const url =
                editingId === null
                    ? `${API_URL}/family`
                    : `${API_URL}/family/${editingId}`;

            const method =
                editingId === null
                    ? "POST"
                    : "PUT";

            const response = await fetch(url, {

                method,

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(payload)

            });

            const data = await response.json();

            if (!response.ok) {

                alert(JSON.stringify(data));

                return;

            }

            alert(
                editingId === null
                    ? "Family member added."
                    : "Family member updated."
            );

            clearForm();

            loadFamily();

        } catch (err) {

            console.log(err);

        }

    };

    const deleteMember = async (id) => {

        if (!window.confirm("Delete this member?"))
            return;

        try {

            const response = await fetch(
                `${API_URL}/family/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (response.ok) {

                loadFamily();

            }

        } catch (err) {

            console.log(err);

        }

    };

    const editMember = (member) => {

        setEditingId(member.id);

        setForm({

            first_name: member.first_name || "",

            last_name: member.last_name || "",

            relationship: member.relationship || "",

            phone: member.phone || "",

            email: member.email || "",

            medical_notes: member.medical_notes || "",

            blood_group: member.blood_group || "",

            allergies: member.allergies || "",

            medications: member.medications || "",

            doctor: member.doctor || "",

            hospital: member.hospital || ""

        });

    };

    return (

        <div
            style={{
                maxWidth: "1200px",
                margin: "30px auto",
                padding: "20px"
            }}
        >

            <h1>👨‍👩‍👧 Family Safety Center</h1>

            <p>
                Manage your loved ones, medical profiles and emergency contacts.
            </p>

            <div
                style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 0 10px rgba(0,0,0,.15)"
                }}
            >

                <h2>

                    {editingId === null
                        ? "Add Family Member"
                        : "Edit Family Member"}

                </h2>

                <input
                    placeholder="First Name"
                    value={form.first_name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            first_name: e.target.value
                        })
                    }
                />

                <br /><br />

                <input
                    placeholder="Last Name"
                    value={form.last_name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            last_name: e.target.value
                        })
                    }
                />

                <br /><br />

                <input
                    placeholder="Relationship"
                    value={form.relationship}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            relationship: e.target.value
                        })
                    }
                />

                <br /><br />

                <input
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            phone: e.target.value
                        })
                    }
                />

                <br /><br />

                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value
                        })
                    }
                />

                <br /><br />

                <textarea
                    rows="3"
                    placeholder="Medical Notes"
                    value={form.medical_notes}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            medical_notes: e.target.value
                        })
                    }
                />

                <br /><br />

                <button onClick={saveFamily}>
                    {editingId === null
                        ? "➕ Save Family Member"
                        : "💾 Update Family Member"}
                </button>

                {editingId !== null && (
                    <>
                        <button
                            style={{ marginLeft: "10px" }}
                            onClick={clearForm}
                        >
                            Cancel
                        </button>
                    </>
                )}

            </div>

            <br />

            <h2>Family Members</h2>

            {members.length === 0 ? (

                <p>No family members added.</p>

            ) : (

                members.map((member) => (

                    <div
                        key={member.id}
                        style={{
                            background: "white",
                            padding: "20px",
                            marginBottom: "20px",
                            borderRadius: "12px",
                            boxShadow: "0 0 10px rgba(0,0,0,.15)"
                        }}
                    >

                        <h3>
                            👤 {member.first_name} {member.last_name}
                        </h3>

                        <p>
                            <strong>Relationship:</strong>{" "}
                            {member.relationship}
                        </p>

                        <p>
                            <strong>Phone:</strong>{" "}
                            {member.phone}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {member.email}
                        </p>

                        <p>
                            <strong>Medical Notes:</strong>{" "}
                            {member.medical_notes}
                        </p>

                        <div
                            style={{
                                marginTop: "15px"
                            }}
                        >

                            <button
                                onClick={() =>
                                    editMember(member)
                                }
                            >
                                ✏ Edit
                            </button>

                            <button
                                style={{
                                    marginLeft: "10px",
                                    background: "#dc2626",
                                    color: "white"
                                }}
                                onClick={() =>
                                    deleteMember(member.id)
                                }
                            >
                                🗑 Delete
                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>

    );

}

export default Family;
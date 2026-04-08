import { useEffect, useState } from "react";
import axios from "../api/axios";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await axios.get("/users/profile");

        setUser(res.data);

      } catch (error) {
        alert("Failed to load profile");
      }

    };

    fetchProfile();

  }, []);

  if (!user) return <p style={{ padding: "20px" }}>Loading profile...</p>;

  return (

    <div style={{ padding: "30px" }}>

      <h2>👤 User Profile</h2>

      <div style={{
        background: "#1e293b",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "8px",
        width: "400px"
      }}>

        <p><strong>Name:</strong> {user.name}</p>

        <p><strong>Email:</strong> {user.email}</p>

        <p><strong>Score:</strong> {user.score}</p>

        <p><strong>Total Submissions:</strong> {user.totalSubmissions}</p>

        <p><strong>Accepted Submissions:</strong> {user.acceptedSubmissions}</p>

      </div>

    </div>

  );

}

export default Profile;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";



function ContestLeaderboard() {

  const { id } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {

    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`/contests/${id}/leaderboard`);
        setUsers(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load leaderboard");
      }
    };

    fetchLeaderboard();

  }, [id]);

  return (
    <div style={{ padding: "30px" }}>

      <h2 style={{ marginBottom: "20px" }}>🏆 Contest Leaderboard</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#1e293b",
          borderRadius: "8px",
          overflow: "hidden"
        }}
      >

        <thead style={{ background: "#334155" }}>
          <tr>
            <th style={th}>Rank</th>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Score</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user, index) => (

            <tr key={index} style={{ textAlign: "center", borderBottom: "1px solid #475569" }}>

              <td style={td}>
                {index === 0 && "🥇"}
                {index === 1 && "🥈"}
                {index === 2 && "🥉"}
                {index > 2 && index + 1}
              </td>

              <td style={td}>{user.name}</td>

              <td style={td}>{user.email}</td>

              <td style={td}>{user.score}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

const th = {
  padding: "12px",
  textAlign: "center",
  fontWeight: "600"
};

const td = {
  padding: "12px"
};

export default ContestLeaderboard;
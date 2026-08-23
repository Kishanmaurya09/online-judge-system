// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import {
//   Container,
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   Grid
// } from "@mui/material";

// function Leaderboard() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await API.get("/users/leaderboard");
//       setUsers(res.data);
//     };
//     fetch();
//   }, []);

//   const top3 = users.slice(0, 3);
//   const rest = users.slice(3);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         🏆 Leaderboard
//       </Typography>

      
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {top3.map((u, i) => (
//           <Grid item xs={12} md={4} key={i}>
//             <Card
//               sx={{
//                 textAlign: "center",
//                 p: 2,
//                 borderRadius: "16px",
//                 background:
//                   i === 0
//                     ? "linear-gradient(135deg, gold, orange)"
//                     : i === 1
//                     ? "linear-gradient(135deg, silver, gray)"
//                     : "linear-gradient(135deg, #cd7f32, brown)",
//                 color: "black",
//               }}
//             >
//               <CardContent>
//                 <Typography variant="h5">
//                   {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
//                 </Typography>
//                 <Typography variant="h6">{u.name}</Typography>
//                 <Typography>{u.score} pts</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

      
//       <Box>
//         {rest.map((u, i) => (
//           <Card
//             key={i}
//             sx={{
//               mb: 2,
//               p: 2,
//               display: "flex",
//               justifyContent: "space-between",
//               background: "#1e293b",
//               borderRadius: "12px",
//             }}
//           >
//             <Typography>
//               #{i + 4} {u.name}
//             </Typography>
//             <Typography>{u.score} pts</Typography>
//           </Card>
//         ))}
//       </Box>
//     </Container>
//   );
// }

// export default Leaderboard;


import { useEffect, useState } from "react";
import API from "../api/axios";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await API.get("/leaderboard"); // Adjust endpoint if needed
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading Standings...</div>
      </div>
    );
  }

  const topThree = users.slice(0, 3);
  const remainingUsers = users.slice(3);

  // Fallbacks in case top 3 are incomplete
  const first = topThree[0] || { name: "N/A", score: 0 };
  const second = topThree[1] || { name: "N/A", score: 0 };
  const third = topThree[2] || { name: "N/A", score: 0 };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.title}>🏆 Leaderboard</h1>
          <p style={styles.subtitle}>
            Top performing developers ranked by total points earned.
          </p>
        </div>

        {/* Top 3 Podium Cards */}
        {users.length > 0 && (
          <div style={styles.podiumContainer}>
            
            {/* Rank 2 - Silver */}
            <div style={{ ...styles.podiumCard, borderTop: "4px solid #a3b1c6" }}>
              <div style={styles.medalBadge}>🥈</div>
              <div style={styles.podiumRank}>#2 Rank</div>
              <div style={styles.podiumName}>{second.name}</div>
              <div style={styles.podiumScore}>{second.score || 0} pts</div>
            </div>

            {/* Rank 1 - Gold */}
            <div style={{ ...styles.podiumCard, ...styles.goldCard }}>
              <div style={styles.medalBadge}>🥇</div>
              <div style={{ ...styles.podiumRank, color: "#facc15" }}>#1 Champion</div>
              <div style={{ ...styles.podiumName, fontSize: "20px" }}>{first.name}</div>
              <div style={{ ...styles.podiumScore, color: "#facc15" }}>{first.score || 0} pts</div>
            </div>

            {/* Rank 3 - Bronze */}
            <div style={{ ...styles.podiumCard, borderTop: "4px solid #cd7f32" }}>
              <div style={styles.medalBadge}>🥉</div>
              <div style={styles.podiumRank}>#3 Rank</div>
              <div style={styles.podiumName}>{third.name}</div>
              <div style={styles.podiumScore}>{third.score || 0} pts</div>
            </div>

          </div>
        )}

        {/* Full Rankings List / Table */}
        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <span style={{ width: "10%" }}>Rank</span>
            <span style={{ width: "65%" }}>Developer</span>
            <span style={{ width: "25%", textAlign: "right" }}>Score</span>
          </div>

          <div style={styles.tableBody}>
            {users.map((user, index) => (
              <div key={user._id || index} style={styles.tableRow}>
                <div style={{ ...styles.rankCell, width: "10%" }}>
                  <span style={styles.rankBadge}>#{index + 1}</span>
                </div>
                <div style={{ ...styles.nameCell, width: "65%" }}>
                  {user.name}
                </div>
                <div style={{ ...styles.scoreCell, width: "25%", textAlign: "right" }}>
                  {user.score || 0} <span style={{ fontSize: "12px", color: "#8b949e" }}>pts</span>
                </div>
              </div>
            ))}

            {users.length === 0 && (
              <div style={{ padding: "30px", textAlign: "center", color: "#8b949e" }}>
                No rankings available yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  pageBackground: {
    minHeight: "100vh",
    backgroundColor: "#0d1117",
    color: "#c9d1d9",
    padding: "40px 20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    display: "flex",
    justifyContent: "center",
  },
  mainContainer: {
    width: "100%",
    maxWidth: "850px",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  header: {
    borderBottom: "1px solid #30363d",
    paddingBottom: "16px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 6px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#8b949e",
    margin: 0,
  },
  podiumContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    alignItems: "end",
  },
  podiumCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  goldCard: {
    borderTop: "4px solid #facc15",
    backgroundColor: "#1c2129",
    transform: "scale(1.03)",
  },
  medalBadge: {
    fontSize: "32px",
    marginBottom: "8px",
  },
  podiumRank: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#8b949e",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "4px",
  },
  podiumName: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "6px",
  },
  podiumScore: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#58a6ff",
  },
  tableCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    overflow: "hidden",
  },
  tableHeader: {
    display: "flex",
    backgroundColor: "#0d1117",
    padding: "12px 20px",
    borderBottom: "1px solid #30363d",
    fontSize: "12px",
    fontWeight: "700",
    color: "#8b949e",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tableBody: {
    display: "flex",
    flexDirection: "column",
  },
  tableRow: {
    display: "flex",
    alignItems: "center",
    padding: "14px 20px",
    borderBottom: "1px solid #21262d",
    fontSize: "14px",
  },
  rankCell: {
    display: "flex",
    alignItems: "center",
  },
  rankBadge: {
    backgroundColor: "#21262d",
    color: "#8b949e",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600",
  },
  nameCell: {
    fontWeight: "600",
    color: "#f0f6fc",
  },
  scoreCell: {
    fontWeight: "700",
    color: "#58a6ff",
  },
  loadingContainer: {
    minHeight: "100vh",
    backgroundColor: "#0d1117",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#8b949e",
    fontSize: "16px",
  },
};

export default Leaderboard;
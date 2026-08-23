// import { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Grid
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";

// function Dashboard() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await API.get("/users/profile");
//         console.log("PROFILE DATA:", res.data);

//         // ✅ FIX (no .user)
//         setUser(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const cardStyle = {
//     height: "140px",   // 🔥 FIX (sab equal)
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",

//     background: "linear-gradient(135deg, #1e293b, #0f172a)",
//     color: "#fff",
//     borderRadius: "20px",

//     boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
//     transition: "0.3s",

//     "&:hover": {
//       transform: "scale(1.05)",
//       boxShadow: "0 15px 40px rgba(0,0,0,0.6)"
//     }
//   };


//   if (!user) return <p style={{ padding: "20px" }}>Loading...</p>;

//   return (
//     <Container>

//       <Typography
//         variant="h3"
//         mt={5}
//         sx={{
//           fontWeight: "bold",
//           background: "linear-gradient(45deg, #38bdf8, #6366f1)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent"
//         }}
//       >
//         👋 Welcome, {user.name}
//       </Typography>

//       <Grid container spacing={3} mt={2}>

//         <Grid item xs={12} md={4}>
//           <Card sx={cardStyle}>
//             <CardContent>
//               <Typography variant="h6">👤 Name</Typography>
//               <Typography variant="h5">{user.name}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card sx={cardStyle}>
//             <CardContent>
//               <Typography variant="h6">📧 Email</Typography>
//               <Typography>{user.email}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card sx={cardStyle}>
//             <CardContent>
//               <Typography variant="h6">⭐ Score</Typography>
//               <Typography variant="h4">{user.score}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//       </Grid>

//       <Button
//         variant="contained"
//         sx={{
//           mt: 4,
//           borderRadius: "12px",
//           padding: "10px 20px",
//           background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
//           fontWeight: "bold",
//           "&:hover": {
//             background: "linear-gradient(45deg, #ff4b2b, #ff416c)"
//           }
//         }}
//         onClick={handleLogout}
//       >
//         Logout
//       </Button>

//     </Container>
//   );
// }

// export default Dashboard;



import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await API.get("/auth/me"); // Adjust your API route if needed
        setUser(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading Dashboard...</div>
      </div>
    );
  }

  // Fallback if user data is passed via localStorage or props
  const userName = user?.name || localStorage.getItem("userName") || "kishan";
  const userEmail = user?.email || localStorage.getItem("userEmail") || "kishan@gmail.com";
  const userScore = user?.score || 0;

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        
        {/* Welcome Header */}
        <div style={styles.welcomeBanner}>
          <div>
            <h1 style={styles.welcomeTitle}>
              Welcome back, <span style={{ color: "#58a6ff" }}>{userName}</span> 👋
            </h1>
            <p style={styles.welcomeSubtitle}>
              Track your coding stats, solved problems, and overall ranking here.
            </p>
          </div>
        </div>

        {/* Stats Row Cards */}
        <div style={styles.statsGrid}>
          
          {/* User Name Card */}
          <div style={styles.statCard}>
            <div style={styles.cardHeader}>
              <span style={styles.iconBadge}>👤</span>
              <span style={styles.cardLabel}>Developer Name</span>
            </div>
            <div style={styles.cardValue}>{userName}</div>
          </div>

          {/* User Email Card */}
          <div style={styles.statCard}>
            <div style={styles.cardHeader}>
              <span style={styles.iconBadge}>📧</span>
              <span style={styles.cardLabel}>Email Address</span>
            </div>
            <div style={{ ...styles.cardValue, fontSize: "15px" }}>{userEmail}</div>
          </div>

          {/* User Score Card */}
          <div style={{ ...styles.statCard, borderLeft: "3px solid #facc15" }}>
            <div style={styles.cardHeader}>
              <span style={styles.iconBadge}>⭐</span>
              <span style={styles.cardLabel}>Score / Rating</span>
            </div>
            <div style={{ ...styles.cardValue, color: "#facc15" }}>{userScore} pts</div>
          </div>

        </div>

        {/* Quick Actions Panel */}
        <div style={styles.actionCard}>
          <h3 style={styles.actionTitle}>🚀 Quick Actions</h3>
          <div style={styles.actionButtonsGroup}>
            <Link to="/problems" style={{ ...styles.actionBtn, backgroundColor: "#238636" }}>
              Solve Problems
            </Link>
            <Link to="/submissions" style={{ ...styles.actionBtn, backgroundColor: "#316dca" }}>
              My Submissions
            </Link>
            <Link to="/leaderboard" style={{ ...styles.actionBtn, backgroundColor: "#21262d", border: "1px solid #30363d" }}>
              View Leaderboard
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// Custom Developer Dark Mode Styles
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
    maxWidth: "900px", // Perfectly centered width
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  welcomeBanner: {
    paddingBottom: "20px",
    borderBottom: "1px solid #30363d",
  },
  welcomeTitle: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 6px 0",
  },
  welcomeSubtitle: {
    fontSize: "14px",
    color: "#8b949e",
    margin: 0,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  statCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
  },
  iconBadge: {
    fontSize: "16px",
  },
  cardLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#8b949e",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  cardValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#f0f6fc",
    wordBreak: "break-all",
  },
  actionCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "24px",
  },
  actionTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#58a6ff",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: "0 0 16px 0",
  },
  actionButtonsGroup: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
  },
  actionBtn: {
    color: "#ffffff",
    padding: "10px 18px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "opacity 0.2s ease",
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

export default Dashboard;
// import { Container, Typography, Button, Box } from "@mui/material"
// import { Link } from "react-router-dom"

// function AdminPanel() {
//     return (
//         <Container sx={{ mt: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 Admin Panel
//             </Typography>

//             <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//                 <Button variant="contained"
//                     sx={{
//                         background: "linear-gradient(135deg, #6366f1, #22c55e)",
//                         borderRadius: "10px",
//                         px: 3,
//                         py: 1,
//                         fontWeight: "bold",
//                         "&:hover": {
//                             opacity: 0.9,
//                         },
//                     }} component={Link} to="/admin/create-problem">
//                     Create Problem
//                 </Button>

//                 <Button variant="contained"
//                     sx={{
//                         background: "linear-gradient(135deg, #6366f1, #22c55e)",
//                         borderRadius: "10px",
//                         px: 3,
//                         py: 1,
//                         fontWeight: "bold",
//                         "&:hover": {
//                             opacity: 0.9,
//                         },
//                     }} component={Link} to="/admin/problems">
//                     🗂 Manage Problems
//                 </Button>

//                 <Button variant="contained"
//                     sx={{
//                         background: "linear-gradient(135deg, #6366f1, #22c55e)",
//                         borderRadius: "10px",
//                         px: 3,
//                         py: 1,
//                         fontWeight: "bold",
//                         "&:hover": {
//                             opacity: 0.9,
//                         },
//                     }} component={Link} to="/admin/create-contest">
//                     Create Contest
//                 </Button>

//             </Box>
//         </Container>
//     )
// }

// export default AdminPanel


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

function AdminPanel() {
  const [stats, setStats] = useState({ problemsCount: 0, contestsCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const [probRes, contestRes] = await Promise.allSettled([
          API.get("/problems"),
          API.get("/contests"),
        ]);

        setStats({
          problemsCount: probRes.status === "fulfilled" ? probRes.value.data.length : 0,
          contestsCount: contestRes.status === "fulfilled" ? contestRes.value.data.length : 0,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        
        {/* Header Section */}
        <div style={styles.header}>
          <div>
            <div style={styles.adminBadge}>⚡ System Administration</div>
            <h1 style={styles.title}>Admin Control Center</h1>
            <p style={styles.subtitle}>
              Manage coding challenges, configure competitive contests, and monitor platform activity.
            </p>
          </div>
        </div>

        {/* Quick System Metrics */}
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Total Problems</span>
            <span style={styles.metricValue}>{loading ? "..." : stats.problemsCount}</span>
          </div>
          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Total Contests</span>
            <span style={{ ...styles.metricValue, color: "#58a6ff" }}>
              {loading ? "..." : stats.contestsCount}
            </span>
          </div>
          <div style={styles.metricCard}>
            <span style={styles.metricLabel}>Platform Status</span>
            <span style={{ ...styles.metricValue, color: "#4ade80", fontSize: "16px", marginTop: "6px" }}>
              ● Operational
            </span>
          </div>
        </div>

        {/* Management Action Cards */}
        <div style={styles.actionGrid}>
          
          {/* Create Problem */}
          <div style={styles.actionCard}>
            <div style={styles.cardIcon}>📝</div>
            <h3 style={styles.cardTitle}>Create Problem</h3>
            <p style={styles.cardDesc}>
              Add new coding challenges, set constraints, test cases, and difficulty ratings.
            </p>
            <Link to="/admin/create-problem" style={{ ...styles.cardBtn, backgroundColor: "#238636" }}>
              + Create Problem
            </Link>
          </div>

          {/* Manage Problems */}
          <div style={styles.actionCard}>
            <div style={styles.cardIcon}>📁</div>
            <h3 style={styles.cardTitle}>Manage Problems</h3>
            <p style={styles.cardDesc}>
              View, edit, update test cases, or delete existing problems in the repository.
            </p>
            <Link to="/admin/manage-problems" style={{ ...styles.cardBtn, backgroundColor: "#316dca" }}>
              Manage Problems
            </Link>
          </div>

          {/* Create Contest */}
          <div style={styles.actionCard}>
            <div style={styles.cardIcon}>🏆</div>
            <h3 style={styles.cardTitle}>Create Contest</h3>
            <p style={styles.cardDesc}>
              Schedule new contests, assign problem sets, and set start/end timelines.
            </p>
            <Link to="/admin/create-contest" style={{ ...styles.cardBtn, backgroundColor: "#8957e5" }}>
              + Schedule Contest
            </Link>
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
    maxWidth: "950px",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  header: {
    borderBottom: "1px solid #30363d",
    paddingBottom: "20px",
  },
  adminBadge: {
    display: "inline-block",
    backgroundColor: "rgba(210, 153, 34, 0.15)",
    color: "#d29922",
    border: "1px solid rgba(210, 153, 34, 0.4)",
    fontSize: "12px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "12px",
    textTransform: "uppercase",
    marginBottom: "10px",
    letterSpacing: "0.5px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 6px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#8b949e",
    margin: 0,
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
  },
  metricCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
  },
  metricLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#8b949e",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  metricValue: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
    marginTop: "4px",
  },
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  actionCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
  },
  cardIcon: {
    fontSize: "28px",
    marginBottom: "12px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 8px 0",
  },
  cardDesc: {
    fontSize: "13px",
    color: "#8b949e",
    margin: "0 0 20px 0",
    lineHeight: "1.5",
  },
  cardBtn: {
    color: "#ffffff",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    textAlign: "center",
    textDecoration: "none",
    transition: "opacity 0.2s ease",
  },
};

export default AdminPanel;
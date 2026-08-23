// import { useEffect, useState } from "react";
// import axios from "../api/axios";

// function Profile() {

//   const [user, setUser] = useState(null);

//   useEffect(() => {

//     const fetchProfile = async () => {

//       try {

//         const res = await axios.get("/users/profile");

//         setUser(res.data);

//       } catch (error) {
//         alert("Failed to load profile");
//       }

//     };

//     fetchProfile();

//   }, []);

//   if (!user) return <p style={{ padding: "20px" }}>Loading profile...</p>;

//   return (

//     <div style={{ padding: "30px" }}>

//       <h2>👤 User Profile</h2>

//       <div style={{
//         background: "#1e293b",
//         padding: "20px",
//         marginTop: "20px",
//         borderRadius: "8px",
//         width: "400px"
//       }}>

//         <p><strong>Name:</strong> {user.name}</p>

//         <p><strong>Email:</strong> {user.email}</p>

//         <p><strong>Score:</strong> {user.score}</p>

//         <p><strong>Total Submissions:</strong> {user.totalSubmissions}</p>

//         <p><strong>Accepted Submissions:</strong> {user.acceptedSubmissions}</p>

//       </div>

//     </div>

//   );

// }

// export default Profile;




import { useEffect, useState } from "react";
import API from "../api/axios"; // Adjust path if needed

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile"); // Adjust your endpoint
        setUser(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading Profile...</div>
      </div>
    );
  }

  // Fallbacks if data is missing
  const name = user?.name || "Developer";
  const email = user?.email || "N/A";
  const score = user?.score || 0;
  const totalSubmissions = user?.totalSubmissions || 0;
  const acceptedSubmissions = user?.acceptedSubmissions || 0;

  // Accuracy calculation
  const accuracy =
    totalSubmissions > 0
      ? Math.round((acceptedSubmissions / totalSubmissions) * 100)
      : 0;

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        
        {/* Left Column: Profile Card */}
        <div style={styles.profileCard}>
          <div style={styles.avatarWrapper}>
            <div style={styles.avatar}>
              {name.charAt(0).toUpperCase()}
            </div>
            <span style={styles.statusIndicator} title="Online" />
          </div>

          <h2 style={styles.userName}>{name}</h2>
          <p style={styles.userEmail}>{email}</p>

          <div style={styles.badgeRow}>
            <span style={styles.roleBadge}>⚡ Competitive Coder</span>
          </div>

          <div style={styles.divider} />

          <div style={styles.infoGroup}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Member Since</span>
              <span style={styles.infoValue}>2026</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Platform Rank</span>
              <span style={{ ...styles.infoValue, color: "#58a6ff" }}>Candidate</span>
            </div>
          </div>
        </div>

        {/* Right Column: Analytics & Metrics */}
        <div style={styles.statsContainer}>
          
          <h3 style={styles.sectionTitle}>📊 Developer Statistics</h3>

          {/* Quick Metrics Grid */}
          <div style={styles.metricsGrid}>
            <div style={styles.metricCard}>
              <span style={styles.metricLabel}>Total Score</span>
              <span style={{ ...styles.metricValue, color: "#e3b341" }}>
                {score} <span style={{ fontSize: "14px" }}>pts</span>
              </span>
            </div>

            <div style={styles.metricCard}>
              <span style={styles.metricLabel}>Accepted Submissions</span>
              <span style={{ ...styles.metricValue, color: "#3fb950" }}>
                {acceptedSubmissions}
              </span>
            </div>

            <div style={styles.metricCard}>
              <span style={styles.metricLabel}>Total Attempts</span>
              <span style={styles.metricValue}>{totalSubmissions}</span>
            </div>

            <div style={styles.metricCard}>
              <span style={styles.metricLabel}>Accuracy Rate</span>
              <span style={{ ...styles.metricValue, color: "#58a6ff" }}>
                {accuracy}%
              </span>
            </div>
          </div>

          {/* Submission Accuracy Visual Progress */}
          <div style={styles.progressCard}>
            <div style={styles.progressHeader}>
              <span style={styles.progressTitle}>Submission Success Rate</span>
              <span style={styles.progressPercent}>{accuracy}%</span>
            </div>
            <div style={styles.progressBarTrack}>
              <div
                style={{
                  ...styles.progressBarFill,
                  width: `${accuracy}%`,
                }}
              />
            </div>
            <p style={styles.progressSubtext}>
              {acceptedSubmissions} of {totalSubmissions} total solutions passed test cases.
            </p>
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
    maxWidth: "1000px",
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "28px",
    alignItems: "start",
  },
  profileCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "12px",
    padding: "28px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: "16px",
  },
  avatar: {
    width: "88px",
    height: "88px",
    borderRadius: "50%",
    backgroundColor: "#21262d",
    color: "#58a6ff",
    border: "2px solid #30363d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "700",
  },
  statusIndicator: {
    position: "absolute",
    bottom: "4px",
    right: "4px",
    width: "14px",
    height: "14px",
    backgroundColor: "#3fb950",
    borderRadius: "50%",
    border: "2px solid #161b22",
  },
  userName: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 4px 0",
    textTransform: "capitalize",
  },
  userEmail: {
    fontSize: "13px",
    color: "#8b949e",
    margin: "0 0 16px 0",
  },
  badgeRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  roleBadge: {
    backgroundColor: "rgba(56, 139, 253, 0.15)",
    color: "#58a6ff",
    border: "1px solid rgba(56, 139, 253, 0.4)",
    fontSize: "11px",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "12px",
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#30363d",
    margin: "8px 0 16px 0",
  },
  infoGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  infoItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
  },
  infoLabel: {
    color: "#8b949e",
  },
  infoValue: {
    color: "#c9d1d9",
    fontWeight: "600",
  },
  statsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },
  metricCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "20px 16px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
  metricLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#8b949e",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  metricValue: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#ffffff",
    marginTop: "6px",
  },
  progressCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "20px",
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  progressTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
  },
  progressPercent: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#3fb950",
  },
  progressBarTrack: {
    width: "100%",
    height: "8px",
    backgroundColor: "#21262d",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#2ea043",
    borderRadius: "4px",
    transition: "width 0.4s ease",
  },
  progressSubtext: {
    fontSize: "12px",
    color: "#8b949e",
    margin: 0,
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

export default UserProfile;
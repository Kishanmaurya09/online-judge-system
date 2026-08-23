// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import { Link } from "react-router-dom";

// function Contests() {
//   const [contests, setContests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchContests = async () => {
//       try {
//         const res = await axios.get("/contests");
//         setContests(res.data);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to load contests");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContests();
//   }, []);

//   if (loading) return <p style={{ padding: 20 }}>Loading contests...</p>;

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Contests</h2>

//       {contests.length === 0 ? (
//         <p>No contests available</p>
//       ) : (
//         contests.map((contest) => (
//           <div
//             key={contest._id}
//             style={{
//               background: "#1e293b",
//               padding: "16px",
//               marginBottom: "12px",
//               borderRadius: "8px",
//             }}
//           >
//             <h3>{contest.title}</h3>
//             <p>{contest.description}</p>

//             <p>
//               Start: {new Date(contest.startTime).toLocaleString()}
//               <br />
//               End: {new Date(contest.endTime).toLocaleString()}
//             </p>

//             <Link to={`/contests/${contest._id}`}>
//   <button >View Contest</button>
// </Link>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Contests;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Contests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await API.get("/contests"); // Adjust API route if needed
        setContests(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const getContestStatus = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) {
      return { label: "Upcoming", color: "#facc15", bg: "rgba(250, 204, 21, 0.1)" };
    } else if (now >= start && now <= end) {
      return { label: "Live Now", color: "#4ade80", bg: "rgba(74, 222, 128, 0.1)" };
    } else {
      return { label: "Ended", color: "#8b949e", bg: "rgba(139, 148, 158, 0.1)" };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading Contests...</div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.title}>⚔️ Programming Contests</h1>
          <p style={styles.subtitle}>
            Compete with developers worldwide, solve challenges, and climb the leaderboard.
          </p>
        </div>

        {/* Contests Grid */}
        <div style={styles.grid}>
          {contests.map((contest) => {
            const status = getContestStatus(contest.startTime, contest.endTime);

            return (
              <div key={contest._id} style={styles.contestCard}>
                
                {/* Status Badge & Header */}
                <div style={styles.cardHeader}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      color: status.color,
                      backgroundColor: status.bg,
                      border: `1px solid ${status.color}40`,
                    }}
                  >
                    ● {status.label}
                  </span>
                </div>

                {/* Contest Info */}
                <h3 style={styles.contestTitle}>{contest.title}</h3>
                <p style={styles.contestDescription}>
                  {contest.description || "No description provided."}
                </p>

                {/* Time Schedule Box */}
                <div style={styles.timeBox}>
                  <div style={styles.timeRow}>
                    <span style={styles.timeLabel}>Start:</span>
                    <span style={styles.timeVal}>{formatDate(contest.startTime)}</span>
                  </div>
                  <div style={styles.timeRow}>
                    <span style={styles.timeLabel}>End:</span>
                    <span style={styles.timeVal}>{formatDate(contest.endTime)}</span>
                  </div>
                </div>

                {/* Action Link Button */}
                <Link
                  to={`/contests/${contest._id}`}
                  style={styles.viewBtn}
                >
                  View Contest Details →
                </Link>

              </div>
            );
          })}

          {contests.length === 0 && (
            <div style={styles.emptyState}>
              No contests scheduled at the moment. Check back later!
            </div>
          )}
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  contestCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "12px",
  },
  statusBadge: {
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  contestTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 8px 0",
  },
  contestDescription: {
    fontSize: "13px",
    color: "#8b949e",
    margin: "0 0 16px 0",
    lineHeight: "1.4",
  },
  timeBox: {
    backgroundColor: "#0d1117",
    border: "1px solid #21262d",
    borderRadius: "6px",
    padding: "10px 12px",
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  timeRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
  },
  timeLabel: {
    color: "#8b949e",
    fontWeight: "500",
  },
  timeVal: {
    color: "#c9d1d9",
    fontWeight: "600",
  },
  viewBtn: {
    backgroundColor: "#21262d",
    color: "#58a6ff",
    border: "1px solid #30363d",
    borderRadius: "6px",
    padding: "10px",
    fontSize: "13px",
    fontWeight: "600",
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.2s ease",
  },
  emptyState: {
    gridColumn: "1 / -1",
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "40px",
    textAlign: "center",
    color: "#8b949e",
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

export default Contests;
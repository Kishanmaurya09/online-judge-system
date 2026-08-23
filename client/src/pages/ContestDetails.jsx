// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../api/axios";
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   Box,
//   LinearProgress
// } from "@mui/material";

// // ✅ STATUS FUNCTIONS
// const getStatusColor = (status) => {
//   if (status === "Accepted") return "#22c55e";
//   if (status === "Wrong") return "#ef4444";
//   return "#facc15";
// };

// const getStatusText = (status) => {
//   if (status === "Accepted") return "Accepted";
//   if (status === "Wrong") return "Wrong";
//   return "Not Attempted";
// };

// function ContestDetail() {
//   const { id } = useParams();

//   const [contest, setContest] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [timeLeft, setTimeLeft] = useState("");

//   // ✅ FETCH CONTEST
//   useEffect(() => {
//     const fetchContest = async () => {
//       try {
//         const res = await API.get(`/contests/${id}`);
//         setContest(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchContest();
//   }, [id]);

//   // ✅ FETCH USER SUBMISSIONS
//   useEffect(() => {
//     const fetchSubs = async () => {
//       try {
//         const res = await API.get(`/submissions/my`);
//         setSubmissions(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchSubs();
//   }, []);

//   // ✅ GET STATUS (MAIN FIX)
//   const getProblemStatus = (problemId) => {
//     const sub = submissions.find(
//       (s) => s.problem?._id === problemId
//     );

//     if (!sub) return "Not Attempted";
//     return sub.status;
//   };

//   // ✅ TIMER
//   useEffect(() => {
//     if (!contest) return;

//     const interval = setInterval(() => {
//       const now = new Date();
//       const start = new Date(contest.startTime);
//       const end = new Date(contest.endTime);

//       if (now > end) {
//         setTimeLeft("Contest Ended");
//         clearInterval(interval);
//         return;
//       }

//       let diff;

//       if (now < start) diff = start - now;
//       else diff = end - now;

//       const h = Math.floor(diff / (1000 * 60 * 60));
//       const m = Math.floor((diff / (1000 * 60)) % 60);
//       const s = Math.floor((diff / 1000) % 60);

//       setTimeLeft(`${h}h ${m}m ${s}s`);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [contest]);

//   // ✅ PROGRESS BAR
//   const getProgress = () => {
//     if (!contest) return 0;

//     const now = new Date();
//     const start = new Date(contest.startTime);
//     const end = new Date(contest.endTime);

//     if (now < start) return 0;
//     if (now > end) return 100;

//     return ((now - start) / (end - start)) * 100;
//   };

//   if (!contest) return <p style={{ padding: "20px" }}>Loading...</p>;

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>

//       {/* HEADER */}
//       <Typography variant="h4" sx={{ fontWeight: "bold" }}>
//         🏆 {contest.title}
//       </Typography>

//       <Typography sx={{ color: "gray", mb: 2 }}>
//         {contest.description}
//       </Typography>

//       {/* TIMER */}
//       <Typography sx={{ color: "#22c55e", fontWeight: "bold" }}>
//         ⏳ {timeLeft}
//       </Typography>

//       {/* PROGRESS BAR */}
//       <Box sx={{ my: 2 }}>
//         <LinearProgress
//           variant="determinate"
//           value={getProgress()}
//           sx={{
//             height: 10,
//             borderRadius: 5,
//             backgroundColor: "#1e293b",
//           }}
//         />
//       </Box>

//       {/* TIME */}
//       <Typography>
//         ⏱ Start: {new Date(contest.startTime).toLocaleString()}
//       </Typography>
//       <Typography>
//         ⏱ End: {new Date(contest.endTime).toLocaleString()}
//       </Typography>

//       {/* PROBLEMS */}
//       <Typography mt={4} variant="h5">
//         📘 Problems
//       </Typography>

//       {contest.problems.map((p) => {
//         const status = getProblemStatus(p._id);

//         return (
//           <Card
//             key={p._id}
//             sx={{
//               mt: 2,
//               p: 2,
//               borderRadius: "16px",
//               background: "#1e293b",
//               transition: "0.3s",
//               "&:hover": {
//                 transform: "translateY(-5px)",
//                 boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
//               },
//             }}
//           >
//             <CardContent>

//               {/* TITLE */}
//               <Typography variant="h6">
//                 {p.title} ({p.difficulty})
//               </Typography>

//               {/* STATUS BADGE */}
//               <Box
//                 sx={{
//                   display: "inline-block",
//                   mt: 1,
//                   px: 2,
//                   py: 0.5,
//                   borderRadius: "20px",
//                   background: getStatusColor(status),
//                   color: "black",
//                   fontWeight: "bold",
//                   fontSize: "12px",
//                 }}
//               >
//                 {getStatusText(status)}
//               </Box>

//               {/* BUTTONS */}
//               <Box mt={2}>

//                 <Button
//                   variant="contained"
//                   sx={{
//                     mr: 2,
//                     borderRadius: "10px",
//                     background:
//                       "linear-gradient(135deg, #22c55e, #16a34a)",
//                   }}
//                   href={`/solve/${p._id}`}
//                   disabled={timeLeft === "Contest Ended"}
//                 >
//                   🚀 Solve
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   sx={{
//                     borderRadius: "10px",
//                     color: "#38bdf8",
//                     borderColor: "#38bdf8",
//                   }}
//                   href={`/contest/${id}/leaderboard`}
//                 >
//                   📊 Leaderboard
//                 </Button>

//               </Box>

//             </CardContent>
//           </Card>
//         );
//       })}

//     </Container>
//   );
// }

// export default ContestDetail;



import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function ContestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const res = await API.get(`/contests/${id}`); // Adjust endpoint if needed
        setContest(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContest();
  }, [id]);

  const getContestStatus = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) {
      return { label: "Upcoming", color: "#facc15", bg: "rgba(250, 204, 21, 0.1)" };
    } else if (now >= start && now <= end) {
      return { label: "Live Now", color: "#4ade80", bg: "rgba(74, 222, 128, 0.1)" };
    } else {
      return { label: "Contest Ended", color: "#f87171", bg: "rgba(248, 113, 113, 0.1)" };
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
        <div style={styles.loadingText}>Loading Contest Details...</div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Contest not found.</div>
      </div>
    );
  }

  const status = getContestStatus(contest.startTime, contest.endTime);

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        
        {/* Navigation Bar */}
        <div>
          <button style={styles.backBtn} onClick={() => navigate("/contests")}>
            ← Back to Contests
          </button>
        </div>

        {/* Contest Header Card */}
        <div style={styles.headerCard}>
          <div style={styles.headerTop}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "24px" }}>🏆</span>
              <h1 style={styles.title}>{contest.title}</h1>
            </div>
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

          <p style={styles.description}>
            {contest.description || "No description provided."}
          </p>

          <div style={styles.metaRow}>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Start Time</span>
              <span style={styles.metaValue}>{formatDate(contest.startTime)}</span>
            </div>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>End Time</span>
              <span style={styles.metaValue}>{formatDate(contest.endTime)}</span>
            </div>
          </div>
        </div>

        {/* Problems List Section */}
        <div style={styles.sectionCard}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>📘 Contest Problems</h3>
          </div>

          <div style={styles.problemsList}>
            {contest.problems && contest.problems.length > 0 ? (
              contest.problems.map((prob, index) => (
                <div key={prob._id || index} style={styles.problemItem}>
                  <div style={styles.problemInfo}>
                    <span style={styles.problemIndex}>#{index + 1}</span>
                    <div>
                      <h4 style={styles.problemTitle}>{prob.title || "Untitled Problem"}</h4>
                      <span
                        style={{
                          ...styles.difficultyBadge,
                          color:
                            prob.difficulty?.toLowerCase() === "easy"
                              ? "#4ade80"
                              : prob.difficulty?.toLowerCase() === "medium"
                              ? "#facc15"
                              : "#f87171",
                        }}
                      >
                        {prob.difficulty || "Easy"}
                      </span>
                    </div>
                  </div>

                  <div style={styles.problemActions}>
                    <Link
                      to={`/problems/${prob._id}`}
                      style={styles.solveBtn}
                    >
                      ▶ Solve Challenge
                    </Link>
                    <Link
                      to={`/leaderboard`}
                      style={styles.leaderboardBtn}
                    >
                      📊 Standings
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.emptyText}>
                No problems assigned to this contest yet.
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
    maxWidth: "900px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  backBtn: {
    backgroundColor: "#21262d",
    color: "#c9d1d9",
    border: "1px solid #30363d",
    borderRadius: "6px",
    padding: "6px 14px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "500",
  },
  headerCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "24px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    flexWrap: "wrap",
    gap: "12px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },
  statusBadge: {
    fontSize: "12px",
    fontWeight: "700",
    padding: "4px 12px",
    borderRadius: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  description: {
    fontSize: "14px",
    color: "#8b949e",
    margin: "0 0 20px 0",
    lineHeight: "1.5",
  },
  metaRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    backgroundColor: "#0d1117",
    padding: "14px 18px",
    borderRadius: "8px",
    border: "1px solid #21262d",
  },
  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  metaLabel: {
    fontSize: "12px",
    color: "#8b949e",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  metaValue: {
    fontSize: "14px",
    color: "#f0f6fc",
    fontWeight: "600",
  },
  sectionCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    overflow: "hidden",
  },
  sectionHeader: {
    backgroundColor: "#0d1117",
    padding: "14px 20px",
    borderBottom: "1px solid #30363d",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#58a6ff",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: 0,
  },
  problemsList: {
    display: "flex",
    flexDirection: "column",
  },
  problemItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid #21262d",
    flexWrap: "wrap",
    gap: "12px",
  },
  problemInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  problemIndex: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#8b949e",
    backgroundColor: "#21262d",
    padding: "4px 10px",
    borderRadius: "6px",
  },
  problemTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 4px 0",
  },
  difficultyBadge: {
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  problemActions: {
    display: "flex",
    gap: "10px",
  },
  solveBtn: {
    backgroundColor: "#238636",
    color: "#ffffff",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    textDecoration: "none",
  },
  leaderboardBtn: {
    backgroundColor: "#21262d",
    color: "#c9d1d9",
    border: "1px solid #30363d",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    textDecoration: "none",
  },
  emptyText: {
    padding: "30px",
    textAlign: "center",
    color: "#8b949e",
    fontSize: "14px",
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

export default ContestDetails;
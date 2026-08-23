// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import { Container, Typography, Card } from "@mui/material";

// function MySubmissions() {
//   const [subs, setSubs] = useState([]);

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await API.get("/submissions/my");
//       setSubs(res.data);
//     };
//     fetch();
//   }, []);

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4">📜 My Submissions</Typography>

//       {subs.map((s, i) => (
//         <Card
//           key={i}
//           sx={{
//             mt: 2,
//             p: 2,
//             background: "#1e293b",
//             borderRadius: "12px",
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <div>
//             <Typography>{s.problem?.title}</Typography>
//             <Typography variant="body2" color="gray">
//               {new Date(s.createdAt).toLocaleString()}
//             </Typography>
//           </div>

//           <Typography
//             sx={{
//               color:
//                 s.status === "Accepted"
//                   ? "#22c55e"
//                   : s.status === "Wrong"
//                   ? "#ef4444"
//                   : "#facc15",
//               fontWeight: "bold",
//             }}
//           >
//             {s.status}
//           </Typography>
//         </Card>
//       ))}
//     </Container>
//   );
// }

// export default MySubmissions;




import { useEffect, useState } from "react";
import API from "../api/axios"; // Path apne axios instance ke hisab se check kar lein

function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await API.get("/submissions");
        setSubmissions(res.data);
      } catch (err) {
        console.log("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const getStatusBadge = (status) => {
    const isAccepted = status?.toLowerCase() === "accepted";
    return (
      <span
        style={{
          fontSize: "12px",
          fontWeight: "700",
          padding: "4px 10px",
          borderRadius: "12px",
          backgroundColor: isAccepted
            ? "rgba(63, 185, 80, 0.15)"
            : "rgba(248, 113, 113, 0.15)",
          color: isAccepted ? "#3fb950" : "#f87171",
          border: `1px solid ${isAccepted ? "rgba(63, 185, 80, 0.3)" : "rgba(248, 113, 113, 0.3)"}`,
        }}
      >
        ● {status || "Evaluated"}
      </span>
    );
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
        <div style={styles.loadingText}>Loading Submissions...</div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>📜 My Submissions</h1>
          <p style={styles.subtitle}>
            Review your code execution history and evaluation verdicts.
          </p>
        </div>

        <div style={styles.tableCard}>
          {submissions && submissions.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.thRow}>
                    <th style={styles.th}>Problem</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Language</th>
                    <th style={styles.th}>Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub, index) => (
                    <tr key={sub._id || index} style={styles.tr}>
                      <td style={{ ...styles.td, fontWeight: "600", color: "#f0f6fc" }}>
                        {sub.problemId?.title || sub.problemTitle || "Untitled Problem"}
                      </td>
                      <td style={styles.td}>{getStatusBadge(sub.status)}</td>
                      <td style={styles.td}>
                        <span style={styles.langBadge}>
                          {sub.language || "C++"}
                        </span>
                      </td>
                      <td style={{ ...styles.td, color: "#8b949e", fontSize: "13px" }}>
                        {formatDate(sub.createdAt || sub.submittedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={styles.emptyContainer}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>⏳</div>
              <p style={{ margin: 0, color: "#8b949e", fontSize: "14px" }}>
                No code submissions found yet.
              </p>
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
    maxWidth: "1000px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  header: {
    borderBottom: "1px solid #30363d",
    paddingBottom: "16px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 6px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#8b949e",
    margin: 0,
  },
  tableCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  thRow: {
    backgroundColor: "#0d1117",
    borderBottom: "1px solid #30363d",
  },
  th: {
    padding: "14px 18px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#8b949e",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tr: {
    borderBottom: "1px solid #21262d",
  },
  td: {
    padding: "16px 18px",
    fontSize: "14px",
  },
  langBadge: {
    backgroundColor: "#21262d",
    color: "#58a6ff",
    border: "1px solid #30363d",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    fontFamily: "monospace",
  },
  emptyContainer: {
    padding: "40px 20px",
    textAlign: "center",
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

export default MySubmissions;
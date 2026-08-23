// import { useEffect, useState } from "react"
// import { useParams, Link } from "react-router-dom"
// import {
//   Container,
//   Typography,
//   Chip,
//   Box,
//   CircularProgress,
//   Button,
//   Paper
// } from "@mui/material"
// import API from "../api/axios"

// function ProblemDetail() {
//   const { id } = useParams()
//   const [problem, setProblem] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchProblem = async () => {
//       try {
//         const res = await API.get(`/problems/${id}`)
//         setProblem(res.data)
//       } catch (err) {
//         console.log(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProblem()
//   }, [id])

//   const difficultyColor = (level) => {
//     if (level === "easy") return "success"
//     if (level === "medium") return "warning"
//     if (level === "hard") return "error"
//     return "default"
//   }

//   if (loading) return <CircularProgress />

//   if (!problem) return <Typography>Problem not found</Typography>

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         {problem.title}
//       </Typography>

//       <Chip
//         label={problem.difficulty}
//         color={difficultyColor(problem.difficulty)}
//         sx={{ mb: 2 }}
//       />

//       <Paper sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h6">Description</Typography>
//         <Typography>{problem.description}</Typography>
//       </Paper>

//       <Paper sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h6">Constraints</Typography>
//         <Typography>{problem.constraints}</Typography>
//       </Paper>

//       <Paper sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h6">Input Format</Typography>
//         <Typography>{problem.inputFormat}</Typography>
//       </Paper>

//       <Paper sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h6">Output Format</Typography>
//         <Typography>{problem.outputFormat}</Typography>
//       </Paper>

//       <Paper sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h6">Sample Input</Typography>
//         <Typography>{problem.sampleInput}</Typography>
//       </Paper>

//       <Paper sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h6">Sample Output</Typography>
//         <Typography>{problem.sampleOutput}</Typography>
//       </Paper>

//       <Button
//         variant="contained"
//         component={Link}
//         to={`/solve/${problem._id}`}
//       >
//         Solve Problem
//       </Button>
//     </Container>
//   )
// }

// export default ProblemDetail



import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await API.get(`/problems/${id}`);
        setProblem(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const getDifficultyStyle = (difficulty) => {
    const diff = difficulty?.toLowerCase();
    if (diff === "easy") {
      return {
        backgroundColor: "rgba(34, 197, 94, 0.12)",
        color: "#4ade80",
        border: "1px solid rgba(34, 197, 94, 0.25)",
      };
    }
    if (diff === "medium") {
      return {
        backgroundColor: "rgba(234, 179, 8, 0.12)",
        color: "#facc15",
        border: "1px solid rgba(234, 179, 8, 0.25)",
      };
    }
    return {
      backgroundColor: "rgba(239, 68, 68, 0.12)",
      color: "#f87171",
      border: "1px solid rgba(239, 68, 68, 0.25)",
    };
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading problem details...</div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Problem not found.</div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        
        {/* Top Navigation & Action Header */}
        <div style={styles.headerRow}>
          <div>
            <div style={styles.titleContainer}>
              <h1 style={styles.title}>{problem.title}</h1>
              <span style={{ ...styles.badge, ...getDifficultyStyle(problem.difficulty) }}>
                {problem.difficulty}
              </span>
            </div>
            <p style={styles.subtitle}>Read the constraints carefully before submitting.</p>
          </div>

          <Link to={`/solve/${problem._id}`} style={styles.solveBtn}>
            Solve Problem ⚡
          </Link>
        </div>

        {/* Content Sections */}
        <div style={styles.contentStack}>
          
          {/* Description */}
          {problem.description && (
            <div style={styles.card}>
              <h3 style={styles.sectionHeading}>Description</h3>
              <p style={styles.textBody}>{problem.description}</p>
            </div>
          )}

          {/* Constraints */}
          {problem.constraints && (
            <div style={styles.card}>
              <h3 style={styles.sectionHeading}>Constraints</h3>
              <div style={styles.codeBlock}>{problem.constraints}</div>
            </div>
          )}

          {/* Formats Grid */}
          {(problem.inputFormat || problem.outputFormat) && (
            <div style={styles.gridTwo}>
              {problem.inputFormat && (
                <div style={styles.card}>
                  <h3 style={styles.sectionHeading}>Input Format</h3>
                  <p style={styles.textBody}>{problem.inputFormat}</p>
                </div>
              )}
              {problem.outputFormat && (
                <div style={styles.card}>
                  <h3 style={styles.sectionHeading}>Output Format</h3>
                  <p style={styles.textBody}>{problem.outputFormat}</p>
                </div>
              )}
            </div>
          )}

          {/* Sample Cases */}
          {(problem.sampleInput || problem.sampleOutput) && (
            <div style={styles.gridTwo}>
              {problem.sampleInput && (
                <div style={styles.card}>
                  <h3 style={styles.sectionHeading}>Sample Input</h3>
                  <div style={styles.codeBlock}>{problem.sampleInput}</div>
                </div>
              )}
              {problem.sampleOutput && (
                <div style={styles.card}>
                  <h3 style={styles.sectionHeading}>Sample Output</h3>
                  <div style={styles.codeBlock}>{problem.sampleOutput}</div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Custom Developer-centric Inline Styles
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
    maxWidth: "900px", // Centered width alignment
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "24px",
    borderBottom: "1px solid #30363d",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "16px",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },
  subtitle: {
    fontSize: "14px",
    color: "#8b949e",
    margin: "6px 0 0 0",
  },
  badge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  solveBtn: {
    backgroundColor: "#238636",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    textDecoration: "none",
    boxShadow: "0 4px 12px rgba(35, 134, 54, 0.3)",
    transition: "background-color 0.2s ease",
  },
  contentStack: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  gridTwo: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
  sectionHeading: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#58a6ff",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    margin: "0 0 12px 0",
  },
  textBody: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#e6edf3",
    margin: 0,
    whiteSpace: "pre-line",
  },
  codeBlock: {
    backgroundColor: "#0d1117",
    border: "1px solid #21262d",
    borderRadius: "6px",
    padding: "12px 16px",
    fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
    fontSize: "14px",
    color: "#7ee787",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
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

export default ProblemDetail;
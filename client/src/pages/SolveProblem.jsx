// import { useParams } from "react-router-dom"
// import { useState } from "react"
// import Editor from "@monaco-editor/react"
// import {
//   Container,
//   Typography,
//   Button,
//   Box,
//   MenuItem,
//   Select
// } from "@mui/material"
// // import API from "../api/axios"

// function SolveProblem() {
//   const { id } = useParams()


//   const [language, setLanguage] = useState("python")
//   const [code, setCode] = useState("# Write your code here")
//   const [customInput, setCustomInput] = useState("")
//   const [output, setOutput] = useState("")
//   const [verdict, setVerdict] = useState("")
//   const [running, setRunning] = useState(false)
//   const [submitting, setSubmitting] = useState(false)

//   const handleRun = async () => {
//     try {
//       setRunning(true)

//       const token = localStorage.getItem("token")

//       const res = await API.post("/submissions/run", {
//   code,
//   language: "python",
//   input: customInput || "5 7"
// })

//       setOutput(res.data.output)
//     } catch (err) {
//       console.error(err)
//       setOutput("Error running code")
//     } finally {
//       setRunning(false)   
//     }
//   }


//   const handleSubmit = async () => {
//     try {
//       setSubmitting(true)
//       setVerdict("")

//       const res = await API.post("/submissions", {
//   problemId: id,
//   code: code,
//   language: language
// })

//       setVerdict(res.data.status || "Submitted")
//     } catch (err) {
//       alert(err.response?.data?.message || "Submission failed");
//       console.error(err)
      
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Solve Problem
//       </Typography>

//       <Typography variant="body2" gutterBottom>
//         Problem ID: {id}
//       </Typography>


//       <Box sx={{ mb: 2 }}>
//         <Select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//           size="small"
//         >
//           <MenuItem value="python">Python</MenuItem>
//           <MenuItem value="javascript">JavaScript</MenuItem>
//           <MenuItem value="cpp">C++</MenuItem>
//         </Select>
//       </Box>

//       <Editor
//         height="60vh"
//         theme="vs-dark"
//         language={language}
//         value={code}
//         onChange={(value) => setCode(value || "")}
//       />

//       <textarea
//         placeholder="Custom input (optional)"
//         value={customInput}
//         onChange={(e) => setCustomInput(e.target.value)}
//         style={{
//           width: "100%",
//           height: "80px",
//           marginTop: "10px",
//           background: "#0f172a",
//           color: "white",
//           border: "1px solid #334155",
//           borderRadius: "8px",
//           padding: "10px"
//         }}
//       />


//       <Box sx={{ mt: 2 }}>
//         <Button
//           variant="contained"
//           sx={{ mr: 2 }}
//           onClick={handleRun}
//         >
//           ▶ {running ? "Running..." : "Run Code"}
//         </Button>

//         <Button
//           variant="contained"
//           color="success"
//           onClick={handleSubmit}
//         >
//           ✅ {submitting ? "Submitting..." : "Submit Code"}
//         </Button>
//       </Box>


//       <Box sx={{ mt: 3 }}>
//         <Typography variant="h6">Output:</Typography>
//         <Box
//           sx={{
//             background: "#0d1117",
//             p: 2,
//             borderRadius: 1,
//             minHeight: "80px",
//             fontFamily: "monospace",
//             whiteSpace: "pre-wrap"
//           }}
//         >
//           {output || "Run your code to see output"}
//         </Box>
//       </Box>

//       <Box sx={{ mt: 3 }}>
//         <Typography variant="h6">Verdict:</Typography>
//         <Box
//           sx={{
//             background: "#0d1117",
//             p: 2,
//             borderRadius: 1,
//             minHeight: "60px",
//             fontFamily: "monospace"
//           }}
//         >
//           {verdict || "Submit code to see verdict"}
//         </Box>
//       </Box>
//     </Container>
//   )
// }

// export default SolveProblem




import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function SolveProblem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("# Write your code here\n");
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("");
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const handleRunCode = async () => {
    setRunning(true);
    setOutput("Executing code...");
    try {
      const res = await API.post("/run", {
        problemId: id,
        language,
        code,
        input: customInput,
      });
      setOutput(res.data.output || "No output returned.");
    } catch (err) {
      setOutput(err.response?.data?.error || "Error running code.");
    } finally {
      setRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    setSubmitting(true);
    setVerdict("Testing against test cases...");
    try {
      const res = await API.post("/submit", {
        problemId: id,
        language,
        code,
      });
      setVerdict(res.data.verdict || "Submitted successfully.");
    } catch (err) {
      setVerdict(err.response?.data?.error || "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading Editor...</div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        
        {/* Top Header */}
        <div style={styles.topHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button style={styles.backBtn} onClick={() => navigate(-1)}>
              ← Back
            </button>
            <h2 style={styles.headerTitle}>
              {problem ? problem.title : "Solve Problem"}
            </h2>
          </div>

          {/* Language Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={styles.label}>Language:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={styles.selectInput}
            >
              <option value="python">Python 3</option>
              <option value="cpp">C++ 17</option>
              <option value="javascript">JavaScript (Node)</option>
              <option value="java">Java 11</option>
            </select>
          </div>
        </div>

        {/* Code Editor Box */}
        <div style={styles.editorCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardHeaderTitle}>⚡ Code Editor</span>
            <span style={{ fontSize: "12px", color: "#6e7681" }}>
              Problem ID: {id}
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={styles.codeTextarea}
            placeholder="// Write your solution code here..."
            spellCheck="false"
          />
        </div>

        {/* Custom Input & Control Buttons Bar */}
        <div style={styles.editorCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardHeaderTitle}>📥 Custom Input (Optional)</span>
          </div>
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            style={styles.inputTextarea}
            placeholder="Enter custom input here..."
            spellCheck="false"
          />
          <div style={styles.buttonGroup}>
            <button
              onClick={handleRunCode}
              disabled={running}
              style={{ ...styles.btn, ...styles.runBtn }}
            >
              {running ? "Running..." : "▶ Run Code"}
            </button>
            <button
              onClick={handleSubmitCode}
              disabled={submitting}
              style={{ ...styles.btn, ...styles.submitBtn }}
            >
              {submitting ? "Submitting..." : "✓ Submit Code"}
            </button>
          </div>
        </div>

        {/* Console / Output Grid */}
        <div style={styles.consoleGrid}>
          
          {/* Execution Output */}
          <div style={styles.editorCard}>
            <div style={styles.cardHeader}>
              <span style={styles.cardHeaderTitle}>💻 Output</span>
            </div>
            <pre style={styles.consoleBox}>
              {output || "Run your code to see output here..."}
            </pre>
          </div>

          {/* Verdict Status */}
          <div style={styles.editorCard}>
            <div style={styles.cardHeader}>
              <span style={styles.cardHeaderTitle}>🏆 Verdict Status</span>
            </div>
            <div
              style={{
                ...styles.consoleBox,
                color: verdict.toLowerCase().includes("accepted")
                  ? "#4ade80"
                  : verdict.toLowerCase().includes("fail") ||
                    verdict.toLowerCase().includes("error")
                  ? "#f87171"
                  : "#facc15",
              }}
            >
              {verdict || "Submit code to see verdict status..."}
            </div>
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
    padding: "30px 20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    display: "flex",
    justifyContent: "center",
  },
  mainContainer: {
    width: "100%",
    maxWidth: "950px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  topHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
    borderBottom: "1px solid #30363d",
    flexWrap: "wrap",
    gap: "12px",
  },
  backBtn: {
    backgroundColor: "#21262d",
    color: "#c9d1d9",
    border: "1px solid #30363d",
    borderRadius: "6px",
    padding: "6px 12px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },
  label: {
    fontSize: "13px",
    color: "#8b949e",
  },
  selectInput: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    color: "#f0f6fc",
    borderRadius: "6px",
    padding: "6px 12px",
    fontSize: "13px",
    outline: "none",
    cursor: "pointer",
  },
  editorCard: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  },
  cardHeader: {
    backgroundColor: "#0d1117",
    padding: "10px 16px",
    borderBottom: "1px solid #30363d",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardHeaderTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#58a6ff",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  codeTextarea: {
    width: "100%",
    height: "280px",
    backgroundColor: "#0d1117",
    color: "#7ee787",
    border: "none",
    padding: "16px",
    fontFamily: "'Fira Code', Consolas, Monaco, monospace",
    fontSize: "14px",
    lineHeight: "1.5",
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
  },
  inputTextarea: {
    width: "100%",
    height: "80px",
    backgroundColor: "#0d1117",
    color: "#f0f6fc",
    border: "none",
    padding: "12px 16px",
    fontFamily: "'Fira Code', Consolas, Monaco, monospace",
    fontSize: "13px",
    outline: "none",
    resize: "none",
    boxSizing: "border-box",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    padding: "12px 16px",
    borderTop: "1px solid #30363d",
    backgroundColor: "#161b22",
  },
  btn: {
    padding: "8px 18px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  },
  runBtn: {
    backgroundColor: "#316dca",
    color: "#ffffff",
  },
  submitBtn: {
    backgroundColor: "#238636",
    color: "#ffffff",
  },
  consoleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  consoleBox: {
    padding: "16px",
    margin: 0,
    backgroundColor: "#0d1117",
    fontFamily: "'Fira Code', Consolas, Monaco, monospace",
    fontSize: "13px",
    lineHeight: "1.5",
    minHeight: "80px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    color: "#c9d1d9",
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

export default SolveProblem;
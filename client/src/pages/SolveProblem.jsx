import { useParams } from "react-router-dom"
import { useState } from "react"
import Editor from "@monaco-editor/react"
import {
  Container,
  Typography,
  Button,
  Box,
  MenuItem,
  Select
} from "@mui/material"
// import API from "../api/axios"

function SolveProblem() {
  const { id } = useParams()


  const [language, setLanguage] = useState("python")
  const [code, setCode] = useState("# Write your code here")
  const [customInput, setCustomInput] = useState("")
  const [output, setOutput] = useState("")
  const [verdict, setVerdict] = useState("")
  const [running, setRunning] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleRun = async () => {
    try {
      setRunning(true)

      const token = localStorage.getItem("token")

      const res = await API.post("/submissions/run", {
  code,
  language: "python",
  input: customInput || "5 7"
})

      setOutput(res.data.output)
    } catch (err) {
      console.error(err)
      setOutput("Error running code")
    } finally {
      setRunning(false)   
    }
  }


  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      setVerdict("")

      const res = await API.post("/submissions", {
  problemId: id,
  code: code,
  language: language
})

      setVerdict(res.data.status || "Submitted")
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
      console.error(err)
      
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Solve Problem
      </Typography>

      <Typography variant="body2" gutterBottom>
        Problem ID: {id}
      </Typography>


      <Box sx={{ mb: 2 }}>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          size="small"
        >
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="cpp">C++</MenuItem>
        </Select>
      </Box>

      <Editor
        height="60vh"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(value) => setCode(value || "")}
      />

      <textarea
        placeholder="Custom input (optional)"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        style={{
          width: "100%",
          height: "80px",
          marginTop: "10px",
          background: "#0f172a",
          color: "white",
          border: "1px solid #334155",
          borderRadius: "8px",
          padding: "10px"
        }}
      />


      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={handleRun}
        >
          ▶ {running ? "Running..." : "Run Code"}
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
        >
          ✅ {submitting ? "Submitting..." : "Submit Code"}
        </Button>
      </Box>


      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Output:</Typography>
        <Box
          sx={{
            background: "#0d1117",
            p: 2,
            borderRadius: 1,
            minHeight: "80px",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap"
          }}
        >
          {output || "Run your code to see output"}
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Verdict:</Typography>
        <Box
          sx={{
            background: "#0d1117",
            p: 2,
            borderRadius: 1,
            minHeight: "60px",
            fontFamily: "monospace"
          }}
        >
          {verdict || "Submit code to see verdict"}
        </Box>
      </Box>
    </Container>
  )
}

export default SolveProblem
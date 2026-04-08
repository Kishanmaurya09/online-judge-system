import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import {
  Container,
  Typography,
  Chip,
  Box,
  CircularProgress,
  Button,
  Paper
} from "@mui/material"
import API from "../api/axios"

function ProblemDetail() {
  const { id } = useParams()
  const [problem, setProblem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await API.get(`/problems/${id}`)
        setProblem(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProblem()
  }, [id])

  const difficultyColor = (level) => {
    if (level === "easy") return "success"
    if (level === "medium") return "warning"
    if (level === "hard") return "error"
    return "default"
  }

  if (loading) return <CircularProgress />

  if (!problem) return <Typography>Problem not found</Typography>

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {problem.title}
      </Typography>

      <Chip
        label={problem.difficulty}
        color={difficultyColor(problem.difficulty)}
        sx={{ mb: 2 }}
      />

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Description</Typography>
        <Typography>{problem.description}</Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Constraints</Typography>
        <Typography>{problem.constraints}</Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Input Format</Typography>
        <Typography>{problem.inputFormat}</Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Output Format</Typography>
        <Typography>{problem.outputFormat}</Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Sample Input</Typography>
        <Typography>{problem.sampleInput}</Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Sample Output</Typography>
        <Typography>{problem.sampleOutput}</Typography>
      </Paper>

      <Button
        variant="contained"
        component={Link}
        to={`/solve/${problem._id}`}
      >
        Solve Problem
      </Button>
    </Container>
  )
}

export default ProblemDetail
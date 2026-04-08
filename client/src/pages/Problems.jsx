import { useEffect, useState } from "react"
import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  CircularProgress
} from "@mui/material"
import { Link } from "react-router-dom"
import API from "../api/axios"

function Problems() {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await API.get("/problems")
        setProblems(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProblems()
  }, [])

  const difficultyColor = (level) => {
    if (level === "easy") return "success"
    if (level === "medium") return "warning"
    if (level === "hard") return "error"
    return "default"
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Problems
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {problems.map((p) => (
            <Grid item xs={12} key={p._id}>
              <Card
                component={Link}
                to={`/problems/${p._id}`}
                sx={{
                  textDecoration: "none",
                  "&:hover": { transform: "scale(1.01)" },
                  transition: "0.2s"
                }}
              >
                <CardContent>
                  <Typography variant="h6">{p.title}</Typography>

                  <Chip
                    label={p.difficulty}
                    color={difficultyColor(p.difficulty)}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default Problems
import { useEffect, useState } from "react"
import axios from "../../api/axios"
import {
  Container, TextField, Button, Typography,
  Box, Paper, Checkbox, FormControlLabel
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function CreateContest() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [problems, setProblems] = useState([])
  const [selectedProblems, setSelectedProblems] = useState([])

  
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/problems")
        setProblems(res.data)
      } catch (err) {
        toast.error("Failed to load problems")
      }
    }
    fetchProblems()
  }, [])

 
  const handleProblemToggle = (id) => {
    setSelectedProblems(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/contests/create", {
        title,
        description,
        startTime,
        endTime,
        problems: selectedProblems
      })
      toast.success("Contest created!")
      navigate("/admin")
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating contest")
    }
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create Contest
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>

          <TextField
            fullWidth label="Title" margin="normal"
            value={title} onChange={e => setTitle(e.target.value)}
            required
          />

          <TextField
            fullWidth label="Description" margin="normal"
            multiline rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <TextField
            fullWidth type="datetime-local" margin="normal"
            label="Start Time"
            InputLabelProps={{ shrink: true }}
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            required
          />

          <TextField
            fullWidth type="datetime-local" margin="normal"
            label="End Time"
            InputLabelProps={{ shrink: true }}
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            required
          />

          <Typography sx={{ mt: 2 }}>Select Problems</Typography>

          {problems.map(p => (
            <FormControlLabel
              key={p._id}
              control={
                <Checkbox
                  checked={selectedProblems.includes(p._id)}
                  onChange={() => handleProblemToggle(p._id)}
                />
              }
              label={p.title}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
            fullWidth
          >
            CREATE CONTEST
          </Button>

        </Box>
      </Paper>
    </Container>
  )
}
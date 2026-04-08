import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box
} from "@mui/material"
import API from "../../api/axios"

function EditProblem() {
  const { id } = useParams()

  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "easy"
  })

  useEffect(() => {
    const fetchProblem = async () => {
      const res = await API.get(`/problems/${id}`)
      setForm(res.data)
    }
    fetchProblem()
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await API.put(`/problems/${id}`, form)
    alert("Problem updated")
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">✏ Edit Problem</Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2, mt: 2 }}>
        <TextField label="Title" name="title" value={form.title} onChange={handleChange} />
        <TextField label="Description" name="description" multiline rows={3} value={form.description} onChange={handleChange} />

        <TextField select label="Difficulty" name="difficulty" value={form.difficulty} onChange={handleChange}>
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </TextField>

        <Button type="submit" variant="contained">
          Update Problem
        </Button>
      </Box>
    </Container>
  )
}

export default EditProblem
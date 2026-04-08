import { useState } from "react"
import { TextField, Button, Container, Typography, Box } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import API from "../api/axios"
import toast from "react-hot-toast"

function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post("/users/signup", form)
      toast.success("Account created successfully")
      navigate("/")
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed")
    }
  }

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h4" gutterBottom>
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Signup
          </Button>
        </form>

        <Typography mt={2}>
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default Signup
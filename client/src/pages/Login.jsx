import { useState } from "react"
import { TextField, Button, Container, Typography, Box } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import API from "../api/axios"
import toast from "react-hot-toast"

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await API.post("/users/login", form)

      // JWT Save
      localStorage.setItem("token", data.token)

      toast.success("Login successful")
      navigate("/dashboard")
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>

        <Typography mt={2}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default Login

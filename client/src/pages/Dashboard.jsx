import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        console.log("PROFILE DATA:", res.data);

        // ✅ FIX (no .user)
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  const cardStyle = {
    height: "140px",   // 🔥 FIX (sab equal)
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    color: "#fff",
    borderRadius: "20px",

    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    transition: "0.3s",

    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 15px 40px rgba(0,0,0,0.6)"
    }
  };


  if (!user) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <Container>

      <Typography
        variant="h3"
        mt={5}
        sx={{
          fontWeight: "bold",
          background: "linear-gradient(45deg, #38bdf8, #6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        👋 Welcome, {user.name}
      </Typography>

      <Grid container spacing={3} mt={2}>

        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6">👤 Name</Typography>
              <Typography variant="h5">{user.name}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6">📧 Email</Typography>
              <Typography>{user.email}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6">⭐ Score</Typography>
              <Typography variant="h4">{user.score}</Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      <Button
        variant="contained"
        sx={{
          mt: 4,
          borderRadius: "12px",
          padding: "10px 20px",
          background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
          fontWeight: "bold",
          "&:hover": {
            background: "linear-gradient(45deg, #ff4b2b, #ff416c)"
          }
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>

    </Container>
  );
}

export default Dashboard;
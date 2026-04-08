import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid
} from "@mui/material";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get("/users/leaderboard");
      setUsers(res.data);
    };
    fetch();
  }, []);

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🏆 Leaderboard
      </Typography>

      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {top3.map((u, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card
              sx={{
                textAlign: "center",
                p: 2,
                borderRadius: "16px",
                background:
                  i === 0
                    ? "linear-gradient(135deg, gold, orange)"
                    : i === 1
                    ? "linear-gradient(135deg, silver, gray)"
                    : "linear-gradient(135deg, #cd7f32, brown)",
                color: "black",
              }}
            >
              <CardContent>
                <Typography variant="h5">
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
                </Typography>
                <Typography variant="h6">{u.name}</Typography>
                <Typography>{u.score} pts</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      
      <Box>
        {rest.map((u, i) => (
          <Card
            key={i}
            sx={{
              mb: 2,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              background: "#1e293b",
              borderRadius: "12px",
            }}
          >
            <Typography>
              #{i + 4} {u.name}
            </Typography>
            <Typography>{u.score} pts</Typography>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default Leaderboard;
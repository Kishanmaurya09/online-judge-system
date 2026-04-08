import { useEffect, useState } from "react";
import API from "../api/axios";
import { Container, Typography, Card } from "@mui/material";

function MySubmissions() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get("/submissions/my");
      setSubs(res.data);
    };
    fetch();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">📜 My Submissions</Typography>

      {subs.map((s, i) => (
        <Card
          key={i}
          sx={{
            mt: 2,
            p: 2,
            background: "#1e293b",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography>{s.problem?.title}</Typography>
            <Typography variant="body2" color="gray">
              {new Date(s.createdAt).toLocaleString()}
            </Typography>
          </div>

          <Typography
            sx={{
              color:
                s.status === "Accepted"
                  ? "#22c55e"
                  : s.status === "Wrong"
                  ? "#ef4444"
                  : "#facc15",
              fontWeight: "bold",
            }}
          >
            {s.status}
          </Typography>
        </Card>
      ))}
    </Container>
  );
}

export default MySubmissions;
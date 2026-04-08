import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  LinearProgress
} from "@mui/material";

// ✅ STATUS FUNCTIONS
const getStatusColor = (status) => {
  if (status === "Accepted") return "#22c55e";
  if (status === "Wrong") return "#ef4444";
  return "#facc15";
};

const getStatusText = (status) => {
  if (status === "Accepted") return "Accepted";
  if (status === "Wrong") return "Wrong";
  return "Not Attempted";
};

function ContestDetail() {
  const { id } = useParams();

  const [contest, setContest] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");

  // ✅ FETCH CONTEST
  useEffect(() => {
    const fetchContest = async () => {
      try {
        const res = await API.get(`/contests/${id}`);
        setContest(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchContest();
  }, [id]);

  // ✅ FETCH USER SUBMISSIONS
  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await API.get(`/submissions/my`);
        setSubmissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSubs();
  }, []);

  // ✅ GET STATUS (MAIN FIX)
  const getProblemStatus = (problemId) => {
    const sub = submissions.find(
      (s) => s.problem?._id === problemId
    );

    if (!sub) return "Not Attempted";
    return sub.status;
  };

  // ✅ TIMER
  useEffect(() => {
    if (!contest) return;

    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(contest.startTime);
      const end = new Date(contest.endTime);

      if (now > end) {
        setTimeLeft("Contest Ended");
        clearInterval(interval);
        return;
      }

      let diff;

      if (now < start) diff = start - now;
      else diff = end - now;

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  // ✅ PROGRESS BAR
  const getProgress = () => {
    if (!contest) return 0;

    const now = new Date();
    const start = new Date(contest.startTime);
    const end = new Date(contest.endTime);

    if (now < start) return 0;
    if (now > end) return 100;

    return ((now - start) / (end - start)) * 100;
  };

  if (!contest) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>

      {/* HEADER */}
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        🏆 {contest.title}
      </Typography>

      <Typography sx={{ color: "gray", mb: 2 }}>
        {contest.description}
      </Typography>

      {/* TIMER */}
      <Typography sx={{ color: "#22c55e", fontWeight: "bold" }}>
        ⏳ {timeLeft}
      </Typography>

      {/* PROGRESS BAR */}
      <Box sx={{ my: 2 }}>
        <LinearProgress
          variant="determinate"
          value={getProgress()}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#1e293b",
          }}
        />
      </Box>

      {/* TIME */}
      <Typography>
        ⏱ Start: {new Date(contest.startTime).toLocaleString()}
      </Typography>
      <Typography>
        ⏱ End: {new Date(contest.endTime).toLocaleString()}
      </Typography>

      {/* PROBLEMS */}
      <Typography mt={4} variant="h5">
        📘 Problems
      </Typography>

      {contest.problems.map((p) => {
        const status = getProblemStatus(p._id);

        return (
          <Card
            key={p._id}
            sx={{
              mt: 2,
              p: 2,
              borderRadius: "16px",
              background: "#1e293b",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
              },
            }}
          >
            <CardContent>

              {/* TITLE */}
              <Typography variant="h6">
                {p.title} ({p.difficulty})
              </Typography>

              {/* STATUS BADGE */}
              <Box
                sx={{
                  display: "inline-block",
                  mt: 1,
                  px: 2,
                  py: 0.5,
                  borderRadius: "20px",
                  background: getStatusColor(status),
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                {getStatusText(status)}
              </Box>

              {/* BUTTONS */}
              <Box mt={2}>

                <Button
                  variant="contained"
                  sx={{
                    mr: 2,
                    borderRadius: "10px",
                    background:
                      "linear-gradient(135deg, #22c55e, #16a34a)",
                  }}
                  href={`/solve/${p._id}`}
                  disabled={timeLeft === "Contest Ended"}
                >
                  🚀 Solve
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "10px",
                    color: "#38bdf8",
                    borderColor: "#38bdf8",
                  }}
                  href={`/contest/${id}/leaderboard`}
                >
                  📊 Leaderboard
                </Button>

              </Box>

            </CardContent>
          </Card>
        );
      })}

    </Container>
  );
}

export default ContestDetail;
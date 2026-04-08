import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

function Contests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get("/contests");
        setContests(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load contests");
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading contests...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Contests</h2>

      {contests.length === 0 ? (
        <p>No contests available</p>
      ) : (
        contests.map((contest) => (
          <div
            key={contest._id}
            style={{
              background: "#1e293b",
              padding: "16px",
              marginBottom: "12px",
              borderRadius: "8px",
            }}
          >
            <h3>{contest.title}</h3>
            <p>{contest.description}</p>

            <p>
              Start: {new Date(contest.startTime).toLocaleString()}
              <br />
              End: {new Date(contest.endTime).toLocaleString()}
            </p>

            <Link to={`/contests/${contest._id}`}>
  <button >View Contest</button>
</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Contests;
// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import API from "../api/axios"

// function Problems() {
//   const [problems, setProblems] = useState([])
//   const [search, setSearch] = useState("")
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()
//   // const filteredProblems = problems.filter(p =>
//   // p.title.toLowerCase().includes(search.toLowerCase())
// // )

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await API.get("/problems")
//         setProblems(res.data)
//       } catch (err) {
//         console.log(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProblems()
//   }, [])

//   const filteredProblems = problems.filter((p) =>
//     p.title.toLowerCase().includes(search.toLowerCase())
//   )

//   if (loading) {
//     return <div className="text-white p-6">Loading...</div>
//   }

//   return (
//     <div className="min-h-screen bg-[#0f172a] text-white px-10 py-6">

//       <h1 className="text-3xl font-bold mb-6">Problem List</h1>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search questions..."
//         className="mb-6 p-3 w-full max-w-md rounded-lg bg-[#1e293b] border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Table container */}
//       <div className="bg-[#111827] rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto">

//         {/* Header */}
//         <div className="grid grid-cols-3 px-6 py-3 border-b border-gray-700 text-gray-400 text-sm">
//           <span>#</span>
//           <span>Title</span>
//           <span className="text-right">Difficulty</span>
//         </div>

//         {/* Rows */}
//         {filteredProblems.map((p, index) => (
//           <div
//             key={p._id}
//             className="grid grid-cols-3 px-6 py-4 border-b border-gray-800 hover:bg-[#1f2937] cursor-pointer transition"
//             onClick={() => window.location.href = `/problems/${p._id}`}
//           >
//             <span className="text-gray-400">{index + 1}</span>

//             <span className="font-medium">{p.title}</span>

//             <span className="text-right">
//               <span
//                 className={`px-3 py-1 text-xs rounded-full font-semibold ${p.difficulty === "easy"
//                     ? "bg-green-500/20 text-green-400"
//                     : p.difficulty === "medium"
//                       ? "bg-yellow-500/20 text-yellow-400"
//                       : "bg-red-500/20 text-red-400"
//                   }`}
//               >
//                 {p.difficulty}
//               </span>
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Problems


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Problems() {
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await API.get("/problems");
        setProblems(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const filteredProblems = problems.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const getDifficultyStyle = (difficulty) => {
    const diff = difficulty?.toLowerCase();
    if (diff === "easy") {
      return {
        backgroundColor: "rgba(34, 197, 94, 0.12)",
        color: "#4ade80",
        border: "1px solid rgba(34, 197, 94, 0.25)",
      };
    }
    if (diff === "medium") {
      return {
        backgroundColor: "rgba(234, 179, 8, 0.12)",
        color: "#facc15",
        border: "1px solid rgba(234, 179, 8, 0.25)",
      };
    }
    return {
      backgroundColor: "rgba(239, 68, 68, 0.12)",
      color: "#f87171",
      border: "1px solid rgba(239, 68, 68, 0.25)",
    };
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading problems...</div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      {/* Centered Main Box */}
      <div style={styles.mainContainer}>
        
        {/* Header Section */}
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.title}>Problem Set</h1>
            <p style={styles.subtitle}>Select a problem to start coding</p>
          </div>

          <input
            type="text"
            placeholder="Search questions..."
            style={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table Card Container */}
        <div style={styles.card}>
          {/* Table Header */}
          <div style={styles.tableHeader}>
            <span style={{ flex: "0 0 60px", textAlign: "center" }}>#</span>
            <span style={{ flex: "1", paddingLeft: "10px" }}>Title</span>
            <span style={{ flex: "0 0 120px", textAlign: "right" }}>Difficulty</span>
          </div>

          {/* Table Rows */}
          {filteredProblems.length > 0 ? (
            filteredProblems.map((p, index) => (
              <div
                key={p._id}
                style={styles.tableRow}
                onClick={() => navigate(`/problems/${p._id}`)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e293b")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <span style={styles.indexNum}>{index + 1}</span>
                <span style={styles.problemTitle}>{p.title}</span>
                <span style={{ flex: "0 0 120px", textAlign: "right" }}>
                  <span style={{ ...styles.badge, ...getDifficultyStyle(p.difficulty) }}>
                    {p.difficulty}
                  </span>
                </span>
              </div>
            ))
          ) : (
            <div style={styles.noResults}>No problems found.</div>
          )}
        </div>

      </div>
    </div>
  );
}

// Inline Styles (Guaranteed to work without any external CSS)
const styles = {
  pageBackground: {
    minHeight: "100vh",
    backgroundColor: "#0d1117",
    color: "#c9d1d9",
    padding: "40px 20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    display: "flex",
    justifyContent: "center",
  },
  mainContainer: {
    width: "100%",
    maxWidth: "850px", // Exact centering width
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 4px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#8b949e",
    margin: 0,
  },
  searchInput: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "8px",
    padding: "10px 16px",
    color: "#f0f6fc",
    fontSize: "14px",
    outline: "none",
    width: "260px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  tableHeader: {
    display: "flex",
    padding: "14px 20px",
    borderBottom: "1px solid #30363d",
    backgroundColor: "#0d1117",
    color: "#8b949e",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tableRow: {
    display: "flex",
    alignItems: "center",
    padding: "14px 20px",
    borderBottom: "1px solid #21262d",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  indexNum: {
    flex: "0 0 60px",
    textAlign: "center",
    color: "#6e7681",
    fontSize: "14px",
    fontWeight: "500",
  },
  problemTitle: {
    flex: "1",
    paddingLeft: "10px",
    fontSize: "15px",
    fontWeight: "500",
    color: "#f0f6fc",
  },
  badge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  noResults: {
    padding: "30px",
    textAlign: "center",
    color: "#8b949e",
    fontSize: "14px",
  },
  loadingContainer: {
    minHeight: "100vh",
    backgroundColor: "#0d1117",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#8b949e",
    fontSize: "16px",
  },
};

export default Problems;
// import { useEffect, useState } from "react"
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Chip,
//   Grid,
//   CircularProgress
// } from "@mui/material"
// import { Link } from "react-router-dom"
// import API from "../api/axios"

// function Problems() {
//   const [problems, setProblems] = useState([])
//   const [loading, setLoading] = useState(true)

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

//   const difficultyColor = (level) => {
//     if (level === "easy") return "success"
//     if (level === "medium") return "warning"
//     if (level === "hard") return "error"
//     return "default"
//   }

//   return (
//     <div className="p-6 text-white">
//       <h1 className="text-3xl mb-4">Problems</h1>

//       {/* 🔍 Search Bar */}
//       <input
//         type="text"
//         placeholder="Search problem..."
//         className="mb-4 p-2 w-full rounded bg-gray-800 border border-gray-600"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* 📋 Table */}
//       <table className="w-full border border-gray-700">
//         <thead className="bg-gray-800">
//           <tr>
//             <th className="p-2 border">#</th>
//             <th className="p-2 border">Title</th>
//             <th className="p-2 border">Difficulty</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredProblems.map((p, index) => (
//             <tr
//               key={p._id}
//               className="hover:bg-gray-700 cursor-pointer"
//               onClick={() => window.location.href = `/problems/${p._id}`}
//             >
//               <td className="p-2 border">{index + 1}</td>
//               <td className="p-2 border">{p.title}</td>
//               <td className="p-2 border">
//                 <span
//                   className={`px-2 py-1 rounded ${
//                     p.difficulty === "easy"
//                       ? "bg-green-500"
//                       : p.difficulty === "medium"
//                       ? "bg-yellow-500"
//                       : "bg-red-500"
//                   }`}
//                 >
//                   {p.difficulty}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Problems

import { useEffect, useState } from "react"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"

function Problems() {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("") // ✅ added
  const navigate = useNavigate() // ✅ added

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await API.get("/problems")
        setProblems(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProblems()
  }, [])

  // ✅ filter logic added
  const filteredProblems = problems.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p className="text-white">Loading...</p>

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl mb-4">Problems</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search problem..."
        className="mb-4 p-2 w-full rounded bg-gray-800 border border-gray-600"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📋 Table */}
      <table className="w-full border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Difficulty</th>
          </tr>
        </thead>

        <tbody>
          {filteredProblems.map((p, index) => (
            <tr
              key={p._id}
              className="hover:bg-gray-700 cursor-pointer"
              onClick={() => navigate(`/problems/${p._id}`)} // ✅ FIXED
            >
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{p.title}</td>
              <td className="p-2 border">
                <span
                  className={`px-2 py-1 rounded ${
                    p.difficulty === "easy"
                      ? "bg-green-500"
                      : p.difficulty === "medium"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {p.difficulty}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Problems
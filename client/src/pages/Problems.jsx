import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"

function Problems() {
  const [problems, setProblems] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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

  const filteredProblems = problems.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <div className="text-white p-6">Loading...</div>
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Problems</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search problem..."
        className="mb-6 p-3 w-full rounded-lg bg-[#161b22] border border-gray-700 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📋 Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-[#161b22] text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Difficulty</th>
            </tr>
          </thead>

          <tbody>
            {filteredProblems.map((p, index) => (
              <tr
                key={p._id}
                className="border-t border-gray-700 hover:bg-[#1f2937] transition cursor-pointer"
                onClick={() => navigate(`/problems/${p._id}`)}
              >
                <td className="p-3 text-gray-400">{index + 1}</td>

                <td className="p-3 text-blue-400 hover:underline">
                  {p.title}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      p.difficulty === "easy"
                        ? "bg-green-600"
                        : p.difficulty === "medium"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-600"
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
    </div>
  )
}

export default Problems
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
  <div className="p-8 text-white max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">Problem List</h1>

    {/* Search */}
    <input
      type="text"
      placeholder="Search questions..."
      className="mb-6 p-3 w-full rounded-full bg-[#161b22] border border-gray-700 outline-none"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    {/* List */}
    <div className="space-y-3">
      {filteredProblems.map((p, index) => (
        <div
          key={p._id}
          onClick={() => navigate(`/problems/${p._id}`)}
          className="flex items-center justify-between px-5 py-4 rounded-lg bg-[#161b22] hover:bg-[#1f2937] transition cursor-pointer"
        >
          {/* Left */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 w-6">{index + 1}.</span>
            <span className="font-medium">{p.title}</span>
          </div>

          {/* Right */}
          <span
            className={`text-sm font-semibold ${
              p.difficulty === "easy"
                ? "text-green-400"
                : p.difficulty === "medium"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {p.difficulty}
          </span>
        </div>
      ))}
    </div>
  </div>
)
}

export default Problems
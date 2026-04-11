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
    <div className="p-6 text-white max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Problem List</h1>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search questions"
          className="w-full p-3 rounded-lg bg-[#262626] border border-gray-700 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Problems */}
      <div className="rounded-lg overflow-hidden border border-gray-800">
        {filteredProblems.map((p, index) => (
          <div
            key={p._id}
            onClick={() => navigate(`/problems/${p._id}`)}
            className={`flex justify-between items-center px-6 py-4 cursor-pointer 
          ${index % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#111]"} 
          hover:bg-[#2a2a2a] transition`}
          >
            {/* Left side */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500 w-6">{index + 1}.</span>
              <span className="text-[15px]">{p.title}</span>
            </div>

            {/* Right side */}
            <span
              className={`text-sm font-medium ${p.difficulty === "easy"
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
"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import PropTypes from "prop-types"
import adminInstance from "@/axios/AdminInstance"

const AllProgramResult = ({ token }) => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [openPrograms, setOpenPrograms] = useState({})
  const [selectedStudents, setSelectedStudents] = useState({})
  const [resultsData, setResultsData] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch programs and students
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await adminInstance.get("/admin-get-checking-student", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = res.data
        if (data.success) {
          const formatted = Object.keys(data.data).map((cat) => ({
            category: cat,
            programs: data.data[cat].map((p) => ({
              programId: p.programId,
              programName: p.programName,
              topStudents: p.students,
            })),
          }))
          setResultsData(formatted)
        }
      } catch (err) {
        console.error("Error fetching results:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [token])

  // Toggle program expand/collapse
  const toggleProgram = (idx) => {
    setOpenPrograms((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  // Handle checkbox selection
  const handleCheckboxChange = (programId, studentId) => {
    setSelectedStudents((prev) => ({
      ...prev,
      [programId]: {
        ...prev[programId],
        [studentId]: !prev[programId]?.[studentId],
      },
    }))
  }

  // Submit selected students and toggle isActive
  const handleSubmit = async (program) => {
    const checkedStudents = program.topStudents.filter(
      (student) => selectedStudents[program.programId]?.[student._id]
    )

    if (checkedStudents.length === 0) {
      alert(`No students selected for ${program.programName}`)
      return
    }

    try {
      const promises = checkedStudents.map((student) =>
        adminInstance.put(
          `/adminchange-user-status/${student._id}/${program.programId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
      )

      await Promise.all(promises)

      // Update local state immediately
      setResultsData((prev) =>
        prev.map((cat) => ({
          ...cat,
          programs: cat.programs.map((p) => {
            if (p.programId === program.programId) {
              return {
                ...p,
                topStudents: p.topStudents.map((s) => {
                  if (checkedStudents.find((cs) => cs._id === s._id)) {
                    return {
                      ...s,
                      program: { ...s.program, isActive: !s.program.isActive },
                    }
                  }
                  return s
                }),
              }
            }
            return p
          }),
        }))
      )
 setSelectedStudents((prev) => ({
      ...prev,
      [program.programId]: {}, // reset the selection for this program
    }));
      alert(
        `Updated program status for: ${checkedStudents
          .map((s) => s.name)
          .join(", ")}`
      )
    } catch (err) {
      console.error("Error updating program status:", err)
      alert("Failed to update program status")
    }
  }

  // Filter displayed programs by category
  const displayedPrograms =
    selectedCategory === "all"
      ? resultsData.flatMap((cat) => cat.programs)
      : resultsData
          .filter((cat) => cat.category === selectedCategory)
          .flatMap((cat) => cat.programs)

  // Search filter
  const filteredPrograms = displayedPrograms.filter((program) =>
    program.programName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="space-y-6">
      <section className="bg-white text-black min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            All Results of Program
          </h2>

          {/* Category & Search */}
          <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-black/30 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black w-full md:w-auto"
            >
              <option value="all">All Categories</option>
              {resultsData.map((section, idx) => (
                <option key={idx} value={section.category}>
                  {section.category}
                </option>
              ))}
            </select>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-black/30 rounded-lg px-10 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black placeholder-black/50 w-full"
              />
              <Search className="absolute left-3 top-2.5 text-black/50" size={20} />
            </div>
          </div>

          {/* Programs */}
          {filteredPrograms.map((program, idx) => (
            <div
              key={program.programId || idx}
              className="mb-6 border border-black/20 rounded-xl overflow-hidden shadow-sm bg-black/5"
            >
              <button
                onClick={() => toggleProgram(idx)}
                className="w-full px-6 py-4 flex justify-between items-center bg-black/10 hover:bg-black/20 transition text-black font-semibold"
              >
                <span>{program.programName}</span>
                {openPrograms[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {openPrograms[idx] && (
                <div className="px-6 py-4 bg-black/5">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {program.topStudents && program.topStudents.length > 0 ? (
                      program.topStudents.map((student, i) => (
                        <div
                          key={student._id || i}
                          className={`flex flex-col justify-between p-4 border rounded-xl shadow-sm hover:shadow-md transition space-y-2 
                            ${student.program.isActive ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={!!selectedStudents[program.programId]?.[student._id]}
                              onChange={() =>
                                handleCheckboxChange(program.programId, student._id)
                              }
                            />
                            <p className="font-extrabold text-black truncate">{student.name}</p>
                          </div>
                          <div className="text-sm text-black/70 space-y-1">
                            <p className="font-bold">Chess No: {student.chessNumber}</p>
                            <p className="font-bold">Team: {student.team}</p>
                            <p className="font-bold">Points: {student.points}</p>
                            <p className={`font-bold ${student.program.isActive ? "text-green-600" : "text-red-600"}`}>
                              Status: {student.program.isActive ? "Active" : "Inactive"}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="col-span-full text-center text-black/50">
                        No students
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center mt-4">
                    <button
                      onClick={() => handleSubmit(program)}
                      className="px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-black/80 transition"
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredPrograms.length === 0 && (
            <p className="text-center text-black/50 mt-4">No programs found.</p>
          )}
        </div>
      </section>
    </div>
  )
}

AllProgramResult.propTypes = {
  token: PropTypes.string.isRequired,
}

export default AllProgramResult


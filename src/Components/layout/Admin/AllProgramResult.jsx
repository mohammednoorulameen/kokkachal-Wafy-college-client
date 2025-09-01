
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
        [studentId]: {
          ...prev[programId]?.[studentId],
          selected: !prev[programId]?.[studentId]?.selected,
          grade: prev[programId]?.[studentId]?.grade || "",
        },
      },
    }))
  }

  // Submit selected students and toggle isActive + grade
  const handleSubmit = async (program) => {
    const checkedStudents = program.topStudents.filter(
      (student) => selectedStudents[program.programId]?.[student._id]?.selected
    )

    if (checkedStudents.length === 0) {
      alert(`No students selected for ${program.programName}`)
      return
    }

    try {
      const promises = checkedStudents.map((student) =>
        adminInstance.put(
          `/adminchange-user-status/${student._id}/${program.programId}`,
          {
            grade: selectedStudents[program.programId][student._id]?.grade || "",
          },
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
                  const cs = checkedStudents.find((cs) => cs._id === s._id)
                  if (cs) {
                    return {
                      ...s,
                      program: {
                        ...s.program,
                        isActive: !s.program.isActive,
                        grade: selectedStudents[program.programId][s._id]?.grade || "",
                      },
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

      // Reset selection for this program
      setSelectedStudents((prev) => ({
        ...prev,
        [program.programId]: {},
      }))

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
                              checked={!!selectedStudents[program.programId]?.[student._id]?.selected}
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
                            <p className="font-bold">Grade: {student.grade}</p>
                            <p className={`font-bold ${student.program.isActive ? "text-green-600" : "text-red-600"}`}>
                              Status: {student.program.isActive ? "Active" : "Inactive"}
                            </p>

                            {/* Grade input */}
                            <div className="mt-1">
                              <label className="text-sm font-semibold mr-2">Grade:</label>
                              <input
                                type="text"
                                value={selectedStudents[program.programId]?.[student._id]?.grade || student.program.grade || ""}
                                onChange={(e) => {
                                  const grade = e.target.value
                                  setSelectedStudents((prev) => ({
                                    ...prev,
                                    [program.programId]: {
                                      ...prev[program.programId],
                                      [student._id]: {
                                        ...prev[program.programId]?.[student._id],
                                        grade,
                                        selected: prev[program.programId]?.[student._id]?.selected || false,
                                      },
                                    },
                                  }))
                                }}
                                className="border border-gray-300 rounded px-2 py-1 w-16"
                                placeholder="A+"
                              />
                            </div>
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

// "use client"

// import { useState, useEffect } from "react"
// import { Search, ChevronDown, ChevronUp } from "lucide-react"
// import PropTypes from "prop-types"
// import adminInstance from "@/axios/AdminInstance"

// const AllProgramResult = ({ token }) => {
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [openPrograms, setOpenPrograms] = useState({})
//   const [selectedStudents, setSelectedStudents] = useState({})
//   const [resultsData, setResultsData] = useState([])
//   const [loading, setLoading] = useState(true)

//   // Fetch programs and students
//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const res = await adminInstance.get("/admin-get-checking-student", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         const data = res.data
//         if (data.success) {
//           const formatted = Object.keys(data.data).map((cat) => ({
//             category: cat,
//             programs: data.data[cat].map((p) => ({
//               programId: p.programId,
//               programName: p.programName,
//               topStudents: p.students,
//             })),
//           }))
//           setResultsData(formatted)
//         }
//       } catch (err) {
//         console.error("Error fetching results:", err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchResults()
//   }, [token])

//   // Toggle program expand/collapse
//   const toggleProgram = (idx) => {
//     setOpenPrograms((prev) => ({ ...prev, [idx]: !prev[idx] }))
//   }

//   // Handle checkbox selection
//   const handleCheckboxChange = (programId, studentId) => {
//     setSelectedStudents((prev) => ({
//       ...prev,
//       [programId]: {
//         ...prev[programId],
//         [studentId]: {
//           ...prev[programId]?.[studentId],
//           selected: !prev[programId]?.[studentId]?.selected,
//           grade: prev[programId]?.[studentId]?.grade || "",
//         },
//       },
//     }))
//   }

//   // Submit selected students and toggle isActive + grade
//   const handleSubmit = async (program) => {
//     const checkedStudents = program.topStudents.filter(
//       (student) => selectedStudents[program.programId]?.[student._id]?.selected
//     )

//     if (checkedStudents.length === 0) {
//       alert(`No students selected for ${program.programName}`)
//       return
//     }

//     try {
//       const promises = checkedStudents.map((student) =>
//         adminInstance.put(
//           `/adminchange-user-status/${student._id}/${program.programId}`,
//           {
//             grade: selectedStudents[program.programId][student._id]?.grade || "",
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         )
//       )

//       await Promise.all(promises)

//       // Update local state immediately
//       setResultsData((prev) =>
//         prev.map((cat) => ({
//           ...cat,
//           programs: cat.programs.map((p) => {
//             if (p.programId === program.programId) {
//               return {
//                 ...p,
//                 topStudents: p.topStudents.map((s) => {
//                   const cs = checkedStudents.find((cs) => cs._id === s._id)
//                   if (cs) {
//                     return {
//                       ...s,
//                       program: {
//                         ...s.program,
//                         isActive: !s.program.isActive,
//                         grade: "", // clear grade after submit
//                       },
//                     }
//                   }
//                   return s
//                 }),
//               }
//             }
//             return p
//           }),
//         }))
//       )

//       // Reset selection and grades for this program
      // setSelectedStudents((prev) => ({
      //   ...prev,
      //   [program.programId]: {},
      // }))

//       alert(
//         `Updated program status for: ${checkedStudents
//           .map((s) => s.name)
//           .join(", ")}`
//       )
//     } catch (err) {
//       console.error("Error updating program status:", err)
//       alert("Failed to update program status")
//     }
//   }

//   // Filter displayed programs by category
//   const displayedPrograms =
//     selectedCategory === "all"
//       ? resultsData.flatMap((cat) => cat.programs)
//       : resultsData
//           .filter((cat) => cat.category === selectedCategory)
//           .flatMap((cat) => cat.programs)

//   // Search filter
//   const filteredPrograms = displayedPrograms.filter((program) =>
//     program.programName.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   if (loading) return <p className="text-center mt-10">Loading...</p>

//   return (
//     <div className="space-y-6">
//       <section className="bg-white text-black min-h-screen py-20">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
//             All Results of Program
//           </h2>

//           {/* Category & Search */}
//           <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4">
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="border border-black/30 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black w-full md:w-auto"
//             >
//               <option value="all">All Categories</option>
//               {resultsData.map((section, idx) => (
//                 <option key={idx} value={section.category}>
//                   {section.category}
//                 </option>
//               ))}
//             </select>

//             <div className="relative w-full md:w-64">
//               <input
//                 type="text"
//                 placeholder="Search programs..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border border-black/30 rounded-lg px-10 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black placeholder-black/50 w-full"
//               />
//               <Search className="absolute left-3 top-2.5 text-black/50" size={20} />
//             </div>
//           </div>

//           {/* Programs */}
//           {filteredPrograms.map((program, idx) => (
//             <div
//               key={program.programId || idx}
//               className="mb-6 border border-black/20 rounded-xl overflow-hidden shadow-sm bg-black/5"
//             >
//               <button
//                 onClick={() => toggleProgram(idx)}
//                 className="w-full px-6 py-4 flex justify-between items-center bg-black/10 hover:bg-black/20 transition text-black font-semibold"
//               >
//                 <span>{program.programName}</span>
//                 {openPrograms[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </button>

//               {openPrograms[idx] && (
//                 <div className="px-6 py-4 bg-black/5">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {program.topStudents && program.topStudents.length > 0 ? (
//                       program.topStudents.map((student, i) => (
//                         <div
//                           key={student._id || i}
//                           className={`flex flex-col justify-between p-4 border rounded-xl shadow-sm hover:shadow-md transition space-y-2 
//                             ${student.program.isActive ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
//                         >
//                           <div className="flex items-center gap-2">
//                             <input
//                               type="checkbox"
//                               checked={!!selectedStudents[program.programId]?.[student._id]?.selected}
//                               onChange={() =>
//                                 handleCheckboxChange(program.programId, student._id)
//                               }
//                               // disabled={!student.program.isActive} // only active students can be selected
//                             />
//                             <p className="font-extrabold text-black truncate">{student.name}</p>
//                           </div>

//                           <div className="text-sm text-black/70 space-y-1">
//                             <p className="font-bold">Chess No: {student.chessNumber}</p>
//                             <p className="font-bold">Team: {student.team}</p>
//                             <p className="font-bold">Points: {student.points}</p>
//                             <p className="font-bold">Grade: {student.program.grade || "-"}</p>
//                             <p className={`font-bold ${student.program.isActive ? "text-green-600" : "text-red-600"}`}>
//                               Status: {student.program.isActive ? "Active" : "Inactive"}
//                             </p>

//                             {/* Grade input */}
//                             <div className="mt-1">
//                               <label className="text-sm font-semibold mr-2">Grade:</label>
//                               <input
//                                 type="text"
//                                 value={selectedStudents[program.programId]?.[student._id]?.grade || student.program.grade || ""}
//                                 onChange={(e) => {
//                                   const grade = e.target.value
//                                   setSelectedStudents((prev) => ({
//                                     ...prev,
//                                     [program.programId]: {
//                                       ...prev[program.programId],
//                                       [student._id]: {
//                                         ...prev[program.programId]?.[student._id],
//                                         grade,
//                                         selected: prev[program.programId]?.[student._id]?.selected || false,
//                                       },
//                                     },
//                                   }))
//                                 }}
//                                 className={`border border-gray-300 rounded px-2 py-1 w-16 ${!student.program.isActive ? "bg-gray-100 cursor-not-allowed" : ""}`}
//                                 placeholder="A+"
//                                 disabled={!student.program.isActive} // only editable if active
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="col-span-full text-center text-black/50">
//                         No students
//                       </p>
//                     )}
//                   </div>

//                   {/* Submit Button */}
//                   <div className="text-center mt-4">
//                     <button
//                       onClick={() => handleSubmit(program)}
//                       className="px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-black/80 transition"
//                     >
//                       Update Status
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}

//           {filteredPrograms.length === 0 && (
//             <p className="text-center text-black/50 mt-4">No programs found.</p>
//           )}
//         </div>
//       </section>
//     </div>
//   )
// }

// AllProgramResult.propTypes = {
//   token: PropTypes.string.isRequired,
// }

// export default AllProgramResult


// "use client"

// import { useState, useEffect } from "react"
// import { Search, ChevronDown, ChevronUp } from "lucide-react"
// import PropTypes from "prop-types"
// import adminInstance from "@/axios/AdminInstance"

// const AllProgramResult = ({ token }) => {
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [openPrograms, setOpenPrograms] = useState({})
//   const [selectedStudents, setSelectedStudents] = useState({})
//   const [resultsData, setResultsData] = useState([])
//   const [loading, setLoading] = useState(true)

//   // Fetch programs and students
//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const res = await adminInstance.get("/admin-get-checking-student", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         const data = res.data
//         if (data.success) {
//           const formatted = Object.keys(data.data).map((cat) => ({
//             category: cat,
//             programs: data.data[cat].map((p) => ({
//               programId: p.programId,
//               programName: p.programName,
//               topStudents: p.students,
//             })),
//           }))
//           setResultsData(formatted)
//         }
//       } catch (err) {
//         console.error("Error fetching results:", err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchResults()
//   }, [token])

//   // Toggle program expand/collapse
//   const toggleProgram = (idx) => {
//     setOpenPrograms((prev) => ({ ...prev, [idx]: !prev[idx] }))
//   }

//   // Handle checkbox selection
//   const handleCheckboxChange = (programId, studentId) => {
//     setSelectedStudents((prev) => ({
//       ...prev,
//       [programId]: {
//         ...prev[programId],
//         [studentId]: {
//           ...prev[programId]?.[studentId],
//           selected: !prev[programId]?.[studentId]?.selected,
//           grade: prev[programId]?.[studentId]?.grade || "",
//         },
//       },
//     }))
//   }

//   // Submit selected students and toggle isActive + grade
//   const handleSubmit = async (program) => {
//     const checkedStudents = program.topStudents.filter(
//       (student) => selectedStudents[program.programId]?.[student._id]?.selected
//     )

//     if (checkedStudents.length === 0) {
//       alert(`No students selected for ${program.programName}`)
//       return
//     }

//     try {
//       const promises = checkedStudents.map((student) =>
//         adminInstance.put(
//           `/adminchange-user-status/${student._id}/${program.programId}`,
//           {
//             grade: selectedStudents[program.programId][student._id]?.grade || "",
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         )
//       )

//       await Promise.all(promises)

//       // Update local state immediately
//       setResultsData((prev) =>
//         prev.map((cat) => ({
//           ...cat,
//           programs: cat.programs.map((p) => {
//             if (p.programId === program.programId) {
//               return {
//                 ...p,
//                 topStudents: p.topStudents.map((s) => {
//                   const cs = checkedStudents.find((cs) => cs._id === s._id)
//                   if (cs) {
//                     return {
//                       ...s,
//                       program: {
//                         ...s.program,
//                         isActive: !s.program.isActive,
//                         grade: selectedStudents[program.programId][s._id]?.grade || "",
//                       },
//                     }
//                   }
//                   return s
//                 }),
//               }
//             }
//             return p
//           }),
//         }))
//       )

//       // Reset selection for this program
//       setSelectedStudents((prev) => ({
//         ...prev,
//         [program.programId]: {},
//       }))

//       alert(
//         `Updated program status for: ${checkedStudents
//           .map((s) => s.name)
//           .join(", ")}`
//       )
//     } catch (err) {
//       console.error("Error updating program status:", err)
//       alert("Failed to update program status")
//     }
//   }

//   // Filter displayed programs by category
//   const displayedPrograms =
//     selectedCategory === "all"
//       ? resultsData.flatMap((cat) => cat.programs)
//       : resultsData
//           .filter((cat) => cat.category === selectedCategory)
//           .flatMap((cat) => cat.programs)

//   // Search filter
//   const filteredPrograms = displayedPrograms.filter((program) =>
//     program.programName.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   if (loading) return <p className="text-center mt-10">Loading...</p>

//   return (
//     <div className="space-y-6">
//       <section className="bg-white text-black min-h-screen py-20">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
//             All Results of Program
//           </h2>

//           {/* Category & Search */}
//           <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4">
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="border border-black/30 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black w-full md:w-auto"
//             >
//               <option value="all">All Categories</option>
//               {resultsData.map((section, idx) => (
//                 <option key={idx} value={section.category}>
//                   {section.category}
//                 </option>
//               ))}
//             </select>

//             <div className="relative w-full md:w-64">
//               <input
//                 type="text"
//                 placeholder="Search programs..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border border-black/30 rounded-lg px-10 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black placeholder-black/50 w-full"
//               />
//               <Search className="absolute left-3 top-2.5 text-black/50" size={20} />
//             </div>
//           </div>

//           {/* Programs */}
//           {filteredPrograms.map((program, idx) => (
//             <div
//               key={program.programId || idx}
//               className="mb-6 border border-black/20 rounded-xl overflow-hidden shadow-sm bg-black/5"
//             >
//               <button
//                 onClick={() => toggleProgram(idx)}
//                 className="w-full px-6 py-4 flex justify-between items-center bg-black/10 hover:bg-black/20 transition text-black font-semibold"
//               >
//                 <span>{program.programName}</span>
//                 {openPrograms[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </button>

//               {openPrograms[idx] && (
//                 <div className="px-6 py-4 bg-black/5">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {program.topStudents && program.topStudents.length > 0 ? (
//                       program.topStudents.map((student, i) => (
//                         <div
//                           key={student._id || i}
//                           className={`flex flex-col justify-between p-4 border rounded-xl shadow-sm hover:shadow-md transition space-y-2 
//                             ${student.program.isActive ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
//                         >
//                           <div className="flex items-center gap-2">
//                             <input
//                               type="checkbox"
//                               checked={!!selectedStudents[program.programId]?.[student._id]?.selected}
//                               onChange={() =>
//                                 handleCheckboxChange(program.programId, student._id)
//                               }
//                             />
//                             <p className="font-extrabold text-black truncate">{student.name}</p>
//                           </div>

//                           <div className="text-sm text-black/70 space-y-1">
//                             <p className="font-bold">Chess No: {student.chessNumber}</p>
//                             <p className="font-bold">Team: {student.team}</p>
//                             <p className="font-bold">Points: {student.points}</p>
//                             <p className="font-bold">Grade: {student.grade}</p>
//                             <p className={`font-bold ${student.program.isActive ? "text-green-600" : "text-red-600"}`}>
//                               Status: {student.program.isActive ? "Active" : "Inactive"}
//                             </p>

//                             {/* Grade input */}
//                             <div className="mt-1">
//                               <label className="text-sm font-semibold mr-2">Grade:</label>
//                               <input
//                                 type="text"
//                                 value={selectedStudents[program.programId]?.[student._id]?.grade || student.program.grade || ""}
//                                 onChange={(e) => {
//                                   const grade = e.target.value
//                                   setSelectedStudents((prev) => ({
//                                     ...prev,
//                                     [program.programId]: {
//                                       ...prev[program.programId],
//                                       [student._id]: {
//                                         ...prev[program.programId]?.[student._id],
//                                         grade,
//                                         selected: prev[program.programId]?.[student._id]?.selected || false,
//                                       },
//                                     },
//                                   }))
//                                 }}
//                                 className="border border-gray-300 rounded px-2 py-1 w-16"
//                                 placeholder="A+"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="col-span-full text-center text-black/50">
//                         No students
//                       </p>
//                     )}
//                   </div>

//                   {/* Submit Button */}
//                   <div className="text-center mt-4">
//                     <button
//                       onClick={() => handleSubmit(program)}
//                       className="px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-black/80 transition"
//                     >
//                       Update Status
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}

//           {filteredPrograms.length === 0 && (
//             <p className="text-center text-black/50 mt-4">No programs found.</p>
//           )}
//         </div>
//       </section>
//     </div>
//   )
// }

// AllProgramResult.propTypes = {
//   token: PropTypes.string.isRequired,
// }

// export default AllProgramResult


// "use client"

// import { useState, useEffect } from "react"
// import { Search, ChevronDown, ChevronUp } from "lucide-react"
// import PropTypes from "prop-types"
// import adminInstance from "@/axios/AdminInstance"

// const AllProgramResult = ({ token }) => {
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [openPrograms, setOpenPrograms] = useState({})
//   const [selectedStudents, setSelectedStudents] = useState({})
//   const [studentGrades, setStudentGrades] = useState({}) // track grades
//   const [resultsData, setResultsData] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const res = await adminInstance.get("/admin-get-checking-student", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         const data = res.data
//         if (data.success) {
//           const formatted = Object.keys(data.data).map((cat) => ({
//             category: cat,
//             programs: data.data[cat].map((p) => ({
//               programId: p.programId,
//               programName: p.programName,
//               topStudents: p.students,
//             })),
//           }))
//           setResultsData(formatted)
//         }
//       } catch (err) {
//         console.error("Error fetching results:", err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchResults()
//   }, [token])

//   const toggleProgram = (idx) => {
//     setOpenPrograms((prev) => ({ ...prev, [idx]: !prev[idx] }))
//   }

//   const handleCheckboxChange = (programId, studentId) => {
//     setSelectedStudents((prev) => ({
//       ...prev,
//       [programId]: {
//         ...prev[programId],
//         [studentId]: !prev[programId]?.[studentId],
//       },
//     }))
//   }

//   const handleGradeChange = (programId, studentId, grade) => {
//     setStudentGrades((prev) => ({
//       ...prev,
//       [programId]: {
//         ...prev[programId],
//         [studentId]: grade,
//       },
//     }))
//   }

//   const handleSubmit = async (program) => {
//     const checkedStudents = program.topStudents.filter(
//       (student) => selectedStudents[program.programId]?.[student._id]
//     )

//     if (checkedStudents.length === 0) {
//       alert(`No students selected for ${program.programName}`)
//       return
//     }

//     try {
//       const promises = checkedStudents.map((student) =>
//         adminInstance.put(
//           `/adminchange-user-status/${student._id}/${program.programId}`,
//           { grade: studentGrades[program.programId]?.[student._id] || "" },
//           { headers: { Authorization: `Bearer ${token}` } }
//         )
//       )

//       await Promise.all(promises)

//       setResultsData((prev) =>
//         prev.map((cat) => ({
//           ...cat,
//           programs: cat.programs.map((p) => {
//             if (p.programId === program.programId) {
//               return {
//                 ...p,
//                 topStudents: p.topStudents.map((s) => {
//                   if (checkedStudents.find((cs) => cs._id === s._id)) {
//                     return {
//                       ...s,
//                       program: { ...s.program, isActive: !s.program.isActive },
//                       grade: studentGrades[program.programId]?.[s._id] || s.grade,
//                     }
//                   }
//                   return s
//                 }),
//               }
//             }
//             return p
//           }),
//         }))
//       )

//       setSelectedStudents((prev) => ({
//         ...prev,
//         [program.programId]: {},
//       }))
//       setStudentGrades((prev) => ({
//         ...prev,
//         [program.programId]: {},
//       }))

//       alert(
//         `Updated program status for: ${checkedStudents
//           .map((s) => s.name)
//           .join(", ")}`
//       )
//     } catch (err) {
//       console.error("Error updating program status:", err)
//       alert("Failed to update program status")
//     }
//   }

//   const displayedPrograms =
//     selectedCategory === "all"
//       ? resultsData.flatMap((cat) => cat.programs)
//       : resultsData
//           .filter((cat) => cat.category === selectedCategory)
//           .flatMap((cat) => cat.programs)

//   const filteredPrograms = displayedPrograms.filter((program) =>
//     program.programName.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   if (loading) return <p className="text-center mt-10">Loading...</p>

//   return (
//     <div className="space-y-6">
//       <section className="bg-white text-black min-h-screen py-20">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
//             All Results of Program
//           </h2>

//           <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4">
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="border border-black/30 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black w-full md:w-auto"
//             >
//               <option value="all">All Categories</option>
//               {resultsData.map((section, idx) => (
//                 <option key={idx} value={section.category}>
//                   {section.category}
//                 </option>
//               ))}
//             </select>

//             <div className="relative w-full md:w-64">
//               <input
//                 type="text"
//                 placeholder="Search programs..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border border-black/30 rounded-lg px-10 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black placeholder-black/50 w-full"
//               />
//               <Search className="absolute left-3 top-2.5 text-black/50" size={20} />
//             </div>
//           </div>

//           {filteredPrograms.map((program, idx) => (
//             <div
//               key={program.programId || idx}
//               className="mb-6 border border-black/20 rounded-xl overflow-hidden shadow-sm bg-black/5"
//             >
//               <button
//                 onClick={() => toggleProgram(idx)}
//                 className="w-full px-6 py-4 flex justify-between items-center bg-black/10 hover:bg-black/20 transition text-black font-semibold"
//               >
//                 <span>{program.programName}</span>
//                 {openPrograms[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </button>

//               {openPrograms[idx] && (
//                 <div className="px-6 py-4 bg-black/5">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {program.topStudents && program.topStudents.length > 0 ? (
//                       program.topStudents.map((student, i) => (
//                         <div
//                           key={student._id || i}
//                           className={`flex flex-col justify-between p-4 border rounded-xl shadow-sm hover:shadow-md transition space-y-2 
//                             ${student.program.isActive ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
//                         >
//                           <div className="flex items-center gap-2">
//                             <input
//                               type="checkbox"
//                               checked={!!selectedStudents[program.programId]?.[student._id]}
//                               onChange={() =>
//                                 handleCheckboxChange(program.programId, student._id)
//                               }
//                             />
//                             <p className="font-extrabold text-black truncate">{student.name}</p>
//                           </div>
//                           <div className="text-sm text-black/70 space-y-1">
//                             <p className="font-bold">Chess No: {student.chessNumber}</p>
//                             <p className="font-bold">Team: {student.team}</p>
//                             <p className="font-bold">Points: {student.points}</p>
//                             <p className={`font-bold ${student.program.isActive ? "text-green-600" : "text-red-600"}`}>
//                               Status: {student.program.isActive ? "Active" : "Inactive"}
//                             </p>

//                             {/* Manual Grade Input */}
//                             <input
//                               type="text"
//                               placeholder="Enter Grade"
//                               value={studentGrades[program.programId]?.[student._id] || student.grade || ""}
//                               onChange={(e) =>
//                                 handleGradeChange(program.programId, student._id, e.target.value)
//                               }
//                               className="border border-black/30 rounded-lg px-2 py-1 mt-1 w-full text-sm"
//                             />
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="col-span-full text-center text-black/50">
//                         No students
//                       </p>
//                     )}
//                   </div>

//                   <div className="text-center mt-4">
//                     <button
//                       onClick={() => handleSubmit(program)}
//                       className="px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-black/80 transition"
//                     >
//                       Update Status
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}

//           {filteredPrograms.length === 0 && (
//             <p className="text-center text-black/50 mt-4">No programs found.</p>
//           )}
//         </div>
//       </section>
//     </div>
//   )
// }

// AllProgramResult.propTypes = {
//   token: PropTypes.string.isRequired,
// }

// export default AllProgramResult


// "use client"

// import { useState, useEffect } from "react"
// import { Search, ChevronDown, ChevronUp } from "lucide-react"
// import PropTypes from "prop-types"
// import adminInstance from "@/axios/AdminInstance"

// const AllProgramResult = ({ token }) => {
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [openPrograms, setOpenPrograms] = useState({})
//   const [selectedStudents, setSelectedStudents] = useState({})
//   const [resultsData, setResultsData] = useState([])
//   const [loading, setLoading] = useState(true)

//   // Fetch programs and students
//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const res = await adminInstance.get("/admin-get-checking-student", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         const data = res.data
//         if (data.success) {
//           const formatted = Object.keys(data.data).map((cat) => ({
//             category: cat,
//             programs: data.data[cat].map((p) => ({
//               programId: p.programId,
//               programName: p.programName,
//               topStudents: p.students,
//             })),
//           }))
//           setResultsData(formatted)
//         }
//       } catch (err) {
//         console.error("Error fetching results:", err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchResults()
//   }, [token])

//   // Toggle program expand/collapse
//   const toggleProgram = (idx) => {
//     setOpenPrograms((prev) => ({ ...prev, [idx]: !prev[idx] }))
//   }

//   // Handle checkbox selection
//   const handleCheckboxChange = (programId, studentId) => {
//     setSelectedStudents((prev) => ({
//       ...prev,
//       [programId]: {
//         ...prev[programId],
//         [studentId]: !prev[programId]?.[studentId],
//       },
//     }))
//   }

//   // Submit selected students and toggle isActive
//   const handleSubmit = async (program) => {
//     const checkedStudents = program.topStudents.filter(
//       (student) => selectedStudents[program.programId]?.[student._id]
//     )

//     if (checkedStudents.length === 0) {
//       alert(`No students selected for ${program.programName}`)
//       return
//     }

//     try {
//       const promises = checkedStudents.map((student) =>
//         adminInstance.put(
//           `/adminchange-user-status/${student._id}/${program.programId}`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         )
//       )

//       await Promise.all(promises)

//       // Update local state immediately
//       setResultsData((prev) =>
//         prev.map((cat) => ({
//           ...cat,
//           programs: cat.programs.map((p) => {
//             if (p.programId === program.programId) {
//               return {
//                 ...p,
//                 topStudents: p.topStudents.map((s) => {
//                   if (checkedStudents.find((cs) => cs._id === s._id)) {
//                     return {
//                       ...s,
//                       program: { ...s.program, isActive: !s.program.isActive },
//                     }
//                   }
//                   return s
//                 }),
//               }
//             }
//             return p
//           }),
//         }))
//       )
//  setSelectedStudents((prev) => ({
//       ...prev,
//       [program.programId]: {}, // reset the selection for this program
//     }));
//       alert(
//         `Updated program status for: ${checkedStudents
//           .map((s) => s.name)
//           .join(", ")}`
//       )
//     } catch (err) {
//       console.error("Error updating program status:", err)
//       alert("Failed to update program status")
//     }
//   }

//   // Filter displayed programs by category
//   const displayedPrograms =
//     selectedCategory === "all"
//       ? resultsData.flatMap((cat) => cat.programs)
//       : resultsData
//           .filter((cat) => cat.category === selectedCategory)
//           .flatMap((cat) => cat.programs)

//   // Search filter
//   const filteredPrograms = displayedPrograms.filter((program) =>
//     program.programName.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   if (loading) return <p className="text-center mt-10">Loading...</p>

//   return (
//     <div className="space-y-6">
//       <section className="bg-white text-black min-h-screen py-20">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
//             All Results of Program
//           </h2>

//           {/* Category & Search */}
//           <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4">
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="border border-black/30 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black w-full md:w-auto"
//             >
//               <option value="all">All Categories</option>
//               {resultsData.map((section, idx) => (
//                 <option key={idx} value={section.category}>
//                   {section.category}
//                 </option>
//               ))}
//             </select>

//             <div className="relative w-full md:w-64">
//               <input
//                 type="text"
//                 placeholder="Search programs..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border border-black/30 rounded-lg px-10 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black placeholder-black/50 w-full"
//               />
//               <Search className="absolute left-3 top-2.5 text-black/50" size={20} />
//             </div>
//           </div>

//           {/* Programs */}
//           {filteredPrograms.map((program, idx) => (
//             <div
//               key={program.programId || idx}
//               className="mb-6 border border-black/20 rounded-xl overflow-hidden shadow-sm bg-black/5"
//             >
//               <button
//                 onClick={() => toggleProgram(idx)}
//                 className="w-full px-6 py-4 flex justify-between items-center bg-black/10 hover:bg-black/20 transition text-black font-semibold"
//               >
//                 <span>{program.programName}</span>
//                 {openPrograms[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//               </button>

//               {openPrograms[idx] && (
//                 <div className="px-6 py-4 bg-black/5">
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {program.topStudents && program.topStudents.length > 0 ? (
//                       program.topStudents.map((student, i) => (
//                         <div
//                           key={student._id || i}
//                           className={`flex flex-col justify-between p-4 border rounded-xl shadow-sm hover:shadow-md transition space-y-2 
//                             ${student.program.isActive ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
//                         >
//                           <div className="flex items-center gap-2">
//                             <input
//                               type="checkbox"
//                               checked={!!selectedStudents[program.programId]?.[student._id]}
//                               onChange={() =>
//                                 handleCheckboxChange(program.programId, student._id)
//                               }
//                             />
//                             <p className="font-extrabold text-black truncate">{student.name}</p>
//                           </div>
//                           <div className="text-sm text-black/70 space-y-1">
//                             <p className="font-bold">Chess No: {student.chessNumber}</p>
//                             <p className="font-bold">Team: {student.team}</p>
//                             <p className="font-bold">Points: {student.points}</p>
//                             <p className={`font-bold ${student.program.isActive ? "text-green-600" : "text-red-600"}`}>
//                               Status: {student.program.isActive ? "Active" : "Inactive"}
//                             </p>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="col-span-full text-center text-black/50">
//                         No students
//                       </p>
//                     )}
//                   </div>

//                   {/* Submit Button */}
//                   <div className="text-center mt-4">
//                     <button
//                       onClick={() => handleSubmit(program)}
//                       className="px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-black/80 transition"
//                     >
//                       Update Status
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}

//           {filteredPrograms.length === 0 && (
//             <p className="text-center text-black/50 mt-4">No programs found.</p>
//           )}
//         </div>
//       </section>
//     </div>
//   )
// }

// AllProgramResult.propTypes = {
//   token: PropTypes.string.isRequired,
// }

// export default AllProgramResult


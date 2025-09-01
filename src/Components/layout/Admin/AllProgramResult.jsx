"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ChevronDown, ChevronUp } from "lucide-react"

const  AllProgramResult = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [openPrograms, setOpenPrograms] = useState({})
  const [selectedStudents, setSelectedStudents] = useState({}) 

  // ✅ Static dummy data
  const resultsData = [
    {
      category: "Sports",
      programs: [
        {
          programId: 1,
          programName: "Football",
          topStudents: [
            { _id: 1, name: "Arjun", chessNumber: "C101", team: "Red Dragons", points: 15 },
            { _id: 2, name: "Rahul", chessNumber: "C102", team: "Blue Warriors", points: 12 },
          ],
        },
        {
          programId: 2,
          programName: "Basketball",
          topStudents: [
            { _id: 3, name: "Neha", chessNumber: "C201", team: "Green Giants", points: 18 },
          ],
        },
      ],
    },
    {
      category: "Arts",
      programs: [
        {
          programId: 3,
          programName: "Painting",
          topStudents: [
            { _id: 4, name: "Aisha", chessNumber: "C301", team: "Creative Minds", points: 20 },
          ],
        },
        {
          programId: 4,
          programName: "Music",
          topStudents: [],
        },
      ],
    },
  ]

  // Toggle program expand/collapse
  const toggleProgram = (idx) => {
    setOpenPrograms((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  // Handle checkbox change
  const handleCheckboxChange = (programId, studentId) => {
    setSelectedStudents((prev) => ({
      ...prev,
      [programId]: {
        ...prev[programId],
        [studentId]: !prev[programId]?.[studentId],
      },
    }))
  }

  // Submit selected students for a program
  const handleSubmit = (program) => {
    const checkedStudents = program.topStudents.filter(
      (student) => selectedStudents[program.programId]?.[student._id]
    )
    console.log(`✅ Checked Students for ${program.programName}:`, checkedStudents)
    alert(
      `Selected Students for ${program.programName}: ${
        checkedStudents.map((s) => s.name).join(", ") || "None"
      }`
    )
  }

  // Filter programs by category
  const displayedPrograms =
    selectedCategory === "all"
      ? resultsData.flatMap((cat) => cat.programs)
      : resultsData
          .filter((cat) => cat.category === selectedCategory)
          .flatMap((cat) => cat.programs)

  // Filter by search
  const filteredPrograms = displayedPrograms.filter((program) =>
    program.programName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <section className="bg-white text-black min-h-screen py-20">
            <div className="max-w-6xl mx-auto px-4">

              <h2 className="text-2xl md:text-3xl text-red-600 font-bold mb-6 text-center">(Working Progress not completed please wait)</h2>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">All Results of Program</h2>

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
                              className="flex flex-col justify-between p-4 border border-black/20 rounded-xl shadow-sm hover:shadow-md transition space-y-2 bg-white"
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
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="col-span-full text-center text-black/50">
                            No top students
                          </p>
                        )}
                      </div>

                      {/* ✅ Submit Button for each program */}
                      <div className="text-center mt-4">
                        <button
                          onClick={() => handleSubmit(program)}
                          className="px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-black/80 transition"
                        >
                          Submit {program.programName}
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
        </CardContent>
      </Card>
    </div>
  )
}


export default AllProgramResult

// // const AllProgramResult = () => {
// //   return (
// //     <div>AllProgramResult</div>
// //   )
// // }

// // export default AllProgramResult


// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Search } from "lucide-react"

// export default function AllProgramResult() {
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [searchTerm, setSearchTerm] = useState("")

//   // ✅ Static dummy data with isChecked flag
//   const resultsData = [
//     {
//       category: "Sports",
//       programs: [
//         {
//           programId: 1,
//           programName: "Football",
//           topStudents: [
//             { _id: 1, name: "Arjun", chessNumber: "C101", team: "Red Dragons", points: 15, isChecked: true },
//             { _id: 2, name: "Rahul", chessNumber: "C102", team: "Blue Warriors", points: 12, isChecked: false },
//           ],
//         },
//         {
//           programId: 2,
//           programName: "Basketball",
//           topStudents: [
//             { _id: 3, name: "Neha", chessNumber: "C201", team: "Green Giants", points: 18, isChecked: true },
//           ],
//         },
//       ],
//     },
//     {
//       category: "Arts",
//       programs: [
//         {
//           programId: 3,
//           programName: "Painting",
//           topStudents: [
//             { _id: 4, name: "Aisha", chessNumber: "C301", team: "Creative Minds", points: 20, isChecked: false },
//           ],
//         },
//         {
//           programId: 4,
//           programName: "Music",
//           topStudents: [],
//         },
//       ],
//     },
//   ]

//   // Filter programs by category
//   const displayedPrograms =
//     selectedCategory === "all"
//       ? resultsData.flatMap((cat) => cat.programs)
//       : resultsData
//           .filter((cat) => cat.category === selectedCategory)
//           .flatMap((cat) => cat.programs)

//   // Filter by search
//   const filteredPrograms = displayedPrograms.filter((program) =>
//     program.programName.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold">Zone Results</h2>
//           <p className="text-gray-600">Browse programs and top students</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
//         >
//           <option value="all">All Categories</option>
//           {resultsData.map((section, idx) => (
//             <option key={idx} value={section.category}>
//               {section.category}
//             </option>
//           ))}
//         </select>

//         <div className="relative w-full md:w-64">
//           <Input
//             type="text"
//             placeholder="Search programs..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//         </div>
//       </div>

//       {/* Programs Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Programs List</CardTitle>
//           <CardDescription>All programs with checked students</CardDescription>
//         </CardHeader>
//         <CardContent>
          {/* <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-extrabold">SNO</TableHead>
                <TableHead className="font-extrabold">Program</TableHead>
                <TableHead className="font-extrabold">Checked Students</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program, index) => {
                  // ✅ Only include students where isChecked === true
                  const checkedStudents = program.topStudents.filter((s) => s.isChecked)

                  return (
                    <TableRow key={program.programId}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">{program.programName}</TableCell>
                      <TableCell>
                        {checkedStudents.length > 0 ? (
                          <ul className="space-y-1">
                            {checkedStudents.map((student) => (
                              <li key={student._id} className="text-sm">
                                <span className="font-bold">{student.name}</span> — {student.team} ({student.points} pts)
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-500 text-sm">No checked students</span>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500">
                    No programs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
            <p>
              Total Programs: <span className="font-semibold">{filteredPrograms.length}</span>
            </p>
          </div> */}
//            <section className="bg-white text-black min-h-screen py-20">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
//           Zone Results
//         </h2>

//         {/* Category & Search */}
//         <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4">
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="border border-black/30 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black w-full md:w-auto"
//           >
//             <option value="all">All Categories</option>
//             {resultsData.map((section, idx) => (
//               <option key={idx} value={section.category}>
//                 {section.category}
//               </option>
//             ))}
//           </select>

//           <div className="relative w-full md:w-64">
//             <input
//               type="text"
//               placeholder="Search programs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="border border-black/30 rounded-lg px-10 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black placeholder-black/50 w-full"
//             />
//             <Search className="absolute left-3 top-2.5 text-black/50" size={20} />
//           </div>
//         </div>

//         {/* Programs */}
//         {filteredPrograms.map((program, idx) => (
//           <div
//             key={program.programId || idx}
//             className="mb-6 border border-black/20 rounded-xl overflow-hidden shadow-sm bg-black/5"
//           >
//             <button
//               onClick={() => toggleProgram(idx)}
//               className="w-full px-6 py-4 flex justify-between items-center bg-black/10 hover:bg-black/20 transition text-black font-semibold"
//             >
//               <span>{program.programName}</span>
//               {openPrograms[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//             </button>

//             {openPrograms[idx] && (
//               <div className="px-6 py-4 bg-black/5">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                   {program.topStudents && program.topStudents.length > 0 ? (
//                     program.topStudents.map((student, i) => (
//                       <div
//                         key={student._id || i}
//                         className="flex flex-col justify-between p-4 border border-black/20 rounded-xl shadow-sm hover:shadow-md transition space-y-2 bg-white"
//                       >
//                         <p className="font-extrabold text-black truncate">{student.name}</p>
//                         <div className="text-sm text-black/70 space-y-1">
//                           <p className="font-bold">Chess No: {student.chessNumber}</p>
//                           <p className="font-bold">Team: {student.team}</p>
//                           <p className="font-bold">Points: {student.points}</p>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="col-span-full text-center text-black/50">
//                       No top students
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}

//         {filteredPrograms.length === 0 && (
//           <p className="text-center text-black/50 mt-4">No programs found.</p>
//         )}
//       </div>
//     </section>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



// import { useState } from "react";
// import { ChevronDown, ChevronUp, Search } from "lucide-react";

// export default function AllProgramResult() {
//   const [openPrograms, setOpenPrograms] = useState({});
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   // ✅ Static dummy data
//   const resultsData = [
//     {
//       category: "Sports",
//       programs: [
//         {
//           programId: 1,
//           programName: "Football",
//           topStudents: [
//             { _id: 1, name: "Arjun", chessNumber: "C101", team: "Red Dragons", points: 15 },
//             { _id: 2, name: "Rahul", chessNumber: "C102", team: "Blue Warriors", points: 12 },
//           ],
//         },
//         {
//           programId: 2,
//           programName: "Basketball",
//           topStudents: [
//             { _id: 3, name: "Neha", chessNumber: "C201", team: "Green Giants", points: 18 },
//           ],
//         },
//       ],
//     },
//     {
//       category: "Arts",
//       programs: [
//         {
//           programId: 3,
//           programName: "Painting",
//           topStudents: [
//             { _id: 4, name: "Aisha", chessNumber: "C301", team: "Creative Minds", points: 20 },
//           ],
//         },
//         {
//           programId: 4,
//           programName: "Music",
//           topStudents: [],
//         },
//       ],
//     },
//   ];

  // const toggleProgram = (programIdx) => {
  //   setOpenPrograms((prev) => ({ ...prev, [programIdx]: !prev[programIdx] }));
  // };

  // // Filter programs by category
  // const displayedPrograms =
  //   selectedCategory === "all"
  //     ? resultsData.flatMap((cat) => cat.programs)
  //     : resultsData
  //         .filter((cat) => cat.category === selectedCategory)
  //         .flatMap((cat) => cat.programs);

//   // Filter by search
//   const filteredPrograms = displayedPrograms.filter((program) =>
//     program.programName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
    // <section className="bg-white text-black min-h-screen py-20">
    //   <div className="max-w-6xl mx-auto px-4">
    //     <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
    //       Zone Results
    //     </h2>

    //     {/* Category & Search */}
    //     <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4">
    //       <select
    //         value={selectedCategory}
    //         onChange={(e) => setSelectedCategory(e.target.value)}
    //         className="border border-black/30 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black w-full md:w-auto"
    //       >
    //         <option value="all">All Categories</option>
    //         {resultsData.map((section, idx) => (
    //           <option key={idx} value={section.category}>
    //             {section.category}
    //           </option>
    //         ))}
    //       </select>

    //       <div className="relative w-full md:w-64">
    //         <input
    //           type="text"
    //           placeholder="Search programs..."
    //           value={searchTerm}
    //           onChange={(e) => setSearchTerm(e.target.value)}
    //           className="border border-black/30 rounded-lg px-10 py-2 shadow-sm hover:shadow-md transition bg-black/5 text-black placeholder-black/50 w-full"
    //         />
    //         <Search className="absolute left-3 top-2.5 text-black/50" size={20} />
    //       </div>
    //     </div>

    //     {/* Programs */}
    //     {filteredPrograms.map((program, idx) => (
    //       <div
    //         key={program.programId || idx}
    //         className="mb-6 border border-black/20 rounded-xl overflow-hidden shadow-sm bg-black/5"
    //       >
    //         <button
    //           onClick={() => toggleProgram(idx)}
    //           className="w-full px-6 py-4 flex justify-between items-center bg-black/10 hover:bg-black/20 transition text-black font-semibold"
    //         >
    //           <span>{program.programName}</span>
    //           {openPrograms[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    //         </button>

    //         {openPrograms[idx] && (
    //           <div className="px-6 py-4 bg-black/5">
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    //               {program.topStudents && program.topStudents.length > 0 ? (
    //                 program.topStudents.map((student, i) => (
    //                   <div
    //                     key={student._id || i}
    //                     className="flex flex-col justify-between p-4 border border-black/20 rounded-xl shadow-sm hover:shadow-md transition space-y-2 bg-white"
    //                   >
    //                     <p className="font-extrabold text-black truncate">{student.name}</p>
    //                     <div className="text-sm text-black/70 space-y-1">
    //                       <p className="font-bold">Chess No: {student.chessNumber}</p>
    //                       <p className="font-bold">Team: {student.team}</p>
    //                       <p className="font-bold">Points: {student.points}</p>
    //                     </div>
    //                   </div>
    //                 ))
    //               ) : (
    //                 <p className="col-span-full text-center text-black/50">
    //                   No top students
    //                 </p>
    //               )}
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     ))}

    //     {filteredPrograms.length === 0 && (
    //       <p className="text-center text-black/50 mt-4">No programs found.</p>
    //     )}
    //   </div>
    // </section>
//   );
// }

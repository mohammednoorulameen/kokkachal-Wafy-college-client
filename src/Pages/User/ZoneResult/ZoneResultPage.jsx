import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

import userInstance from "@/axios/UserInstance";

export default function ZoneResultsPage() {
  const [resultsData, setResultsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPrograms, setOpenPrograms] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch API data and reshape
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await userInstance.get("/get-program-winnigstudent");

        if (res.data.success && res.data.data) {
          const formatted = Object.entries(res.data.data).map(([category, programs]) => ({
            category,
            programs,
          }));
          setResultsData(formatted);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const toggleProgram = (programIdx) => {
    setOpenPrograms((prev) => ({ ...prev, [programIdx]: !prev[programIdx] }));
  };

  // Filter programs by category
  const displayedPrograms =
    selectedCategory === "all"
      ? resultsData.flatMap((cat) => cat.programs)
      : resultsData
          .filter((cat) => cat.category === selectedCategory)
          .flatMap((cat) => cat.programs);

  // Filter by search
  const filteredPrograms = displayedPrograms.filter((program) =>
    program.programName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading results...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Zone Results</h2>

      {/* Category & Search */}
      <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition"
        >
          <option value="all">All Categories</option>
          {resultsData.map((section, idx) => (
            <option key={idx} value={section.category}>
              {section.category}
            </option>
          ))}
        </select>

        <div className="relative">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-10 py-2 shadow-sm hover:shadow-md transition"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Programs */}
      {filteredPrograms.map((program, idx) => (
        <div
          key={program.programId || idx}
          className="mb-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <button
            onClick={() => toggleProgram(idx)}
            className="w-full px-6 py-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition"
          >
            <span className="font-semibold">{program.programName}</span>
            {openPrograms[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {openPrograms[idx] && (
            <div className="px-6 py-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {program.topStudents && program.topStudents.length > 0 ? (
                  program.topStudents.map((student, i) => (
                    <div
                      key={student._id || i}
                      className="flex flex-col justify-between  p-4 border rounded-xl shadow-sm hover:shadow-md transition space-y-2"
                    >
                      <p className="font-extrabold text-black">
                        {student.name}
                      </p>
                      <div className="text-sm text-gray-600 space-y-1 ">
                        <p className="font-bold">Chess No: {student.chessNumber}</p>
                        <p className="font-bold">Team: {student.team}</p>
                        <p className="font-bold">Points: {student.points}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    No top students
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {filteredPrograms.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No programs found.</p>
      )}
    </div>
  );
}




// import { useState } from "react";
// import { ChevronDown, ChevronUp, Search } from "lucide-react";

// const resultsData = [
//   {
//     category: "Thamheediyya (thm)",
//     programs: [
//       {
//         programName: "Quran Recitation",
//         items: [
//           { rank: 1, name: "MUHAMMED ZIYAD", location: "Bafakhy Wafy, Valavannur", grade: "A+" },
//           { rank: 2, name: "AHAMMED ZIDHAN P M", location: "Majlis, Puramannur", grade: "A" },
//         ],
//       },
//       {
//         programName: "Tafsir Competition",
//         items: [
//           { rank: 1, name: "NISAMUDHEEN A M", location: "Madarijussunna, Kalanthode", grade: "A" },
//           { rank: null, name: "MUHAMMED BISHRUL HAFI K", location: "Perumundachery Wafy College", grade: "A" },
//         ],
//       },
//       {
//         programName: "Speech Competition",
//         items: [
//           { rank: 1, name: "NISAMUDHEEN A M", location: "Madarijussunna, Kalanthode", grade: "A" },
//           { rank: null, name: "MUHAMMED BISHRUL HAFI K", location: "Perumundachery Wafy College", grade: "A" },
//         ],
//       },
//     ],
//   },
//   {
//     category: "Junior (jnr)",
//     programs: [
//       {
//         programName: "Islamic Studies",
//         items: [
//           { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
//           { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
//         ],
//       },
//       {
//         programName: "Speech Malayalam",
//         items: [
//           { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
//           { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
//         ],
//       },
//        {
//         programName: "speech malayalam",
//         items: [
//           { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
//           { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
//         ],
//       },
//       {
//         programName: "speech arabic",
//         items: [
//           { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
//           { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
//         ],
//       },
//       {
//         programName: "song ",
//         items: [
//           { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
//           { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
//         ],
//       },
//     ],
//   },
// ];

// export default function ZoneResultsPage() {
//   const [openPrograms, setOpenPrograms] = useState({});
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   const toggleProgram = (programIdx) => {
//     setOpenPrograms((prev) => ({ ...prev, [programIdx]: !prev[programIdx] }));
//   };

//   // Filter programs based on selected category
//   const displayedPrograms =
//     selectedCategory === "all"
//       ? resultsData.flatMap((cat) => cat.programs)
//       : resultsData
//           .filter((cat) => cat.category === selectedCategory)
//           .flatMap((cat) => cat.programs);

//   // Filter programs based on search input
//   const filteredPrograms = displayedPrograms.filter((program) =>
//     program.programName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Zone Results</h2>

//       {/* Category Select and Search */}
//       <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4">
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="border rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition"
//         >
//           <option value="all">All Categories</option>
//           {resultsData.map((section, idx) => (
//             <option key={idx} value={section.category}>
//               {section.category}
//             </option>
//           ))}
//         </select>

//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search programs..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border rounded-lg px-10 py-2 shadow-sm hover:shadow-md transition"
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//         </div>
//       </div>

//       {/* Program Accordion */}
//       {filteredPrograms.map((program, idx) => (
//         <div key={idx} className="mb-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//           <button
//             onClick={() => toggleProgram(idx)}
//             className="w-full px-6 py-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition"
//           >
//             <span className="font-semibold">{program.programName}</span>
//             {openPrograms[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//           </button>

//           {/* Program Results */}
//           {openPrograms[idx] && (
//             <div className="px-6 py-4 bg-white">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {program.items.map((item, i) => (
//                   <div
//                     key={i}
//                     className="flex flex-col justify-between p-4 border rounded-xl shadow-sm hover:shadow-md transition space-y-2"
//                   >
//                     <p className="font-semibold text-red-600">
//                       {item.rank ? `${item.rank} : ${item.name}` : `Nil : ${item.name}`}
//                     </p>
//                     <div className="flex justify-between items-center">
//                       <p className="text-gray-600 text-sm">{item.location}</p>
//                       <span
//                         className={`px-3 py-1 rounded-full text-white font-semibold ${
//                           item.grade === "A+"
//                             ? "bg-green-500"
//                             : item.grade === "A"
//                             ? "bg-green-400"
//                             : "bg-yellow-400"
//                         }`}
//                       >
//                         {item.grade}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       ))}

//       {filteredPrograms.length === 0 && (
//         <p className="text-center text-gray-500 mt-4">No programs found.</p>
//       )}
//     </div>
//   );
// }

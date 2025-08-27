import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const resultsData = [
  {
    category: "Thamheediyya (thm)",
    programs: [
      {
        programName: "Quran Recitation",
        items: [
          { rank: 1, name: "MUHAMMED ZIYAD", location: "Bafakhy Wafy, Valavannur", grade: "A+" },
          { rank: 2, name: "AHAMMED ZIDHAN P M", location: "Majlis, Puramannur", grade: "A" },
        ],
      },
      {
        programName: "Tafsir Competition",
        items: [
          { rank: 1, name: "NISAMUDHEEN A M", location: "Madarijussunna, Kalanthode", grade: "A" },
          { rank: null, name: "MUHAMMED BISHRUL HAFI K", location: "Perumundachery Wafy College", grade: "A" },
        ],
      },
      {
        programName: "Speech Competition",
        items: [
          { rank: 1, name: "NISAMUDHEEN A M", location: "Madarijussunna, Kalanthode", grade: "A" },
          { rank: null, name: "MUHAMMED BISHRUL HAFI K", location: "Perumundachery Wafy College", grade: "A" },
        ],
      },
    ],
  },
  {
    category: "Junior (jnr)",
    programs: [
      {
        programName: "Islamic Studies",
        items: [
          { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
          { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
        ],
      },
      {
        programName: "Speech Malayalam",
        items: [
          { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
          { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
        ],
      },
       {
        programName: "speech malayalam",
        items: [
          { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
          { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
        ],
      },
      {
        programName: "speech arabic",
        items: [
          { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
          { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
        ],
      },
      {
        programName: "song ",
        items: [
          { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
          { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
        ],
      },
    ],
  },
];

export default function ZoneResultsPage() {
  const [openPrograms, setOpenPrograms] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleProgram = (programIdx) => {
    setOpenPrograms((prev) => ({ ...prev, [programIdx]: !prev[programIdx] }));
  };

  // Filter programs based on selected category
  const displayedPrograms =
    selectedCategory === "all"
      ? resultsData.flatMap((cat) => cat.programs)
      : resultsData
          .filter((cat) => cat.category === selectedCategory)
          .flatMap((cat) => cat.programs);

  // Filter programs based on search input
  const filteredPrograms = displayedPrograms.filter((program) =>
    program.programName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Zone Results</h2>

      {/* Category Select and Search */}
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

      {/* Program Accordion */}
      {filteredPrograms.map((program, idx) => (
        <div key={idx} className="mb-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => toggleProgram(idx)}
            className="w-full px-6 py-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition"
          >
            <span className="font-semibold">{program.programName}</span>
            {openPrograms[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {/* Program Results */}
          {openPrograms[idx] && (
            <div className="px-6 py-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {program.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between p-4 border rounded-xl shadow-sm hover:shadow-md transition space-y-2"
                  >
                    <p className="font-semibold text-red-600">
                      {item.rank ? `${item.rank} : ${item.name}` : `Nil : ${item.name}`}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 text-sm">{item.location}</p>
                      <span
                        className={`px-3 py-1 rounded-full text-white font-semibold ${
                          item.grade === "A+"
                            ? "bg-green-500"
                            : item.grade === "A"
                            ? "bg-green-400"
                            : "bg-yellow-400"
                        }`}
                      >
                        {item.grade}
                      </span>
                    </div>
                  </div>
                ))}
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
// import { ChevronDown, ChevronUp } from "lucide-react";

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
//         programName: "speech Competition",
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
      // {
      //   programName: "speech malayalam",
      //   items: [
      //     { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
      //     { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
      //   ],
      // },
      // {
      //   programName: "speech arabic",
      //   items: [
      //     { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
      //     { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
      //   ],
      // },
      // {
      //   programName: "song ",
      //   items: [
      //     { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
      //     { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
      //   ],
      // },
//     ],
//   },
// ];

// export default function ZoneResultsPage() {
//   const [openPrograms, setOpenPrograms] = useState({});
//   const [selectedCategory, setSelectedCategory] = useState("all");

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

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Zone Results</h2>

//       {/* Category Select */}
//       <div className="mb-6 text-center">
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
//       </div>

//       {/* Program Accordion */}
//       {displayedPrograms.map((program, idx) => (
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
//     </div>
//   );
// }


// import { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

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
//     ],
//   },
// ];


// export default function ZoneResultsPage() {
//   const [openCategory, setOpenCategory] = useState(null);
//   const [openProgram, setOpenProgram] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   const toggleCategory = (index) => {
//     setOpenCategory(openCategory === index ? null : index);
//     setOpenProgram(null); // close programs when switching categories
//   };

//   const toggleProgram = (index) => {
//     setOpenProgram(openProgram === index ? null : index);
//   };

//   const displayedData =
//     selectedCategory === "all"
//       ? resultsData
//       : resultsData.filter((section) => section.category === selectedCategory);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Zone Results</h2>

//       {/* Category Select */}
//       <div className="mb-6 text-center">
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
//       </div>

//       {/* Category Accordion */}
//       {displayedData.map((section, idx) => (
//         <div key={idx} className="mb-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//           <button
//             onClick={() => toggleCategory(idx)}
//             className="w-full px-6 py-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition"
//           >
//             <span className="font-semibold">{section.category}</span>
//             {openCategory === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//           </button>

//           {/* Program Accordion */}
//           {openCategory === idx &&
//             section.programs.map((program, pIdx) => (
//               <div key={pIdx} className="border-t border-gray-200">
//                 <button
//                   onClick={() => toggleProgram(pIdx)}
//                   className="w-full px-6 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
//                 >
//                   <span className="font-medium">{program.programName}</span>
//                   {openProgram === pIdx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//                 </button>

//                 {/* Program Results */}
//                 {openProgram === pIdx && (
//                   <div className="px-6 py-4 bg-white">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                       {program.items.map((item, i) => (
//                         <div
//                           key={i}
//                           className="flex flex-col justify-between p-4 border rounded-xl shadow-sm hover:shadow-md transition space-y-2"
//                         >
//                           <p className="font-semibold text-red-600">
//                             {item.rank ? `${item.rank} : ${item.name}` : `Nil : ${item.name}`}
//                           </p>
//                           <div className="flex justify-between items-center">
//                             <p className="text-gray-600 text-sm">{item.location}</p>
//                             <span
//                               className={`px-3 py-1 rounded-full text-white font-semibold 
//                                 ${item.grade === "A+" ? "bg-green-500" : item.grade === "A" ? "bg-green-400" : "bg-yellow-400"}`}
//                             >
//                               {item.grade}
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//         </div>
//       ))}
//     </div>
//   );
// }







// import { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";



// const resultsData = [
//   {
//     category: "Thamheediyya(thm) ",
//     items: [
//       { rank: 1, name: "MUHAMMED ZIYAD", location: "Bafakhy Wafy, Valavannur", grade: "A+" },
//       { rank: 2, name: "AHAMMED ZIDHAN P M", location: "Majlis, Puramannur", grade: "A" },
//       { rank: 3, name: "NISAMUDHEEN A M", location: "Madarijussunna, Kalanthode", grade: "A" },
//       { rank: null, name: "MUHAMMED BISHRUL HAFI K", location: "Perumundachery Wafy College", grade: "A" },
//     ],
//   },
//   {
//     category: "Junior (jnr) ",
//     items: [
//       { rank: null, name: "MUBEEN WAFY", location: "Kokkachal Wafy College", grade: "B" },
//       { rank: null, name: "NOORUL MUBEEN", location: "Kokkachal Wafy College", grade: "B" },
//       { rank: null, name: "ABDULLA MOHAMMED HADI", location: "Kokkachal Wafy College", grade: "B" },
//     ],
//   },
//   {
//     category: "Senior (snr) ",
//     items: [
//       { rank: 1, name: "ALIYA FATHIMA", location: "Valavannur College", grade: "A+" },
//       { rank: 2, name: "AHAMED RASHID", location: "Puramannur College", grade: "A" },
//       { rank: 2, name: "AHAMED RASHID", location: "Puramannur College", grade: "A" },
//     ],
//   },
//     {
//     category: "General( gnr)",
//     items: [
//       { rank: 1, name: "FATHIMA", location: "Valavannur College", grade: "A+" },
//       { rank: 2, name: "MUBEEN", location: "Puramannur College", grade: "A" },
//       { rank: 2, name: "AHAMED RASHID", location: "Puramannur College", grade: "A" },
//     ],
//   },
// ];

// export default function ZoneResultsPage() {
//   const [openIndex, setOpenIndex] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   const toggleAccordion = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   // Filtered data based on dropdown
//   const displayedData =
//     selectedCategory === "all"
//       ? resultsData
//       : resultsData.filter((section) => section.category === selectedCategory);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Zone Results</h2>

//       {/* Category Select */}
//       <div className="mb-6 text-center">
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
//       </div>

//       {/* Accordion */}
//       {displayedData.map((section, idx) => (
//         <div key={idx} className="mb-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//           {/* Accordion Header */}
//           <button
//             onClick={() => toggleAccordion(idx)}
//             className="w-full px-6 py-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition"
//           >
//             <span className="font-semibold">{section.category}</span>
//             {openIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//           </button>

//           {/* Accordion Content */}
//           {openIndex === idx && (
//             <div className="px-6 py-4 bg-white">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {section.items.map((item, i) => (
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
//                         className={`px-3 py-1 rounded-full text-white font-semibold 
//                           ${item.grade === "A+" ? "bg-green-500" : item.grade === "A" ? "bg-green-400" : "bg-yellow-400"}`}
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
//     </div>
//   );
// }




// import { useState, useEffect } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// const resultsData = [
//   {
//     category: "B1-Qira'ath",
//     items: [
//       { rank: 1, name: "MUHAMMED ZIYAD", location: "Bafakhy Wafy, Valavannur", grade: "A+" },
//       { rank: 2, name: "AHAMMED ZIDHAN P M", location: "Majlis, Puramannur", grade: "A" },
//       { rank: 3, name: "NISAMUDHEEN A M", location: "Madarijussunna, Kalanthode", grade: "A" },
//       { rank: null, name: "MUHAMMED BISHRUL HAFI K", location: "Perumundachery Wafy College", grade: "A" },
//     ],
//   },
//   {
//     category: "B2-Speech Malayalam",
//     items: [
//       { rank: null, name: "ABDULLA MOHAMMED HADI", location: "Kokkachal Wafy College", grade: "B" },
//     ],
//   },
// ];

// export default function ZoneResultsPage() {
//   const [openIndex, setOpenIndex] = useState(null);
//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   // Detect screen size
//   useEffect(() => {
//     const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleAccordion = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Zone Results</h2>

//       {isLargeScreen ? (
//         // Large screen layout
//         <div className="grid grid-cols-4 gap-4">
//           {resultsData[0].items.map((item, i) => (
//             <div
//               key={i}
//               className="flex flex-col justify-between p-4 border rounded-xl shadow-sm hover:shadow-md transition"
//             >
//               <p className="font-semibold text-red-600">
//                 {item.rank ? `${item.rank} : ${item.name}` : `Nil : ${item.name}`}
//               </p>
//               <p className="text-gray-600 text-sm">{item.location}</p>
//               <div
//                 className={`px-3 py-1 rounded-full text-white font-semibold 
//                 ${item.grade === "A+" ? "bg-green-500" : item.grade === "A" ? "bg-green-400" : "bg-yellow-400"}`}
//               >
//                 {item.grade}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         // Mobile accordion layout
//         resultsData.map((section, idx) => (
//           <div key={idx} className="mb-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//             <button
//               onClick={() => toggleAccordion(idx)}
//               className="w-full px-6 py-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition"
//             >
//               <span className="font-semibold">{section.category}</span>
//               {openIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//             </button>
//             {openIndex === idx && (
//               <div className="px-6 py-4 bg-white space-y-3">
//                 {section.items.map((item, i) => (
//                   <div
//                     key={i}
//                     className="flex justify-between items-center p-4 border rounded-xl shadow-sm hover:shadow-md transition"
//                   >
//                     <div>
//                       <p className="font-semibold text-red-600">
//                         {item.rank ? `${item.rank} : ${item.name}` : `Nil : ${item.name}`}
//                       </p>
//                       <p className="text-gray-600 text-sm">{item.location}</p>
//                     </div>
//                     <div
//                       className={`px-3 py-1 rounded-full text-white font-semibold 
//                         ${item.grade === "A+" ? "bg-green-500" : item.grade === "A" ? "bg-green-400" : "bg-yellow-400"}`}
//                     >
//                       {item.grade}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

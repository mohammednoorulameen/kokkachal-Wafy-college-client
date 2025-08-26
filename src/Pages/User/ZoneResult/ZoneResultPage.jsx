import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const resultsData = [
  {
    category: "B1-Qira'ath",
    items: [
      { rank: 1, name: "MUHAMMED ZIYAD", location: "Bafakhy Wafy, Valavannur", grade: "A+" },
      { rank: 2, name: "AHAMMED ZIDHAN P M", location: "Majlis, Puramannur", grade: "A" },
      { rank: 3, name: "NISAMUDHEEN A M", location: "Madarijussunna, Kalanthode", grade: "A" },
      { rank: null, name: "MUHAMMED BISHRUL HAFI K", location: "Perumundachery Wafy College", grade: "A" },
    ],
  },
  {
    category: "B2-Speech Malayalam",
    items: [
      { rank: null, name: "ABDULLA MOHAMMED HADI", location: "Kokkachal Wafy College", grade: "B" },
    ],
  },
  {
    category: "B3-English Speech",
    items: [
      { rank: 1, name: "ALIYA FATHIMA", location: "Valavannur College", grade: "A+" },
      { rank: 2, name: "AHAMED RASHID", location: "Puramannur College", grade: "A" },
    ],
  },
];

export default function ZoneResultsPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filtered data based on dropdown
  const displayedData =
    selectedCategory === "all"
      ? resultsData
      : resultsData.filter((section) => section.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Zone Results</h2>

      {/* Category Select */}
      <div className="mb-6 text-center">
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
      </div>

      {/* Accordion */}
      {displayedData.map((section, idx) => (
        <div key={idx} className="mb-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {/* Accordion Header */}
          <button
            onClick={() => toggleAccordion(idx)}
            className="w-full px-6 py-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition"
          >
            <span className="font-semibold">{section.category}</span>
            {openIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {/* Accordion Content */}
          {openIndex === idx && (
            <div className="px-6 py-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {section.items.map((item, i) => (
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
                        className={`px-3 py-1 rounded-full text-white font-semibold 
                          ${item.grade === "A+" ? "bg-green-500" : item.grade === "A" ? "bg-green-400" : "bg-yellow-400"}`}
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
    </div>
  );
}

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

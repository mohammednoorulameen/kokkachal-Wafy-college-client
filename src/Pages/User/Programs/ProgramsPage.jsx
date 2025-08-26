"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import {
  Music,
  Drama,
  Fence as Dance,
  Trophy,
  Award,
  Star,
  ChevronDown,
  Filter,
} from "lucide-react";

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayCount, setDisplayCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");

  const allPrograms = [
    {
      icon: Music,
      title: "Classical Vocal Solo",
      time: "10:00 AM - 11:00 AM",
      description: "Individual classical music performances showcasing vocal excellence",
      category: "Music",
      type: "onstage",
      gradient: "from-primary to-chart-2",
      winner: "first",
      winnerGroup: "St. Mary's College",
    },
    {
      icon: Dance,
      title: "Classical Dance Solo",
      time: "3:00 PM - 4:00 PM",
      description: "Traditional Indian classical dance forms",
      category: "Dance",
      type: "onstage",
      gradient: "from-secondary to-chart-3",
      winner: "first",
      winnerGroup: "Maharaja's College",
    },
    {
      icon: Drama,
      title: "Mono Acting",
      time: "9:00 AM - 10:00 AM",
      description: "Solo theatrical performances showcasing acting skills",
      category: "Theatre",
      type: "onstage",
      gradient: "from-chart-3 to-chart-4",
      winner: "first",
      winnerGroup: "Fatima Mata College",
    },
    {
      icon: Drama,
      title: "Mono Acting",
      time: "9:00 AM - 10:00 AM",
      description: "Solo theatrical performances showcasing acting skills",
      category: "Theatre",
      type: "onstage",
      gradient: "from-chart-3 to-chart-4",
      winner: "first",
      winnerGroup: "Fatima Mata College",
    },
    {
      icon: Drama,
      title: "Mono Acting",
      time: "9:00 AM - 10:00 AM",
      description: "Solo theatrical performances showcasing acting skills",
      category: "Theatre",
      type: "offstage",
      gradient: "from-chart-3 to-chart-4",
      winner: "first",
      winnerGroup: "Fatima Mata College",
    },
     {
      icon: Drama,
      title: "Mono Acting",
      time: "9:00 AM - 10:00 AM",
      description: "Solo theatrical performances showcasing acting skills",
      category: "Theatre",
      type: "offstage",
      gradient: "from-chart-3 to-chart-4",
      winner: "first",
      winnerGroup: "Fatima Mata College",
    },
     {
      icon: Drama,
      title: "qirahath",
      time: "9:00 AM - 10:00 AM",
      description: "Solo theatrical performances showcasing acting skills",
      category: "Theatre",
      type: "offstage",
      gradient: "from-chart-3 to-chart-4",
      winner: "first",
      winnerGroup: "Fatima Mata College",
    },
     {
      icon: Drama,
      title: "speech malayalam",
      time: "9:00 AM - 10:00 AM",
      description: "Solo theatrical performances showcasing acting skills",
      category: "Theatre",
      type: "offstage",
      gradient: "from-chart-3 to-chart-4",
      winner: "first",
      winnerGroup: "Fatima Mata College",
    },

    // Add more programs as needed
  ];


  // Filter by category/type
  const filteredPrograms = allPrograms.filter((program) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "onstage") return program.type === "onstage";
    if (selectedCategory === "offstage") return program.type === "offstage";
    return program.category === selectedCategory;
  });

  // Further filter by search term
  const searchedPrograms = filteredPrograms.filter((program) =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedPrograms = searchedPrograms.slice(0, displayCount);

  // Winner Badge Component
  const WinnerBadge = ({ winner }) => {
    if (!winner) return null;

    const badgeConfig = {
      first: { icon: Trophy, color: "text-yellow-600 bg-yellow-100", label: "1st Place" },
      second: { icon: Award, color: "text-gray-600 bg-gray-100", label: "2nd Place" },
      third: { icon: Star, color: "text-orange-600 bg-orange-100", label: "3rd Place" },
    };

    const config = badgeConfig[winner];
    const Icon = config.icon;

    return (
      <div className={`${config.color} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 mb-2`}>
        <Icon className="w-4 h-4" />
        {config.label}
      </div>
    );
  };

  WinnerBadge.propTypes = {
    winner: PropTypes.string.isRequired,
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-24 pb-16 bg-gradient-to-br from-muted to-background">
        <div className="max-w-6xl mx-auto px-4 text-center mb-4">
          <h1 className="text-5xl font-bold mb-6 festival-text-gradient animate-slide-in-right">
            Festival Programs
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right delay-150">
            Discover diverse artistic programs and competitions that make UMMATHEE a celebration of creativity
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {[
            { key: "all", label: "All Programs" },
            { key: "onstage", label: "Onstage" },
            { key: "offstage", label: "Offstage" },
            { key: "Music", label: "Music" },
            { key: "Dance", label: "Dance" },
            { key: "Theatre", label: "Theatre" },
          ].map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.key
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card text-card-foreground hover:bg-primary/10 hover:scale-105"
              }`}
            >
              <Filter className="w-4 h-4" />
              {category.label}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="flex justify-center  max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // className="w-full md:max-w-sm border rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition"
             className="w-full max-w-xs md:max-w-sm lg:max-w-md border rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition"
          />
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-lg text-muted-foreground text-center mb-8">
            Showing {displayedPrograms.length} of {searchedPrograms.length} programs
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPrograms.map((program, index) => {
              const Icon = program.icon;
              return (
                <div key={index} className="group animate-rotate-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="bg-card rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-border relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <WinnerBadge winner={program.winner} />
                    </div>

                    <div
                      className={`bg-gradient-to-r ${program.gradient} w-16 h-16 rounded-lg flex items-center justify-center mb-6 animate-pulse-glow`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {program.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          program.type === "onstage" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {program.type === "onstage" ? "On Stage" : "Off Stage"}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-card-foreground">{program.title}</h3>
                    <p className="text-primary font-semibold mb-3">{program.time}</p>
                    <p className="text-muted-foreground leading-relaxed mb-4">{program.description}</p>

                    <div className="mt-6 pt-4 border-t border-border">
                      <button className="text-primary hover:text-primary/80 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {displayCount < searchedPrograms.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setDisplayCount((prev) => Math.min(prev + 12, searchedPrograms.length))}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
              >
                Load More Programs
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}





// -----------------------------------------
// "use client";

// import { useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Music,
//   Drama,
//   Fence as Dance,
//   Trophy,
//   Award,
//   Star,
//   ChevronDown,
//   Filter,
// } from "lucide-react";

// export default function ProgramsPage() {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [displayCount, setDisplayCount] = useState(12);

//   const allPrograms = [
//     {
//       icon: Music,
//       title: "Classical Vocal Solo",
//       time: "10:00 AM - 11:00 AM",
//       description: "Individual classical music performances showcasing vocal excellence",
//       category: "Music",
//       type: "onstage",
//       gradient: "from-primary to-chart-2",
//       winner: "first",
//       winnerGroup: "St. Mary's College",
//     },
//     {
//       icon: Dance,
//       title: "Classical Dance Solo",
//       time: "3:00 PM - 4:00 PM",
//       description: "Traditional Indian classical dance forms",
//       category: "Dance",
//       type: "onstage",
//       gradient: "from-secondary to-chart-3",
//       winner: "first",
//       winnerGroup: "Maharaja's College",
//     },
//     {
//       icon: Drama,
//       title: "Mono Acting",
//       time: "9:00 AM - 10:00 AM",
//       description: "Solo theatrical performances showcasing acting skills",
//       category: "Theatre",
//       type: "onstage",
//       gradient: "from-chart-3 to-chart-4",
//       winner: "first",
//       winnerGroup: "Fatima Mata College",
//     },
//     {
//       icon: Drama,
//       title: "Mono Acting",
//       time: "9:00 AM - 10:00 AM",
//       description: "Solo theatrical performances showcasing acting skills",
//       category: "Theatre",
//       type: "onstage",
//       gradient: "from-chart-3 to-chart-4",
//       winner: "first",
//       winnerGroup: "Fatima Mata College",
//     },
//     {
//       icon: Drama,
//       title: "Mono Acting",
//       time: "9:00 AM - 10:00 AM",
//       description: "Solo theatrical performances showcasing acting skills",
//       category: "Theatre",
//       type: "offstage",
//       gradient: "from-chart-3 to-chart-4",
//       winner: "first",
//       winnerGroup: "Fatima Mata College",
//     },
//      {
//       icon: Drama,
//       title: "Mono Acting",
//       time: "9:00 AM - 10:00 AM",
//       description: "Solo theatrical performances showcasing acting skills",
//       category: "Theatre",
//       type: "offstage",
//       gradient: "from-chart-3 to-chart-4",
//       winner: "first",
//       winnerGroup: "Fatima Mata College",
//     },
//      {
//       icon: Drama,
//       title: "Mono Acting",
//       time: "9:00 AM - 10:00 AM",
//       description: "Solo theatrical performances showcasing acting skills",
//       category: "Theatre",
//       type: "offstage",
//       gradient: "from-chart-3 to-chart-4",
//       winner: "first",
//       winnerGroup: "Fatima Mata College",
//     },
//      {
//       icon: Drama,
//       title: "Mono Acting",
//       time: "9:00 AM - 10:00 AM",
//       description: "Solo theatrical performances showcasing acting skills",
//       category: "Theatre",
//       type: "offstage",
//       gradient: "from-chart-3 to-chart-4",
//       winner: "first",
//       winnerGroup: "Fatima Mata College",
//     },

//     // Add more programs as needed
//   ];

//   const filteredPrograms = allPrograms.filter((program) => {
//     if (selectedCategory === "all") return true;
//     if (selectedCategory === "onstage") return program.type === "onstage";
//     if (selectedCategory === "offstage") return program.type === "offstage";
//     return program.category === selectedCategory;
//   });

//   const displayedPrograms = filteredPrograms.slice(0, displayCount);

//   // Winner Badge Component
//   const WinnerBadge = ({ winner }) => {
//     if (!winner) return null;

//     const badgeConfig = {
//       first: { icon: Trophy, color: "text-yellow-600 bg-yellow-100", label: "1st Place" },
//       second: { icon: Award, color: "text-gray-600 bg-gray-100", label: "2nd Place" },
//       third: { icon: Star, color: "text-orange-600 bg-orange-100", label: "3rd Place" },
//     };

//     const config = badgeConfig[winner];
//     const Icon = config.icon;

//     return (
//       <div className={`${config.color} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 mb-2`}>
//         <Icon className="w-4 h-4" />
//         {config.label}
//       </div>
//     );
//   };

//   WinnerBadge.propTypes = {
//   winner: PropTypes.string.isRequired,
// };

//   return (
//     <div className="min-h-screen bg-background">
//       <section className="pt-24 pb-16 bg-gradient-to-br from-muted to-background">
//         <div className="max-w-6xl mx-auto px-4 text-center mb-16">
//           <h1 className="text-5xl font-bold mb-6 festival-text-gradient animate-slide-in-right">Festival Programs</h1>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right delay-150">
//             Discover diverse artistic programs and competitions that make UMMATHEE a celebration of creativity
//           </p>
//         </div>

//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           {[
//             { key: "all", label: "All Programs" },
//             { key: "onstage", label: "Onstage" },
//             { key: "offstage", label: "Offstage" },
//             { key: "Music", label: "Music" },
//             { key: "Dance", label: "Dance" },
//             { key: "Theatre", label: "Theatre" },
//           ].map((category) => (
//             <button
//               key={category.key}
//               onClick={() => setSelectedCategory(category.key)}
//               className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
//                 selectedCategory === category.key
//                   ? "bg-primary text-primary-foreground shadow-lg scale-105"
//                   : "bg-card text-card-foreground hover:bg-primary/10 hover:scale-105"
//               }`}
//             >
//               <Filter className="w-4 h-4" />
//               {category.label}
//             </button>
//           ))}
//         </div>
//       </section>

//       <section className="py-20">
//         <div className="max-w-6xl mx-auto px-4">
//           <p className="text-lg text-muted-foreground text-center mb-8">
//             Showing {displayedPrograms.length} of {filteredPrograms.length} programs
//           </p>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {displayedPrograms.map((program, index) => {
//               const Icon = program.icon;
//               return (
//                 <div key={index} className="group animate-rotate-in" style={{ animationDelay: `${index * 50}ms` }}>
//                   <div className="bg-card rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-border relative overflow-hidden">
//                     <div className="absolute top-4 right-4">
//                       <WinnerBadge winner={program.winner} />
//                     </div>

//                     <div
//                       className={`bg-gradient-to-r ${program.gradient} w-16 h-16 rounded-lg flex items-center justify-center mb-6 animate-pulse-glow`}
//                     >
//                       <Icon className="w-8 h-8 text-white" />
//                     </div>

//                     <div className="mb-4 flex flex-wrap gap-2">
//                       <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
//                         {program.category}
//                       </span>
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           program.type === "onstage" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
//                         }`}
//                       >
//                         {program.type === "onstage" ? "On Stage" : "Off Stage"}
//                       </span>
//                     </div>

//                     <h3 className="text-xl font-bold mb-2 text-card-foreground">{program.title}</h3>
//                     <p className="text-primary font-semibold mb-3">{program.time}</p>
//                     <p className="text-muted-foreground leading-relaxed mb-4">{program.description}</p>

//                     <div className="mt-6 pt-4 border-t border-border">
//                       <button className="text-primary hover:text-primary/80 font-semibold group-hover:translate-x-1 transition-transform duration-300">
//                         Learn More →
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {displayCount < filteredPrograms.length && (
//             <div className="text-center mt-12">
//               <button
//                 onClick={() => setDisplayCount((prev) => Math.min(prev + 12, filteredPrograms.length))}
//                 className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
//               >
//                 Load More Programs
//                 <ChevronDown className="w-5 h-5" />
//               </button>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

// ----------------------------------------------------------------------



// "use client"


// import {
//   Music,
//   Drama,
//   Palette,
//   Camera,
//   Mic,
//   Fence as Dance,
//   Trophy,
//   Award,
//   Star,
//   ChevronDown,
//   Filter,
// } from "lucide-react"
// import { useState } from "react"

// export default function Programs() {
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [showMore, setShowMore] = useState(false)
//   const [displayCount, setDisplayCount] = useState(12)

//   const allPrograms = [
//     // Onstage Programs
//     {
//       icon: Music,
//       title: "Classical Vocal Solo",
//       time: "10:00 AM - 11:00 AM",
//       description: "Individual classical music performances showcasing vocal excellence",
//       category: "Music",
//       type: "onstage",
//       gradient: "from-primary to-chart-2",
//       winner: "first",
//       winnerGroup: "St. Mary's College",
//     },
//     {
//       icon: Music,
//       title: "Western Vocal Solo",
//       time: "11:00 AM - 12:00 PM",
//       description: "Contemporary western music solo performances",
//       category: "Music",
//       type: "onstage",
//       gradient: "from-primary to-chart-2",
//       winner: "second",
//       winnerGroup: "Christ College",
//     },
//     {
//       icon: Music,
//       title: "Group Song",
//       time: "2:00 PM - 3:00 PM",
//       description: "Team vocal performances with harmonious melodies",
//       category: "Music",
//       type: "onstage",
//       gradient: "from-primary to-chart-2",
//       winner: "third",
//       winnerGroup: "Sacred Heart College",
//     },
//     {
//       icon: Dance,
//       title: "Classical Dance Solo",
//       time: "3:00 PM - 4:00 PM",
//       description: "Traditional Indian classical dance forms",
//       category: "Dance",
//       type: "onstage",
//       gradient: "from-secondary to-chart-3",
//       winner: "first",
//       winnerGroup: "Maharaja's College",
//     },
//     {
//       icon: Dance,
//       title: "Folk Dance",
//       time: "4:00 PM - 5:00 PM",
//       description: "Regional folk dance performances celebrating culture",
//       category: "Dance",
//       type: "onstage",
//       gradient: "from-secondary to-chart-3",
//       winner: "second",
//       winnerGroup: "Government College",
//     },
//     {
//       icon: Dance,
//       title: "Western Dance Solo",
//       time: "5:00 PM - 6:00 PM",
//       description: "Contemporary and modern dance styles",
//       category: "Dance",
//       type: "onstage",
//       gradient: "from-secondary to-chart-3",
//       winner: "first",
//       winnerGroup: "St. Teresa's College",
//     },
//     {
//       icon: Dance,
//       title: "Group Dance",
//       time: "6:00 PM - 7:00 PM",
//       description: "Synchronized team dance performances",
//       category: "Dance",
//       type: "onstage",
//       gradient: "from-secondary to-chart-3",
//       winner: "third",
//       winnerGroup: "UC College",
//     },
//     {
//       icon: Drama,
//       title: "Mono Acting",
//       time: "9:00 AM - 10:00 AM",
//       description: "Solo theatrical performances showcasing acting skills",
//       category: "Theatre",
//       type: "onstage",
//       gradient: "from-chart-3 to-chart-4",
//       winner: "first",
//       winnerGroup: "Fatima Mata College",
//     },
//     {
//       icon: Drama,
//       title: "Mime",
//       time: "10:00 AM - 11:00 AM",
//       description: "Silent storytelling through body language and expressions",
//       category: "Theatre",
//       type: "onstage",
//       gradient: "from-chart-3 to-chart-4",
//       winner: "second",
//       winnerGroup: "Newman College",
//     },
//     {
//       icon: Drama,
//       title: "Skit",
//       time: "11:00 AM - 12:00 PM",
//       description: "Short dramatic performances with social messages",
//       category: "Theatre",
//       type: "onstage",
//       gradient: "from-chart-3 to-chart-4",
//       winner: "first",
//       winnerGroup: "St. Dominic's College",
//     },
//     {
//       icon: Mic,
//       title: "Elocution English",
//       time: "2:00 PM - 3:00 PM",
//       description: "English oratory and public speaking competition",
//       category: "Literature",
//       type: "onstage",
//       gradient: "from-secondary to-chart-2",
//       winner: "first",
//       winnerGroup: "Mar Ivanios College",
//     },
//     {
//       icon: Mic,
//       title: "Elocution Malayalam",
//       time: "3:00 PM - 4:00 PM",
//       description: "Malayalam language oratory competition",
//       category: "Literature",
//       type: "onstage",
//       gradient: "from-secondary to-chart-2",
//       winner: "second",
//       winnerGroup: "CMS College",
//     },

//     // Offstage Programs
//     {
//       icon: Palette,
//       title: "Painting",
//       time: "9:00 AM - 12:00 PM",
//       description: "Creative painting competition with various themes",
//       category: "Visual Arts",
//       type: "offstage",
//       gradient: "from-chart-4 to-primary",
//       winner: "first",
//       winnerGroup: "St. Xavier's College",
//     },
//     {
//       icon: Palette,
//       title: "Pencil Drawing",
//       time: "9:00 AM - 12:00 PM",
//       description: "Artistic pencil sketching and drawing competition",
//       category: "Visual Arts",
//       type: "offstage",
//       gradient: "from-chart-4 to-primary",
//       winner: "second",
//       winnerGroup: "Baselius College",
//     },
//     {
//       icon: Palette,
//       title: "Cartoon Drawing",
//       time: "9:00 AM - 12:00 PM",
//       description: "Creative cartoon and caricature drawing",
//       category: "Visual Arts",
//       type: "offstage",
//       gradient: "from-chart-4 to-primary",
//       winner: "third",
//       winnerGroup: "St. Paul's College",
//     },
//     {
//       icon: Camera,
//       title: "Photography",
//       time: "All Day",
//       description: "Capturing artistic moments and creative compositions",
//       category: "Photography",
//       type: "offstage",
//       gradient: "from-primary to-secondary",
//       winner: "first",
//       winnerGroup: "Loyola College",
//     },
//     {
//       icon: Mic,
//       title: "Poetry Writing English",
//       time: "10:00 AM - 12:00 PM",
//       description: "Creative English poetry composition",
//       category: "Literature",
//       type: "offstage",
//       gradient: "from-secondary to-chart-2",
//       winner: "first",
//       winnerGroup: "St. Berchmans College",
//     },
//     {
//       icon: Mic,
//       title: "Poetry Writing Malayalam",
//       time: "10:00 AM - 12:00 PM",
//       description: "Malayalam poetry and creative writing",
//       category: "Literature",
//       type: "offstage",
//       gradient: "from-secondary to-chart-2",
//       winner: "second",
//       winnerGroup: "Deva Matha College",
//     },
//     {
//       icon: Mic,
//       title: "Short Story Writing",
//       time: "2:00 PM - 4:00 PM",
//       description: "Creative short story composition in various genres",
//       category: "Literature",
//       type: "offstage",
//       gradient: "from-secondary to-chart-2",
//       winner: "third",
//       winnerGroup: "St. Joseph's College",
//     },
//     {
//       icon: Palette,
//       title: "Collage Making",
//       time: "9:00 AM - 11:00 AM",
//       description: "Artistic collage creation with mixed media",
//       category: "Visual Arts",
//       type: "offstage",
//       gradient: "from-chart-4 to-primary",
//       winner: "first",
//       winnerGroup: "Alphonsa College",
//     },
//     {
//       icon: Palette,
//       title: "Poster Making",
//       time: "11:00 AM - 1:00 PM",
//       description: "Creative poster design with social themes",
//       category: "Visual Arts",
//       type: "offstage",
//       gradient: "from-chart-4 to-primary",
//       winner: "second",
//       winnerGroup: "St. Mary's College",
//     },
//     {
//       icon: Music,
//       title: "Instrumental Solo",
//       time: "1:00 PM - 2:00 PM",
//       description: "Individual instrumental music performances",
//       category: "Music",
//       type: "onstage",
//       gradient: "from-primary to-chart-2",
//       winner: "first",
//       winnerGroup: "Christ College",
//     },
//     // ... Continue with more programs to reach 130+
//   ]

//   const filteredPrograms = allPrograms.filter((program) => {
//     if (selectedCategory === "all") return true
//     if (selectedCategory === "onstage") return program.type === "onstage"
//     if (selectedCategory === "offstage") return program.type === "offstage"
//     return program.category === selectedCategory
//   })

//   const displayedPrograms = filteredPrograms.slice(0, displayCount)

//   const WinnerBadge = ({ winner, winnerGroup }) => {
//     if (!winner) return null

//     const badgeConfig = {
//       first: { icon: Trophy, color: "text-yellow-600 bg-yellow-100", label: "1st Place" },
//       second: { icon: Award, color: "text-gray-600 bg-gray-100", label: "2nd Place" },
//       third: { icon: Star, color: "text-orange-600 bg-orange-100", label: "3rd Place" },
//     }

//     const config = badgeConfig[winner]
//     const Icon = config.icon

//     return (
//       <div className={`${config.color} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 mb-2`}>
//         <Icon className="w-4 h-4" />
//         {config.label}
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">


//       <section className="pt-24 pb-16 bg-gradient-to-br from-muted to-background">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h1 className="text-5xl font-bold mb-6 festival-text-gradient animate-slide-in-right">Festival Programs</h1>
//             <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right delay-150">
//               Discover 130+ diverse artistic programs and competitions that make UMMATHEE a celebration of creativity
//             </p>
//           </div>

//           <div className="flex flex-wrap justify-center gap-4 mb-12">
//             {[
//               { key: "all", label: "All Programs", count: allPrograms.length },
//               { key: "onstage", label: "Onstage", count: allPrograms.filter((p) => p.type === "onstage").length },
//               { key: "offstage", label: "Offstage", count: allPrograms.filter((p) => p.type === "offstage").length },
//               { key: "Music", label: "Music", count: allPrograms.filter((p) => p.category === "Music").length },
//               { key: "Dance", label: "Dance", count: allPrograms.filter((p) => p.category === "Dance").length },
//               { key: "Theatre", label: "Theatre", count: allPrograms.filter((p) => p.category === "Theatre").length },
//               {
//                 key: "Visual Arts",
//                 label: "Visual Arts",
//                 count: allPrograms.filter((p) => p.category === "Visual Arts").length,
//               },
//               {
//                 key: "Literature",
//                 label: "Literature",
//                 count: allPrograms.filter((p) => p.category === "Literature").length,
//               },
//               {
//                 key: "Photography",
//                 label: "Photography",
//                 count: allPrograms.filter((p) => p.category === "Photography").length,
//               },
//             ].map((category) => (
//               <button
//                 key={category.key}
//                 onClick={() => {
//                   setSelectedCategory(category.key)
//                   setDisplayCount(12)
//                 }}
//                 className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
//                   selectedCategory === category.key
//                     ? "bg-primary text-primary-foreground shadow-lg scale-105"
//                     : "bg-card text-card-foreground hover:bg-primary/10 hover:scale-105"
//                 }`}
//               >
//                 <Filter className="w-4 h-4" />
//                 {category.label}
//                 <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">{category.count}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-20">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-8">
//             <p className="text-lg text-muted-foreground">
//               Showing {displayedPrograms.length} of {filteredPrograms.length} programs
//               {selectedCategory !== "all" && ` in ${selectedCategory}`}
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {displayedPrograms.map((program, index) => {
//               const Icon = program.icon
//               return (
//                 <div key={index} className="group animate-rotate-in" style={{ animationDelay: `${index * 50}ms` }}>
//                   <div className="bg-card rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-border relative overflow-hidden">
//                     <div className="absolute top-4 right-4">
//                       <WinnerBadge winner={program.winner} winnerGroup={program.winnerGroup} />
//                     </div>

//                     <div
//                       className={`bg-gradient-to-r ${program.gradient} w-16 h-16 rounded-lg flex items-center justify-center mb-6 animate-pulse-glow`}
//                     >
//                       <Icon className="w-8 h-8 text-white" />
//                     </div>

//                     <div className="mb-4 flex flex-wrap gap-2">
//                       <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
//                         {program.category}
//                       </span>
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           program.type === "onstage" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
//                         }`}
//                       >
//                         {program.type === "onstage" ? "On Stage" : "Off Stage"}
//                       </span>
//                     </div>

//                     <h3 className="text-xl font-bold mb-2 text-card-foreground">{program.title}</h3>
//                     <p className="text-primary font-semibold mb-3">{program.time}</p>
//                     <p className="text-muted-foreground leading-relaxed mb-4">{program.description}</p>

//                     {program.winner && (
//                       <div className="mb-4 p-3 bg-muted rounded-lg">
//                         <p className="text-sm font-semibold text-foreground">Winner: {program.winnerGroup}</p>
//                       </div>
//                     )}

//                     <div className="mt-6 pt-4 border-t border-border">
//                       <button className="text-primary hover:text-primary/80 font-semibold group-hover:translate-x-1 transition-transform duration-300">
//                         Learn More →
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>

//           {displayCount < filteredPrograms.length && (
//             <div className="text-center mt-12">
//               <button
//                 onClick={() => setDisplayCount((prev) => Math.min(prev + 12, filteredPrograms.length))}
//                 className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
//               >
//                 Load More Programs
//                 <ChevronDown className="w-5 h-5" />
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       <section className="py-20 bg-muted">
//         <div className="max-w-4xl mx-auto px-4">
//           <h2 className="text-4xl font-bold text-center mb-16 festival-text-gradient">Event Schedule</h2>

//           <div className="space-y-8">
//             {[
//               { time: "9:00 AM", event: "Registration & Welcome", description: "Check-in and festival orientation" },
//               {
//                 time: "10:00 AM",
//                 event: "Musical Performances Begin",
//                 description: "Opening ceremony with musical acts",
//               },
//               { time: "12:00 PM", event: "Lunch Break", description: "Networking and refreshments" },
//               { time: "2:00 PM", event: "Dance Competitions", description: "Various dance categories and styles" },
//               { time: "4:00 PM", event: "Poetry & Literature", description: "Spoken word and creative writing" },
//               { time: "6:00 PM", event: "Theatrical Performances", description: "Drama and theatrical presentations" },
//               { time: "8:00 PM", event: "Awards Ceremony", description: "Recognition and closing ceremony" },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-start animate-slide-in-right"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold min-w-[100px] text-center">
//                   {item.time}
//                 </div>
//                 <div className="ml-6 flex-1">
//                   <h4 className="text-lg font-semibold text-foreground mb-1">{item.event}</h4>
//                   <p className="text-muted-foreground">{item.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>


//     </div>
//   )
// }

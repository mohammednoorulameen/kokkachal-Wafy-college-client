"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { Button } from "@/Components/ui/button";
import userInstance from "@/axios/UserInstance";
import { useNavigate } from "react-router-dom";

export default function ResultsPage() {
  const [teamResults, setTeamResults] = useState([]);
  const [overallChampions, setOverallChampions] = useState([]);
  const navigate = useNavigate(); 

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const championsRes = await userInstance.get("/get-winnig-studets");
        if (championsRes.data.success) {
          setOverallChampions(championsRes.data.data);
        }

        const teamRes = await userInstance.get("/get-winnigstudent-eachteams");
        if (teamRes.data.success) {
          setTeamResults(teamRes.data.data);
        }
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    fetchData();
  }, []);

  // Helper for badge colors
  // const getBadgeColor = (position) => {
  //   if (!position) return "from-gray-200 to-gray-400";
  //   const pos = position.toLowerCase();
  //   if (pos === "first") return "from-yellow-400 to-yellow-600";
  //   if (pos === "second") return "from-gray-400 to-gray-600";
  //   if (pos === "third") return "from-orange-400 to-orange-600";
  //   return "from-gray-200 to-gray-400";
  // };

  return (
    <div className="min-h-screen bg-background">

      {/* Page Header */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-muted to-background">
        <div className="max-w-6xl mx-auto px-4 text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 festival-text-gradient animate-slide-in-right">
            Competition Results
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right delay-150">
            Celebrating the outstanding achievements and artistic excellence
            of our talented participants
          </p>
        </div>
      </section>

      {/* Overall Champions */}
     {/* Overall Champions */}
{/* Overall Champions */}
{/* <section className="py-16 bg-primary/5">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12 festival-text-gradient">
      Overall Champions
    </h2>

    <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-4">
      {overallChampions.length > 0 ? (
        overallChampions.map((winner, index) => {
          const Icon = Trophy; // you can choose dynamic icons if needed
          const badgeColor = getBadgeColor(winner.position);
          return (
            <div
              key={index}
              className="text-center flex-shrink-0 animate-festival-bounce"
              style={{ animationDelay: `${index * 200}ms`, minWidth: '200px' }}
            >
              <div
                className={`bg-gradient-to-br ${badgeColor} w-16 md:w-24 h-16 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse-glow`}
              >
                <Icon className="w-6 md:w-12 h-6 md:h-12 text-white" />
              </div>
              <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-foreground">
                {winner.position}
              </h3>
              <p className="text-sm md:text-2xl font-bold text-primary mb-1 md:mb-2">
                {winner.name}
              </p>
              <p className="text-xs md:text-muted-foreground">
                {winner.points} Points
              </p>
            </div>
          );
        })
      ) : (
        <p className="text-center col-span-3 text-muted-foreground">
          No champions available.
        </p>
      )}
    </div>
  </div>
</section> */}
{/* Overall Champions */}


{/* Overall Champions */}
<section className="py-16">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12 festival-text-gradient">
      Overall Champions
    </h2>

    {/* Horizontal scroll for small screens, grid for medium+ */}
    <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:gap-6 scrollbar-hide">
      {overallChampions.length > 0 ? (
        overallChampions.map((winner, index) => {
          const Icon = Trophy; // or Medal/Award dynamically
          const color =
            winner.position?.toLowerCase() === "first"
              ? "from-yellow-400 to-yellow-600"
              : winner.position?.toLowerCase() === "second"
              ? "from-gray-400 to-gray-600"
              : winner.position?.toLowerCase() === "third"
              ? "from-orange-400 to-orange-600"
              : "from-gray-200 to-gray-400";

          return (
            <div
              key={index}
              className="text-center flex-shrink-0 w-56 md:w-auto animate-festival-bounce"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`bg-gradient-to-br ${color} w-16 md:w-24 h-16 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse-glow`}
              >
                <Icon className="w-6 md:w-12 h-6 md:h-12 text-white" />
              </div>
              <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-foreground">
                {winner.position}
              </h3>
              <p className="text-sm md:text-2xl font-bold text-primary mb-1 md:mb-2">
                {winner.name}
              </p>
              <p className="text-xs md:text-muted-foreground">
                {winner.points} Points
              </p>
            </div>
          );
        })
      ) : (
        <p className="text-center col-span-3 text-muted-foreground">
          No champions available.
        </p>
      )}
    </div>
  </div>
</section>


      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Zone Results Heading */}
          <h2 className="text-4xl font-bold text-center mb-12 festival-text-gradient">
            Zone Results
          </h2>

          <div className="overflow-x-auto lg:overflow-x-visible px-2 lg:px-0">
            <div className="flex justify-center">
                <div
                  className="min-w-[220px] flex-shrink-0 animate-slide-in-right"
                  style={{ animationDelay: `${1 * 200}ms` }}
                >
                  <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center">
                    <p className="font-bold text-lg">Themhidhiyya</p>
                  </div>
                </div>
            </div>
          </div>

          {/* View More Button */}
          <div className="mt-8 text-center">
            

            <Button onClick={() => navigate("/zoneresult")} >view more </Button>
          </div>
        </div>
      </section>



      {/* Team Winners */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 festival-text-gradient">
            Team Winners
          </h2>

          <div className="overflow-x-auto lg:overflow-x-visible px-4 lg:px-0">
            <div className="flex gap-6 lg:grid lg:grid-cols-2">
              {teamResults.length > 0 ? (
                teamResults.map((team, teamIndex) => (
                  <div
                    key={teamIndex}
                    className="min-w-[280px] flex-shrink-0 animate-slide-in-right"
                    style={{ animationDelay: `${teamIndex * 200}ms` }}
                  >
                    <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                      <h3 className="text-2xl font-bold text-center mb-4 text-card-foreground">
                        {team.team}
                      </h3>
                      <div className="space-y-4">
                        {team.topStudents.map((student, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-primary/5 transition-colors duration-300"
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 ${
                                  index === 0
                                    ? "bg-yellow-500"
                                    : index === 1
                                    ? "bg-gray-500"
                                    : "bg-orange-500"
                                }`}
                              >
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-semibold text-foreground">
                                  {student.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Chess Number: {student.chessNumber}
                                </p>
                              </div>
                            </div>
                            <div className="text-primary font-bold">
                              {student.points} pts
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-2 text-muted-foreground">
                  No team results available.
                </p>
              )}
              <div className="w-4 lg:hidden"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


// "use client";


// import { useEffect, useState } from "react";
// import { Button } from "@/Components/ui/button";
// import { Trophy } from "lucide-react";
// import userInstance from "@/axios/UserInstance";

// export default function ResultsPage() {
//   const [teamResults, setTeamResults] = useState([]);
//    const [overallChampions, setOverallChampions] = useState([]);

//   // Fetch API data
//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const res = await userInstance.get("/get-winnigstudent-eachteams");
//         if (res.data.success) {
//           setTeamResults(res.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching team results:", err);
//       }
//     };

//     const fetchChampions = async () => {
//       try {
//         const res = await userInstance.get("/get-winnig-studets");
//         if (res.data.success) {
//           setOverallChampions(res.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching champions:", err);
//       }
//     };
//     fetchChampions();
//     fetchResults();
//   }, []);

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Page Header */}
//       <section className="pt-24 pb-16 bg-gradient-to-br from-muted to-background">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h1 className="text-5xl font-bold mb-6 festival-text-gradient animate-slide-in-right">
//               Competition Results
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right delay-150">
//               Celebrating the outstanding achievements and artistic excellence
//               of our talented participants
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Overall Champions */}
//       {/* <section className="py-16 bg-primary/5">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 festival-text-gradient">
//             Overall Champions
//           </h2>
//           <div className="grid grid-cols-3 gap-4">
//             {[
//               { position: "First", name: "Arjun Krishnan", points: "95 Points", icon: Trophy, color: "from-yellow-400 to-yellow-600" },
//               { position: "Second", name: "Kavya Nair", points: "88 Points", icon: Trophy, color: "from-gray-400 to-gray-600" },
//               { position: "Third", name: "Drama Club", points: "82 Points", icon: Trophy, color: "from-orange-400 to-orange-600" },
//             ].map((winner, index) => {
//               const Icon = winner.icon;
//               return (
//                 <div key={index} className="text-center animate-festival-bounce" style={{ animationDelay: `${index * 200}ms` }}>
//                   <div className={`bg-gradient-to-br ${winner.color} w-16 md:w-24 h-16 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse-glow`}>
//                     <Icon className="w-6 md:w-12 h-6 md:h-12 text-white" />
//                   </div>
//                   <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-foreground">{winner.position}</h3>
//                   <p className="text-sm md:text-2xl font-bold text-primary mb-1 md:mb-2">{winner.name}</p>
//                   <p className="text-xs md:text-muted-foreground">{winner.points}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section> */}
//          <section className="py-16 bg-primary/5">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-12 festival-text-gradient">
//           Overall Champions
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {overallChampions.length > 0 ? (
//             overallChampions.map((winner, index) => (
//               <div key={index} className="text-center animate-festival-bounce" style={{ animationDelay: `${index * 200}ms` }}>
//                 <div
//                   className={`bg-gradient-to-br ${getBadgeColor(winner.position)} w-16 md:w-24 h-16 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse-glow`}
//                 >
//                   <Trophy className="w-6 md:w-12 h-6 md:h-12 text-white" />
//                 </div>
//                 <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-foreground">
//                   {winner.position}
//                 </h3>
//                 <p className="text-sm md:text-2xl font-bold text-primary mb-1 md:mb-2">
//                   {winner.name}
//                 </p>
//                 <p className="text-xs md:text-muted-foreground">
//                   {winner.points} Points
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-center col-span-3 text-muted-foreground">No champions available.</p>
//           )}
//         </div>
//       </div>
//     </section>

//       {/* Team Winners */}
//       <section className="py-20">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-4xl font-bold text-center mb-16 festival-text-gradient">
//             Team Winners
//           </h2>

//           <div className="overflow-x-auto lg:overflow-x-visible px-4 lg:px-0">
//             <div className="flex gap-6 lg:grid lg:grid-cols-2">
//               {teamResults.length > 0 ? teamResults.map((team, teamIndex) => (
//                 <div
//                   key={teamIndex}
//                   className="min-w-[280px] flex-shrink-0 animate-slide-in-right"
//                   style={{ animationDelay: `${teamIndex * 200}ms` }}
//                 >
//                   <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
//                     <h3 className="text-2xl font-bold text-center mb-4 text-card-foreground">
//                       {team.team}
//                     </h3>
//                     <div className="space-y-4">
//                       {team.topStudents.map((student, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-primary/5 transition-colors duration-300"
//                         >
//                           <div className="flex items-center">
//                             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 ${
//                                 index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-500" : "bg-orange-500"
//                               }`}>
//                               {index + 1}
//                             </div>
//                             <div>
//                               <p className="font-semibold text-foreground">{student.name}</p>
//                               <p className="text-sm text-muted-foreground">Chess Number: {student.chessNumber}</p>
//                             </div>
//                           </div>
//                           <div className="text-primary font-bold">{student.points} pts</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )) : (
//                 <p className="text-center col-span-2 text-muted-foreground">No team results available.</p>
//               )}
//               <div className="w-4 lg:hidden"></div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// import { Button } from "@/Components/ui/button";
// import { Trophy, Medal, Award, Star } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function ResultsPage() {
//   // const categories = [
//   //   {
//   //     title: "Music Competitions",
//   //     icon: Trophy,
//   //     results: [
//   //       { position: "1st", name: "Arjun Krishnan", event: "Classical Vocal", prize: "₹5,000" },
//   //       { position: "2nd", name: "Priya Sharma", event: "Western Vocal", prize: "₹3,000" },
//   //       { position: "3rd", name: "Rahul Menon", event: "Instrumental", prize: "₹2,000" },
//   //     ],
//   //   },
//   //   {
//   //     title: "Dance Competitions",
//   //     icon: Medal,
//   //     results: [
//   //       { position: "1st", name: "Kavya Nair", event: "Classical Dance", prize: "₹5,000" },
//   //       { position: "2nd", name: "Dance Crew Alpha", event: "Group Dance", prize: "₹4,000" },
//   //       { position: "3rd", name: "Sneha Pillai", event: "Folk Dance", prize: "₹2,000" },
//   //     ],
//   //   },
//   //   {
//   //     title: "Theatre & Drama",
//   //     icon: Award,
//   //     results: [
//   //       { position: "1st", name: "Drama Club", event: "Best Play", prize: "₹6,000" },
//   //       { position: "2nd", name: "Aditya Kumar", event: "Best Actor", prize: "₹3,000" },
//   //       { position: "3rd", name: "Meera Joshi", event: "Best Actress", prize: "₹3,000" },
//   //     ],
//   //   },
//   //   {
//   //     title: "Visual Arts",
//   //     icon: Star,
//   //     results: [
//   //       { position: "1st", name: "Ananya Reddy", event: "Painting", prize: "₹4,000" },
//   //       { position: "2nd", name: "Vikram Singh", event: "Sculpture", prize: "₹3,000" },
//   //       { position: "3rd", name: "Riya Patel", event: "Digital Art", prize: "₹2,000" },
//   //     ],
//   //   },
//   // ];

//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Page Header */}
//       <section className="pt-24 pb-16 bg-gradient-to-br from-muted to-background">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h1 className="text-5xl font-bold mb-6 festival-text-gradient animate-slide-in-right">
//               Competition Results
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right delay-150">
//               Celebrating the outstanding achievements and artistic excellence
//               of our talented participants
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Overall Champions */}
      // <section className="py-16 bg-primary/5">
      //   <div className="max-w-6xl mx-auto px-4">
      //     <h2 className="text-3xl font-bold text-center mb-12 festival-text-gradient">
      //       Overall Champions
      //     </h2>

      //     <div className="grid grid-cols-3 gap-4">
      //       {[
      //         { position: "First", name: "Arjun Krishnan", points: "95 Points", icon: Trophy, color: "from-yellow-400 to-yellow-600" },
      //         { position: "Second", name: "Kavya Nair", points: "88 Points", icon: Medal, color: "from-gray-400 to-gray-600" },
      //         { position: "Third", name: "Drama Club", points: "82 Points", icon: Award, color: "from-orange-400 to-orange-600" },
      //       ].map((winner, index) => {
      //         const Icon = winner.icon;
      //         return (
      //           <div key={index} className="text-center animate-festival-bounce" style={{ animationDelay: `${index * 200}ms` }}>
      //             <div className={`bg-gradient-to-br ${winner.color} w-16 md:w-24 h-16 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse-glow`}>
      //               <Icon className="w-6 md:w-12 h-6 md:h-12 text-white" />
      //             </div>
      //             <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-foreground">{winner.position}</h3>
      //             <p className="text-sm md:text-2xl font-bold text-primary mb-1 md:mb-2">{winner.name}</p>
      //             <p className="text-xs md:text-muted-foreground">{winner.points}</p>
      //           </div>
      //         );
      //       })}
      //     </div>
      //   </div>
      // </section>

//       {/* Zone Results */}
//       <section className="py-20">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-4xl font-bold text-center mb-12 festival-text-gradient">Zone Results</h2>

//           <div className="overflow-x-auto lg:overflow-x-visible px-2 lg:px-0">
//             <div className="flex justify-center">
//               <div className="min-w-[220px] flex-shrink-0 animate-slide-in-right" style={{ animationDelay: `${1 * 200}ms` }}>
//                 <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center">
//                   <p className="font-bold text-lg">Themhidhiyya</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 text-center">
//             <Button onClick={() => navigate("/zoneresult")}>View More</Button>
//           </div>
//         </div>
//       </section>

//       {/* Category Winners */}
//       <section className="py-20">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-4xl font-bold text-center mb-16 festival-text-gradient">Category Winners</h2>

//           <div className="overflow-x-auto lg:overflow-x-visible px-4 lg:px-0">
//             <div className="flex gap-6 lg:grid lg:grid-cols-2">
//               {categories.map((category, categoryIndex) => {
//                 const Icon = category.icon;
//                 return (
//                   <div key={categoryIndex} className="min-w-[280px] flex-shrink-0 animate-slide-in-right" style={{ animationDelay: `${categoryIndex * 200}ms` }}>
//                     <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
//                       <div className="flex items-center mb-6">
//                         <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
//                           <Icon className="w-6 h-6 text-primary" />
//                         </div>
//                         <h3 className="text-2xl font-bold text-card-foreground">{category.title}</h3>
//                       </div>

//                       <div className="space-y-4">
//                         {category.results.map((result, index) => (
//                           <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-primary/5 transition-colors duration-300">
//                             <div className="flex items-center">
//                               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 ${
//                                   result.position === "1st" ? "bg-yellow-500" :
//                                   result.position === "2nd" ? "bg-gray-500" : "bg-orange-500"
//                                 }`}>
//                                 {result.position === "1st" ? "1" : result.position === "2nd" ? "2" : "3"}
//                               </div>
//                               <div>
//                                 <p className="font-semibold text-foreground">{result.name}</p>
//                                 <p className="text-sm text-muted-foreground">{result.event}</p>
//                               </div>
//                             </div>
//                             <div className="text-primary font-bold">{result.prize}</div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//               <div className="w-4 lg:hidden"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Participation Recognition */}
//       <section className="py-16 bg-muted">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-8 festival-text-gradient">Participation Recognition</h2>
//           <p className="text-lg text-muted-foreground mb-8">
//             Every participant receives a certificate of participation and our heartfelt appreciation for contributing to the success of UMMATHEE Arts Festival.
//           </p>
//           <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-xl text-black">
//             <h3 className="text-2xl font-bold mb-4">Special Recognition</h3>
//             <p className="text-black/90">
//               We extend our gratitude to all 500+ participants who made this festival a grand success. Your creativity, passion, and dedication inspire us all.
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// import { Button } from "@/Components/ui/button";
// import { Trophy, Medal, Award, Star } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function ResultsPage() {
//   const categories = [
//     {
//       title: "Music Competitions",
//       icon: Trophy,
//       results: [
//         {
//           position: "1st",
//           name: "Arjun Krishnan",
//           event: "Classical Vocal",
//           prize: "₹5,000",
//         },
//         {
//           position: "2nd",
//           name: "Priya Sharma",
//           event: "Western Vocal",
//           prize: "₹3,000",
//         },
//         {
//           position: "3rd",
//           name: "Rahul Menon",
//           event: "Instrumental",
//           prize: "₹2,000",
//         },
//       ],
//     },
//     {
//       title: "Dance Competitions",
//       icon: Medal,
//       results: [
//         {
//           position: "1st",
//           name: "Kavya Nair",
//           event: "Classical Dance",
//           prize: "₹5,000",
//         },
//         {
//           position: "2nd",
//           name: "Dance Crew Alpha",
//           event: "Group Dance",
//           prize: "₹4,000",
//         },
//         {
//           position: "3rd",
//           name: "Sneha Pillai",
//           event: "Folk Dance",
//           prize: "₹2,000",
//         },
//       ],
//     },
//     {
//       title: "Theatre & Drama",
//       icon: Award,
//       results: [
//         {
//           position: "1st",
//           name: "Drama Club",
//           event: "Best Play",
//           prize: "₹6,000",
//         },
//         {
//           position: "2nd",
//           name: "Aditya Kumar",
//           event: "Best Actor",
//           prize: "₹3,000",
//         },
//         {
//           position: "3rd",
//           name: "Meera Joshi",
//           event: "Best Actress",
//           prize: "₹3,000",
//         },
//       ],
//     },
//     {
//       title: "Visual Arts",
//       icon: Star,
//       results: [
//         {
//           position: "1st",
//           name: "Ananya Reddy",
//           event: "Painting",
//           prize: "₹4,000",
//         },
//         {
//           position: "2nd",
//           name: "Vikram Singh",
//           event: "Sculpture",
//           prize: "₹3,000",
//         },
//         {
//           position: "3rd",
//           name: "Riya Patel",
//           event: "Digital Art",
//           prize: "₹2,000",
//         },
//       ],
//     },
//   ];

//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-background">
//       <section className="pt-24 pb-16 bg-gradient-to-br from-muted to-background">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h1 className="text-5xl font-bold mb-6 festival-text-gradient animate-slide-in-right">
//               Competition Results
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right delay-150">
//               Celebrating the outstanding achievements and artistic excellence
//               of our talented participants
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* <section className="py-16 bg-primary/5">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 festival-text-gradient">
//             Overall Champions
//           </h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 position: "Overall Winner",
//                 name: "Arjun Krishnan",
//                 points: "95 Points",
//                 icon: Trophy,
//                 color: "from-yellow-400 to-yellow-600",
//               },
//               {
//                 position: "Runner Up",
//                 name: "Kavya Nair",
//                 points: "88 Points",
//                 icon: Medal,
//                 color: "from-gray-400 to-gray-600",
//               },
//               {
//                 position: "Second Runner Up",
//                 name: "Drama Club",
//                 points: "82 Points",
//                 icon: Award,
//                 color: "from-orange-400 to-orange-600",
//               },
//             ].map((winner, index) => {
//               const Icon = winner.icon;
//               return (
//                 <div
//                   key={index}
//                   className="text-center animate-festival-bounce"
//                   style={{ animationDelay: `${index * 200}ms` }}
//                 >
//                   <div
//                     className={`bg-gradient-to-br ${winner.color} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow`}
//                   >
//                     <Icon className="w-12 h-12 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold mb-2 text-foreground">
//                     {winner.position}
//                   </h3>
//                   <p className="text-2xl font-bold text-primary mb-2">
//                     {winner.name}
//                   </p>
//                   <p className="text-muted-foreground">{winner.points}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section> */}

//       <div className="grid grid-cols-3 gap-4">
//   {[
//     {
//       position: "Overall Winner",
//       name: "Arjun Krishnan",
//       points: "95 Points",
//       icon: Trophy,
//       color: "from-yellow-400 to-yellow-600",
//     },
//     {
//       position: "Runner Up",
//       name: "Kavya Nair",
//       points: "88 Points",
//       icon: Medal,
//       color: "from-gray-400 to-gray-600",
//     },
//     {
//       position: "Second Runner Up",
//       name: "Drama Club",
//       points: "82 Points",
//       icon: Award,
//       color: "from-orange-400 to-orange-600",
//     },
//   ].map((winner, index) => {
//     const Icon = winner.icon;
//     return (
//       <div
//         key={index}
//         className="text-center animate-festival-bounce"
//         style={{ animationDelay: `${index * 200}ms` }}
//       >
//         <div
//           className={`bg-gradient-to-br ${winner.color} w-16 md:w-24 h-16 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse-glow`}
//         >
//           <Icon className="w-6 md:w-12 h-6 md:h-12 text-white" />
//         </div>
//         <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-foreground">
//           {winner.position}
//         </h3>
//         <p className="text-sm md:text-2xl font-bold text-primary mb-1 md:mb-2">
//           {winner.name}
//         </p>
//         <p className="text-xs md:text-muted-foreground">{winner.points}</p>
//       </div>
//     );
//   })}
// </div>


      // <section className="py-20">
      //   <div className="max-w-6xl mx-auto px-4">
      //     {/* Zone Results Heading */}
      //     <h2 className="text-4xl font-bold text-center mb-12 festival-text-gradient">
      //       Zone Results
      //     </h2>

      //     <div className="overflow-x-auto lg:overflow-x-visible px-2 lg:px-0">
      //       <div className="flex justify-center">
      //           <div
      //             className="min-w-[220px] flex-shrink-0 animate-slide-in-right"
      //             style={{ animationDelay: `${1 * 200}ms` }}
      //           >
      //             <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center">
      //               <p className="font-bold text-lg">Themhidhiyya</p>
      //             </div>
      //           </div>
      //       </div>
      //     </div>

      //     {/* View More Button */}
      //     <div className="mt-8 text-center">
            

      //       <Button onClick={() => navigate("/zoneresult")} >view more </Button>
      //     </div>
      //   </div>
      // </section>

//       <section className="py-20">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-4xl font-bold text-center mb-16 festival-text-gradient">
//             Category Winners
//           </h2>

//           <div className="overflow-x-auto lg:overflow-x-visible px-4 lg:px-0">
//             <div className="flex gap-6 lg:grid lg:grid-cols-2">
//               {categories.map((category, categoryIndex) => {
//                 const Icon = category.icon;
//                 return (
//                   <div
//                     key={categoryIndex}
//                     className="min-w-[280px] flex-shrink-0 animate-slide-in-right"
//                     style={{ animationDelay: `${categoryIndex * 200}ms` }}
//                   >
//                     <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
//                       <div className="flex items-center mb-6">
//                         <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
//                           <Icon className="w-6 h-6 text-primary" />
//                         </div>
//                         <h3 className="text-2xl font-bold text-card-foreground">
//                           {category.title}
//                         </h3>
//                       </div>

//                       <div className="space-y-4">
//                         {category.results.map((result, index) => (
//                           <div
//                             key={index}
//                             className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-primary/5 transition-colors duration-300"
//                           >
//                             <div className="flex items-center">
//                               <div
//                                 className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 ${
//                                   result.position === "1st"
//                                     ? "bg-yellow-500"
//                                     : result.position === "2nd"
//                                     ? "bg-gray-500"
//                                     : "bg-orange-500"
//                                 }`}
//                               >
//                                 {result.position === "1st"
//                                   ? "1"
//                                   : result.position === "2nd"
//                                   ? "2"
//                                   : "3"}
//                               </div>
//                               <div>
//                                 <p className="font-semibold text-foreground">
//                                   {result.name}
//                                 </p>
//                                 <p className="text-sm text-muted-foreground">
//                                   {result.event}
//                                 </p>
//                               </div>
//                             </div>
//                             <div className="text-primary font-bold">
//                               {result.prize}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//               {/* Add an extra padding div at the end to avoid last card cutoff */}
//               <div className="w-4 lg:hidden"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-muted">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-8 festival-text-gradient">
//             Participation Recognition
//           </h2>
//           <p className="text-lg text-muted-foreground mb-8">
//             Every participant receives a certificate of participation and our
//             heartfelt appreciation for contributing to the success of UMMATHEE
//             Arts Festival.
//           </p>
//           <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-xl text-black">
//             <h3 className="text-2xl font-bold mb-4">Special Recognition</h3>
//             <p className="text-black/90">
//               We extend our gratitude to all 500+ participants who made this
//               festival a grand success. Your creativity, passion, and dedication
//               inspire us all.
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// import { ArrowRight } from "lucide-react"

// export default function Results() {
//   const resultCategories = [
//     {
//       title: "JUNIOR",
//       subtitle: "Results",
//       image: "/college-festival-junior-category-results.png",
//       link: "#",
//     },
//     {
//       title: "SENIOR",
//       subtitle: "Results",
//       image: "/college-festival-senior-category-results.png",
//       link: "#",
//     },
//     {
//       title: "GENERAL",
//       subtitle: "Results",
//       image: "/college-festival-general-category-results.png",
//       link: "#",
//     },
//   ]

//   return (
//     <section id="results" className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">Total Results</h2>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {resultCategories.map((category, index) => (
//             <div
//               key={index}
//               className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
//               style={{ animationDelay: `${index * 200}ms` }}
//             >
//               <div className="relative overflow-hidden">
//                 <img
//                   src={category.image || "/placeholder.svg"}
//                   alt={category.title}
//                   className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//               </div>

//               <div className="p-6 flex items-center justify-between">
//                 <div>
//                   <h5 className="text-xl font-bold text-gray-900 mb-1">{category.title}</h5>
//                   <span className="text-gray-600">{category.subtitle}</span>
//                 </div>
//                 <a
//                   href={category.link}
//                   className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
//                 >
//                   <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

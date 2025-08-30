
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import userInstance from "@/axios/UserInstance";
import { useNavigate } from "react-router-dom";

export default function ResultsPage() {
  const [teamResults, setTeamResults] = useState([]);
  const [overallChampions, setOverallChampions] = useState([]);
  const navigate = useNavigate();
console.log(overallChampions)
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

  return (
    <div className="min-h-screen bg-[oklch(43.7%_0.078_188.216)] text-white">

      {/* Page Header */}
      <section className="pt-24 pb-16 text-center">
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <h1 className="text-5xl font-bold mb-6 animate-slide-in-right">
            Competition Results
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto animate-slide-in-right delay-150">
            Celebrating the outstanding achievements and artistic excellence
            of our talented participants
          </p>
        </div>
      </section>

        {/* Team Winners */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
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
                    <div className="bg-white/10 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                      <h3 className="text-2xl font-bold text-center mb-4">
                        {team.team}
                      </h3>
                      <div className="space-y-4">
                        {team.topStudents.map((student, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
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
                                <p className="font-semibold">{student.name}</p>
                                <p className="text-sm text-white/70">
                                  Chess Number: {student.chessNumber}
                                </p>
                              </div>
                            </div>
                            <div className="text-white font-bold">
                              {student.points} pts
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-2 text-white/70">
                  No team results available.
                </p>
              )}
              <div className="w-4 lg:hidden"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Overall Champions */}
    <section className="py-20 bg-[oklch(43.7%_0.078_188.216)] text-white">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">
      🏆 Overall Champions
    </h2>

    {/* Horizontal scroll on small screens, grid on medium/large */}
    <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-4 md:gap-8 scrollbar-hide pb-4 pt-6">
      {overallChampions.length > 0 ? (
        [...overallChampions]
          .sort((a, b) => b.points - a.points)
          .map((winner, index) => {
            const rank = index + 1;

            let badgeColor =
              rank === 1
                ? "bg-yellow-500 text-black"
                : rank === 2
                ? "bg-gray-400 text-black"
                : rank === 3
                ? "bg-orange-500 text-black"
                : rank === 4
                ? "bg-blue-500 text-white"
                : "bg-white/30 text-white";

            return (
              <div
                key={index}
                className="relative flex-shrink-0 w-64 pt-10 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-center"
              >
                {/* Position Badge */}
                <span
                  className={`absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full font-semibold shadow-md ${badgeColor}`}
                >
                  {rank === 1
                    ? "1st"
                    : rank === 2
                    ? "2nd"
                    : rank === 3
                    ? "3rd"
                    : `${rank}th`}
                </span>

                {/* Winner Details */}
                <h3 className="text-lg font-bold mb-2 truncate">{winner.name}</h3>
                <p className="text-white/70 text-sm">{winner.points} Points</p>
                <p className="text-white/70 text-sm">{winner.chessNumber} CN</p>
                <p className="text-white/70 text-sm">{winner.team} Team</p>
              </div>
            );
          })
      ) : (
        <p className="text-center col-span-4 text-white/70">
          No champions available.
        </p>
      )}
    </div>
  </div>
</section>


      {/* Zone Results */}
      <section className="py-10">
        {/* <div className="max-w-6xl mx-auto px-4"> */}
        <div >
          {/* <h2 className="text-4xl font-bold text-center mb-12">
            Zone Results
          </h2> */}

          {/* <div className="overflow-x-auto lg:overflow-x-visible px-2 lg:px-0">
            <div className="flex justify-center">
              <div
                className="min-w-[220px] flex-shrink-0 animate-slide-in-right"
                style={{ animationDelay: `200ms` }}
              >
                <div className="bg-white/10 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center">
                  <p className="font-bold text-lg">Themhidhiyya</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* View More Button */}
          <div className="mt-8 text-center">
            <Button
              onClick={() => navigate("/zoneresult")}
              className="bg-white text-black hover:bg-white/90"
            >
              View More
            </Button>
          </div>
        </div>
      </section>

    
    </div>
  );
}

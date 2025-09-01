"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import userInstance from "@/axios/UserInstance";

function ZoneResultsPage() {
  const [resultsData, setResultsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPrograms, setOpenPrograms] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Grade order: highest to lowest
  const gradeOrder = ["A+", "A", "B", "C"];

  // Custom sort function
  const sortByGrade = (a, b) => {
    const gradeA = a.program.grade || "";
    const gradeB = b.program.grade || "";

    // Empty grades go last
    if (!gradeA && !gradeB) return 0;
    if (!gradeA) return 1;
    if (!gradeB) return -1;

    return gradeOrder.indexOf(gradeA) - gradeOrder.indexOf(gradeB);
  };

  // Fetch API data
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await userInstance.get("/get-program-winnigstudent");
        if (res.data.success && res.data.data) {
          const formatted = Object.entries(res.data.data).map(
            ([category, programs]) => ({
              category,
              programs,
            })
          );
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
    return (
      <p className="text-center py-10 text-white/70">Loading results...</p>
    );
  }

  return (
    <section className="bg-[oklch(43.7%_0.078_188.216)] text-white min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Zone Results
        </h2>

        {/* Category & Search */}
        <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-white/30 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition bg-white/10 text-white w-full md:w-auto"
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
              className="border border-white/30 rounded-lg px-10 py-2 shadow-sm hover:shadow-md transition bg-white/10 text-white placeholder-white/70 w-full"
            />
            <Search
              className="absolute left-3 top-2.5 text-white/70"
              size={20}
            />
          </div>
        </div>

        {/* Programs */}
        {filteredPrograms.map((program, idx) => (
          <div
            key={program.programId || idx}
            className="mb-6 border border-white/20 rounded-xl overflow-hidden shadow-sm bg-white/10"
          >
            <button
              onClick={() => toggleProgram(idx)}
              className="w-full px-6 py-4 flex justify-between items-center bg-white/20 hover:bg-white/30 transition text-white font-semibold"
            >
              <span>{program.programName}</span>
              {openPrograms[idx] ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {openPrograms[idx] && (
              <div className="px-6 py-4 bg-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {program.topStudents && program.topStudents.length > 0 ? (
                    program.topStudents
                      .filter((s) => s.program.isActive)
                      .sort(sortByGrade)
                      .map((student, i) => (
                        <div
                          key={student._id || i}
                          className="flex flex-col justify-between p-4 border border-white/20 rounded-xl shadow-sm hover:shadow-md transition space-y-2 bg-white/10"
                        >
                          <p className="font-extrabold text-white truncate">
                            {student.name}
                          </p>
                          <div className="text-sm text-white/70 space-y-1">
                            <p className="font-bold">
                              Chess No: {student.chessNumber}
                            </p>
                            <p className="font-bold">Team: {student.team}</p>
                            <p className="font-bold">
                              Points: {student.points}
                            </p>
                            <p className="font-bold text-green-500">
                              Grade: {student.program.grade.toUpperCase()  || "Not graded"}
                            </p>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="col-span-full text-center text-white/70">
                      No top students
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredPrograms.length === 0 && (
          <p className="text-center text-white/70 mt-4">No programs found.</p>
        )}
      </div>
    </section>
  );
}

export default ZoneResultsPage;

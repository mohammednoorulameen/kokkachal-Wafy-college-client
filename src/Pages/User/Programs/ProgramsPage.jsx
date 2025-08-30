"use client";

import { useEffect, useState } from "react";
import userInstance from "@/axios/UserInstance";

export default function ProgramsPage() {
  const [allPrograms, setAllPrograms] = useState([]);
  const [displayCount, setDisplayCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch all programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await userInstance.get("/get-all-programs");
        if (res.data.success) {
          setAllPrograms(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch programs:", err);
      }
    };
    fetchPrograms();
  }, []);

  // Filter by search term
  const searchedPrograms = allPrograms.filter((program) =>
    program.programName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by category / level
  const filteredPrograms =
    selectedCategory === "all"
      ? searchedPrograms
      : searchedPrograms.filter((program) => {
          const programCategory =
            program.category?.category?.toLowerCase() || program.category?.toLowerCase() || "";
          return (
            programCategory === selectedCategory.toLowerCase() ||
            program.level?.toLowerCase() === selectedCategory.toLowerCase()
          );
        });

  // Programs to display
  const displayedPrograms = filteredPrograms.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-[oklch(43.7%_0.078_188.216)] text-white">
      
      {/* Header */}
      <section className="pt-24 pb-16 text-center">
        <h1 className="text-5xl font-bold mb-6">Festival Programs</h1>
        <p className="text-xl max-w-3xl mx-auto mb-8 text-white/80">
          Discover diverse artistic programs and competitions that make KAF a celebration of creativity
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search programs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-4 py-2 shadow-sm mb-6 bg-white/10 text-white placeholder-white/70"
        />

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "Junior", "Senior", "Thamheediyya"].map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setDisplayCount(10); // reset display count on filter
                }}
                className={`px-4 py-2 rounded-full border transition ${
                  isSelected
                    ? "bg-white text-black border-white"
                    : "bg-white/20 text-white border-white/30 hover:bg-white/30"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Programs */}
      <section className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {displayedPrograms.map((program) => (
          <div
            key={program._id}
            className="bg-white/10 rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-2">{program.programName}</h3>
            <p className="text-white/80 mb-2">{program.description}</p>
            <p className="text-sm text-white/60 mb-2">
              Created At: {new Date(program.createdAt).toLocaleDateString()}
            </p>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
              {program.category?.category || program.level || program.category || "Uncategorized"}
            </span>
          </div>
        ))}
      </section>

      {/* Load More Button */}
      {displayCount < filteredPrograms.length && (
        <div className="text-center pb-10">
          <button
            onClick={() => setDisplayCount((prev) => prev + 10)}
            className="bg-white text-black border px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}

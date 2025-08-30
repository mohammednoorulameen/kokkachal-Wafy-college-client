"use client";

import { useEffect, useState } from "react";
import userInstance from "@/axios/UserInstance";

export default function ProgramsPage() {
  const [allPrograms, setAllPrograms] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Map of category IDs or levels to names
  // const categoryMap = {
  //   junior: "Junior",
  //   senior: "Senior",
  //   // Music: "Music",
  //   // Dance: "Dance",
  //   // Theatre: "Theatre",
  // };

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
            program.level?.toLowerCase() === selectedCategory.toLowerCase() // if you have "level" field
          );
        });

  // Programs to display
  const displayedPrograms = filteredPrograms.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-24 pb-16 bg-gradient-to-br from-muted to-background text-center">
        <h1 className="text-5xl font-bold mb-6">Festival Programs</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Discover diverse artistic programs and competitions that make UMMATHEE a celebration of creativity
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search programs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-4 py-2 shadow-sm mb-6"
        />

        {/* Categories */}
      
        <div className="flex flex-wrap justify-center gap-4 mb-12">
  {["all", "Junior", "Senior","Thamheediyya"].map((cat) => {
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
            ? "bg-primary text-black border-black"
            : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-primary/20"
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
            className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-2">{program.programName}</h3>
            <p className="text-muted-foreground mb-2">{program.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              Created At: {new Date(program.createdAt).toLocaleDateString()}
            </p>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {program.category?.category || program.level || program.category || "Uncategorized"}
            </span>
          </div>
        ))}
      </section>

      {/* Load More Button */}
      {displayCount < filteredPrograms.length && (
        <div className="text-center mb-20">
          <button
            onClick={() => setDisplayCount((prev) => prev + 10)}
            className="bg-primary text-black border px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}


"use client"

import { useState } from "react"

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const categories = ["all", "college", "speech", "visual-arts", "photography"]

  const galleryItems = [
    { id: 1, category: "college", title: "College", image: "/college1.jpeg" },
    { id: 1, category: "college", title: "College", image: "/college2.jpeg" },
    { id: 1, category: "college", title: "College", image: "/college3.jpeg" },
    { id: 1, category: "speech", title: "speech", image: "/college4.jpeg" },
    // { id: 2, category: "dance", title: "Traditional Dance", image: "/traditional-cultural-dance-performance.png" },
    // { id: 3, category: "theatre", title: "Drama Performance", image: "/theatrical-drama-stage-performance.png" },
    // { id: 4, category: "visual-arts", title: "Art Exhibition", image: "/art-gallery-exhibition-paintings.png" },
    // { id: 5, category: "photography", title: "Photo Contest", image: "/photography-contest-display.png" },
    // { id: 6, category: "music", title: "Band Performance", image: "/college-band-music-performance.png" },
    // { id: 7, category: "dance", title: "Modern Dance", image: "/modern-contemporary-dance-performance.png" },
    // { id: 8, category: "theatre", title: "Comedy Skit", image: "/comedy-theatrical-performance-stage.png" },
    // { id: 9, category: "visual-arts", title: "Sculpture Display", image: "/sculpture-art-display-exhibition.png" },
  ]

  const filteredItems =
    activeFilter === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <div className="min-h-screen bg-[oklch(43.7%_0.078_188.216)] text-white">

      {/* Header */}
      <section className="pt-24 pb-16 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6 animate-slide-in-right">Festival Gallery</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto animate-slide-in-right delay-150">
            Relive the magical moments and artistic brilliance captured during KAF Arts Festival
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 animate-slide-in-right ${
                  activeFilter === category
                    ? "bg-white text-black shadow-lg scale-105"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div key={item.id} className="group animate-rotate-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="bg-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                        <p className="text-white/80 text-sm capitalize">{item.category.replace("-", " ")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm font-medium capitalize">{item.category.replace("-", " ")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

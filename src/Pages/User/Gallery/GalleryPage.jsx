"use client"

import { useState } from "react"

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const categories = ["all", "music", "dance", "theatre", "visual-arts", "photography"]

  const galleryItems = [
    { id: 1, category: "music", title: "Classical Concert", image: "/classical-music-concert-performance.png" },
    { id: 2, category: "dance", title: "Traditional Dance", image: "/traditional-cultural-dance-performance.png" },
    { id: 3, category: "theatre", title: "Drama Performance", image: "/theatrical-drama-stage-performance.png" },
    { id: 4, category: "visual-arts", title: "Art Exhibition", image: "/art-gallery-exhibition-paintings.png" },
    { id: 5, category: "photography", title: "Photo Contest", image: "/photography-contest-display.png" },
    { id: 6, category: "music", title: "Band Performance", image: "/college-band-music-performance.png" },
    { id: 7, category: "dance", title: "Modern Dance", image: "/modern-contemporary-dance-performance.png" },
    { id: 8, category: "theatre", title: "Comedy Skit", image: "/comedy-theatrical-performance-stage.png" },
    { id: 9, category: "visual-arts", title: "Sculpture Display", image: "/sculpture-art-display-exhibition.png" },
  ]

  const filteredItems =
    activeFilter === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <div className="min-h-screen bg-background">

      <section className="pt-24 pb-16 bg-gradient-to-br from-muted to-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 festival-text-gradient animate-slide-in-right">Festival Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right delay-150">
              Relive the magical moments and artistic brilliance captured during UMMATHEE Arts Festival
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 animate-slide-in-right ${
                  activeFilter === category
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div key={item.id} className="group animate-rotate-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
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
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">{item.title}</h3>
                    <p className="text-primary text-sm font-medium capitalize">{item.category.replace("-", " ")}</p>
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

import { ArrowRight } from "lucide-react"

export default function Results() {
  const resultCategories = [
    {
      title: "JUNIOR",
      subtitle: "Results",
      image: "/college-festival-junior-category-results.png",
      link: "#",
    },
    {
      title: "SENIOR",
      subtitle: "Results",
      image: "/college-festival-senior-category-results.png",
      link: "#",
    },
    {
      title: "GENERAL",
      subtitle: "Results",
      image: "/college-festival-general-category-results.png",
      link: "#",
    },
  ]

  return (
    <section id="results" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Total Results</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resultCategories.map((category, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <h5 className="text-xl font-bold text-gray-900 mb-1">{category.title}</h5>
                  <span className="text-gray-600">{category.subtitle}</span>
                </div>
                <a
                  href={category.link}
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                >
                  <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

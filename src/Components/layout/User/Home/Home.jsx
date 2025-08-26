// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"
import { ArrowRight, Sparkles, Calendar, Users, Trophy, Camera } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 festival-gradient animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-festival-bounce">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-white animate-pulse-glow" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-in-right">UMMATHEE</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 animate-slide-in-right delay-150">
            Arts Festival 2023-24
          </p>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto animate-slide-in-right delay-300">
            Celebrating creativity, culture, and artistic excellence in our vibrant college community
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right delay-450">
            <a
              href="/programs"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/gallery"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105"
            >
              View Gallery
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: "500+", label: "Participants" },
              { icon: Calendar, number: "15", label: "Events" },
              { icon: Trophy, number: "50+", label: "Winners" },
              { icon: Camera, number: "1000+", label: "Memories" },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="text-center animate-rotate-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary animate-festival-bounce" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 festival-text-gradient">Festival Highlights</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cultural Programs",
                description:
                  "Experience diverse cultural performances showcasing talent from across our college community.",
                href: "/programs",
                gradient: "from-primary to-secondary",
              },
              {
                title: "Art Gallery",
                description:
                  "Discover stunning visual arts, photography, and creative installations by our talented students.",
                href: "/gallery",
                gradient: "from-secondary to-chart-3",
              },
              {
                title: "Competition Results",
                description: "Celebrate our winners and see the incredible achievements from this year's competitions.",
                href: "/results",
                gradient: "from-chart-3 to-primary",
              },
            ].map((highlight, index) => (
              <div key={index} className="group animate-slide-in-right" style={{ animationDelay: `${index * 200}ms` }}>
                <div
                  className={`bg-gradient-to-br ${highlight.gradient} p-6 rounded-xl text-white hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
                >
                  <h3 className="text-xl font-bold mb-4">{highlight.title}</h3>
                  <p className="text-white/90 mb-6">{highlight.description}</p>
                  <a
                    href={highlight.href}
                    className="inline-flex items-center text-white hover:text-white/80 font-semibold"
                  >
                    Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  )
}

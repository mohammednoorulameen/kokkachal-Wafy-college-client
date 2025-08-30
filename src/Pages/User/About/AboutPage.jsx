import { Heart, Target, Eye, Users, Calendar, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[oklch(43.7%_0.078_188.216)] text-white">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 animate-slide-in-right">
              UMERALI SHIHAB THANGAL ISLAMIC ACADEMY KOKKACHAL
            </h1>
            <p className="text-xl max-w-3xl mx-auto animate-slide-in-right delay-150">
              A celebration of artistic excellence, cultural diversity, and creative expression 
              that brings our college community together
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description:
                  "To provide a platform for students to showcase their artistic talents, foster creativity, and celebrate the rich cultural heritage of our diverse community.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                description:
                  "To become the premier arts festival that inspires, educates, and connects students through the transformative power of creative expression.",
              },
              {
                icon: Heart,
                title: "Our Values",
                description:
                  "Creativity, inclusivity, excellence, and community spirit guide everything we do in creating memorable artistic experiences.",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="text-center animate-rotate-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="leading-relaxed text-white/80">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Festival Journey */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Festival Journey</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Story */}
            <div className="animate-slide-in-right">
              <h3 className="text-3xl font-bold mb-6">Our Story</h3>
              <p className="mb-6 leading-relaxed text-white/80">
                KAF Arts Festival began as a small cultural gathering and has grown into one 
                of the most anticipated events in our college calendar. Over the years, we’ve 
                witnessed incredible talent, fostered lasting friendships, and created memories 
                that last a lifetime.
              </p>
              <p className="mb-8 leading-relaxed text-white/80">
                From traditional dance performances to contemporary art installations, from musical 
                concerts to dramatic presentations, KAF celebrates every form of artistic 
                expression with equal enthusiasm and respect.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Users, number: "15+", label: "All Teachers" },
                  { icon: Calendar, number: "10+", label: "Years Running" },
                  { icon: Award, number: "50+", label: "Awards Given" },
                  { icon: Heart, number: "∞", label: "Memories Created" },
                ].map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={index}
                      className="text-center animate-festival-bounce"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-2 text-white" />
                      <div className="text-2xl font-bold">{stat.number}</div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Theme Box */}
            <div className="animate-slide-in-right delay-300">
              <div className="bg-white/10 p-8 rounded-2xl">
                <h4 className="text-2xl font-bold mb-4">This Year’s Theme</h4>
                <p className="mb-6 text-white/90">
                  Celebrating the beautiful tapestry of cultures, traditions, and artistic
                  expressions that make our college community unique and vibrant.
                </p>
                <div className="bg-white/20 p-4 rounded-lg">
                  <p className="text-sm text-white italic">
                    “Art is not what you see, but what you make others see.” — Edgar Degas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}


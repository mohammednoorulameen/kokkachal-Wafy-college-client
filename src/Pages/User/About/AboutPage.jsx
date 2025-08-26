
import { Heart, Target, Eye, Users, Calendar, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">

      <section className="pt-24 pb-16 bg-gradient-to-br from-muted to-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 festival-text-gradient animate-slide-in-right">About UMMATHEE</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right delay-150">
              A celebration of artistic excellence, cultural diversity, and creative expression that brings our college
              community together
            </p>
          </div>
        </div>
      </section>

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
                  <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 festival-text-gradient">Festival Journey</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-right">
              <h3 className="text-3xl font-bold mb-6 text-foreground">Our Story</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                UMMATHEE Arts Festival began as a small cultural gathering and has grown into one of the most
                anticipated events in our college calendar. Over the years, weve witnessed incredible talent, fostered
                lasting friendships, and created memories that last a lifetime.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                From traditional dance performances to contemporary art installations, from musical concerts to dramatic
                presentations, UMMATHEE celebrates every form of artistic expression with equal enthusiasm and respect.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Users, number: "2000+", label: "Alumni Participants" },
                  { icon: Calendar, number: "5", label: "Years Running" },
                  { icon: Award, number: "200+", label: "Awards Given" },
                  { icon: Heart, number: "∞", label: "Memories Created" },
                ].map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={index}
                      className="text-center animate-festival-bounce"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold text-primary">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="animate-slide-in-right delay-300">
              <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-2xl text-white">
                <h4 className="text-2xl font-bold mb-4">This Years Theme</h4>
                <p className="text-white/90 mb-6">
                   - Celebrating the beautiful tapestry of cultures, traditions, and artistic
                  expressions that make our college community unique and vibrant.
                </p>
                <div className="bg-white/20 p-4 rounded-lg">
                  <p className="text-sm text-white/80 italic">
                    Art is not what you see, but what you make others see - Edgar Degas
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

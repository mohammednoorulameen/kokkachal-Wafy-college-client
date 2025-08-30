import { useState, useEffect } from "react"
import {
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Trophy,
} from "lucide-react"

// The main App component that renders the Footer.
// All components and logic are contained within this single file.
export default function App() {
  const [isVisible, setIsVisible] = useState(false)

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const footerLinks = {
    festival: [
      { name: "About Festival", href: "/about" },
      { name: "Programs", href: "/programs" },
      { name: "Gallery", href: "/gallery" },
      { name: "Results", href: "/results" },
    ],
    participate: [
      { name: "Registration", href: "/contact" },
      { name: "Guidelines", href: "/contact" },
      { name: "Categories", href: "/programs" },
      { name: "Schedule", href: "/programs" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/contact" },
      { name: "Volunteer", href: "/contact" },
      { name: "Sponsors", href: "/about" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  return (
    <footer className="bg-[oklch(43.7%_0.078_188.216)] text-background relative overflow-hidden">
      <div className="absolute inset-0 festival-gradient opacity-10 animate-gradient-shift"></div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-bold text-white">KAF 14TH EDITION</h3>
              <p className="text-2xl font-semibold text-white">Arts Festival 2023-24</p>
              <p className="text-white leading-relaxed">
                Celebrating creativity, culture, and artistic excellence in our vibrant college community.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-white hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>kaf 14th edition@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 text-white hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+91 9961982167</span>
                </div>
                <div className="flex items-center space-x-2 text-white hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>UMERALI SHIHAB THANGAL ISLAMIC ACADEMY KOKKACHAL
</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Festival</h4>
              <ul className="space-y-2">
                {footerLinks.festival.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Participate</h4>
              <ul className="space-y-2">
                {footerLinks.participate.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            {/* Festival stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Users, number: "100+", label: "Participants" },
                { icon: Calendar, number: "130", label: "Events" },
                { icon: Trophy, number: "50+", label: "Winners" },
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className="text-center animate-festival-bounce"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 text-secondary" />
                    <div className="text-xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-white">{stat.label}</div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Social media links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:text-white hover:bg-primary transition-all duration-300 transform hover:scale-110 hover:rotate-12 animate-pulse-glow"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>

             
            </div>
          </div>
        </div>

        <div className="bg-white/10 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center text-white text-sm">
              <p>&copy; KAF 14TH EDITION Arts Festival. All rights reserved.</p>
              <p className="mt-2 sm:mt-0">Made with 💚 for our creative community</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary z-50 animate-pulse-glow"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 mx-auto animate-bounce" />
        </button>
      )}
    </footer>
  )
}


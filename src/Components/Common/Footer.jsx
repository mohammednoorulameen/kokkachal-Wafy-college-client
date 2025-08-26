
"use client"

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

export default function Footer() {
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
    <footer className="bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 festival-gradient opacity-10 animate-gradient-shift"></div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-bold festival-text-gradient">UMMATHEE</h3>
              <p className="text-2xl font-semibold text-secondary">Arts Festival 2023-24</p>
              <p className="text-background/80 leading-relaxed">
                Celebrating creativity, culture, and artistic excellence in our vibrant college community.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-background/80 hover:text-background transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>ummathee@college.edu</span>
                </div>
                <div className="flex items-center space-x-2 text-background/80 hover:text-background transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center space-x-2 text-background/80 hover:text-background transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>College Campus, Arts Department</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-background">Festival</h4>
              <ul className="space-y-2">
                {footerLinks.festival.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-background/80 hover:text-background transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-background">Participate</h4>
              <ul className="space-y-2">
                {footerLinks.participate.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-background/80 hover:text-background transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-background">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-background/80 hover:text-background transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-background/20">
            {/* Festival stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Users, number: "500+", label: "Participants" },
                { icon: Calendar, number: "15", label: "Events" },
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
                    <div className="text-xl font-bold text-background">{stat.number}</div>
                    <div className="text-sm text-background/80">{stat.label}</div>
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
                      className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center text-background/80 hover:text-background hover:bg-primary transition-all duration-300 transform hover:scale-110 hover:rotate-12 animate-pulse-glow"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="email"
                  placeholder="Get festival updates"
                  className="px-4 py-2 bg-background/10 border border-background/20 rounded-lg text-background placeholder-background/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background/10 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center text-background/80 text-sm">
              <p>&copy; 2024 UMMATHEE Arts Festival. All rights reserved.</p>
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

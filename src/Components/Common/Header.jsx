"use client"

import { useState, useEffect } from "react"
import { Menu, X, Home, Info, Calendar, ImageIcon, Trophy, Phone } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Programs", href: "/programs", icon: Calendar },
    { name: "Gallery", href: "/gallery", icon: ImageIcon },
    { name: "Results", href: "/results", icon: Trophy },
    { name: "Zone Results", href: "/zoneresult", icon: Trophy },
    { name: "Contact", href: "/contact", icon: Phone },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(43.7%_0.078_188.216)] text-white shadow-lg"
          : "bg-[oklch(43.7%_0.078_188.216)] text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h3 className="text-1xl font-bold">KOKKACHAL WAFY COLLEGE</h3>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:text-blue-300 transition-all duration-300 hover:bg-white/10"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    {item.name}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white-300 transition-all duration-300"
            >
              {isOpen ? <X className="block h-6 w-6 animate-rotate-in" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[oklch(43.7%_0.078_188.216)] text-white shadow-lg">
            {navItems.map((item, index) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:text-white-300 hover:bg-white/10 transition-all duration-300 animate-slide-in-right"
                  style={{ animationDelay: `${index * 0}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  {item.name}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}




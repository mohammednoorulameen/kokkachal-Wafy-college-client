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
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h3 className="text-1xl font-bold festival-text-gradient"> KOKKACHAL WAFY COLLEGE
</h3>
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
                    className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-all duration-300 hover:bg-muted"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300"
            >
              {isOpen ? <X className="block h-6 w-6 animate-rotate-in" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-md shadow-lg">
            {navItems.map((item, index) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-3 py-2 rounded-md text-base font-medium text-black hover:text-primary hover:bg-muted transition-all duration-300 animate-slide-in-right"
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




// import { useState,useEffect } from "react"
// // import { Button } from "@/components/ui/Button"
// import Button from "@mui/material/Button";
// import { Menu, X, Home, User, Settings, Mail } from "lucide-react"

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const navItems = [
//     { name: "Home", href: "#", icon: Home },
//     { name: "About", href: "#about", icon: User },
//     { name: "Services", href: "#services", icon: Settings },
//     { name: "Contact", href: "#contact", icon: Mail },
//   ]

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
//       }`}
//     >
//     {/* // <nav */}
//     {/* //   className='fixed top-0 left-0 right-0 z-50 transition-all duration-300' */}
//     {/* // > */}
        
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <a
//               href="#"
//               className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors duration-200"
//             >
//               Brand
//             </a>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-8">
//               {navItems.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="group relative px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200"
//                 >
//                   <span className="flex items-center gap-2">
//                     <item.icon className="w-4 h-4" />
//                     {item.name}
//                   </span>
//                   <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* CTA Button */}
//           <div className="hidden md:block">
//             <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105">
//               Get Started
//             </Button>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-foreground hover:text-primary transition-colors duration-200"
//             >
//               {isOpen ? (
//                 <X className="h-6 w-6 transition-transform duration-200 rotate-90" />
//               ) : (
//                 <Menu className="h-6 w-6 transition-transform duration-200" />
//               )}
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       <div
//         className={`md:hidden transition-all duration-300 ease-in-out ${
//           isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
//         } overflow-hidden bg-background/95 backdrop-blur-md border-b border-border`}
//       >
//         <div className="px-4 pt-2 pb-6 space-y-2">
//           {navItems.map((item, index) => (
//             <a
//               key={item.name}
//               href={item.href}
//               className={`group flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 transform ${
//                 isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
//               }`}
//               style={{
//                 transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
//               }}
//               onClick={() => setIsOpen(false)}
//             >
//               <item.icon className="w-5 h-5 text-primary" />
//               {item.name}
//             </a>
//           ))}
//           <div className="pt-4 px-4">
//             <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200">
//               Get Started
//             </Button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }
"use client"

import { Instagram, Facebook, Youtube, Mail, ArrowUp } from "lucide-react"

export default function ModernFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">UMMATHEE</h3>
            <p className="text-gray-300 mb-6">
              College Arts Festival 2023-24 celebrating the rich heritage and cultural diversity of our academic
              community.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                { icon: Facebook, href: "#", color: "hover:text-blue-400" },
                { icon: Youtube, href: "#", color: "hover:text-red-400" },
                { icon: Mail, href: "#", color: "hover:text-green-400" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-gray-400 transition-all duration-300 hover:scale-110 ${social.color}`}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Programs", "Gallery", "Results", "Contact"].map((link, index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>Phone: +91 9961982167</p>
              <p>Email: festcommittee2.0@gmail.com</p>
              <p>Kokkachal Wafy College</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 UMMATHEE Festival. All rights reserved.</p>
          <p className="text-gray-400 text-sm">Organized by Kokkachal Wafy College</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  )
}

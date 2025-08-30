"use client"

import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-[oklch(43.7%_0.078_188.216)] text-white">

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-slide-in-right">
            Get In Touch
          </h1>
          <p className="text-xl max-w-3xl mx-auto animate-slide-in-right delay-150">
            Have questions about KAF Arts Festival? We’d love to hear from you. Reach out anytime!
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div className="animate-slide-in-right space-y-12">
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Address", details: ["Mangalpady Badoor Road, Mangalpady, Kasaragod - 671324", "Arts Department", ""] },
                  { icon: Phone, title: "Phone", details: ["+91 9961982167", "91 8089256313"] },
                  { icon: Mail, title: "Email", details: ["kaf 14th edition@gmail.com", "uiakokkachal@gmail.com"] },
                  { icon: Clock, title: "Office Hours", details: ["Mon-Fri: 7:30 AM - 3:30 PM", "24*7"] },
                ].map((contact, index) => {
                  const Icon = contact.icon
                  return (
                    <div key={index} className="flex items-start animate-rotate-in" style={{ animationDelay: `${index * 150}ms` }}>
                      <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{contact.title}</h3>
                        {contact.details.map((detail, i) => (
                          <p key={i}>{detail}</p>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-bold mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  {["Facebook", "Instagram", "Twitter", "YouTube"].map((social, index) => (
                    <a
                      key={social}
                      href="#"
                      className="bg-white/10 hover:bg-white hover:text-[oklch(43.7%_0.078_188.216)] w-12 h-12 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {social.charAt(0)}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-in-right delay-300">
              <div className="bg-white/10 rounded-xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-white/20 bg-[oklch(43.7%_0.078_188.216)] text-white focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-white/20 bg-[oklch(43.7%_0.078_188.216)] text-white focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-[oklch(43.7%_0.078_188.216)] text-white focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-[oklch(43.7%_0.078_188.216)] text-white focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us more..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                question: "How can I participate in the festival?",
                answer:
                  "Registration is open to all college students. Visit our registration desk or contact us for more information.",
              },
              {
                question: "Are there any participation fees?",
                answer:
                  "Most events are free to participate. Some workshops may have a nominal fee.",
              },
              {
                question: "Can I participate in multiple categories?",
                answer:
                  "Yes! Students are encouraged to join multiple categories.",
              },
              {
                question: "When will the next festival be held?",
                answer:
                  "KAF Arts Festival is held annually. Follow our social media channels for updates.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-lg p-6 shadow-sm animate-slide-in-right"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start">
                  <MessageCircle className="w-6 h-6 text-white mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p>{faq.answer}</p>
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

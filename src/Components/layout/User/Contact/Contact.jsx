"use client"


import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import { useState } from "react"

export default function Contact() {
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
    <div className="min-h-screen bg-background">

      <section className="pt-24 pb-16 bg-gradient-to-br from-muted to-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 festival-text-gradient animate-slide-in-right">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right delay-150">
              Have questions about UMMATHEE Arts Festival? We d love to hear from you. Reach out to us anytime!
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="animate-slide-in-right">
              <h2 className="text-3xl font-bold mb-8 text-foreground">Contact Information</h2>

              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Address",
                    details: ["College Campus", "Arts Department", "Main Building, 2nd Floor"],
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    details: ["+91 9876543210", "+91 8765432109"],
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    details: ["ummathee@college.edu", "arts.festival@college.edu"],
                  },
                  {
                    icon: Clock,
                    title: "Office Hours",
                    details: ["Monday - Friday: 9:00 AM - 5:00 PM", "Saturday: 10:00 AM - 2:00 PM"],
                  },
                ].map((contact, index) => {
                  const Icon = contact.icon
                  return (
                    <div
                      key={index}
                      className="flex items-start animate-rotate-in"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{contact.title}</h3>
                        {contact.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6 text-foreground">Follow Us</h3>
                <div className="flex space-x-4">
                  {["Facebook", "Instagram", "Twitter", "YouTube"].map((social, index) => (
                    <a
                      key={social}
                      href="#"
                      className="bg-primary/10 hover:bg-primary hover:text-primary-foreground w-12 h-12 rounded-lg flex items-center justify-center text-primary transition-all duration-300 hover:scale-110 animate-festival-bounce"
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
              <div className="bg-card rounded-xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-card-foreground">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us more about your inquiry..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center justify-center animate-pulse-glow"
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

      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 festival-text-gradient">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                question: "How can I participate in the festival?",
                answer:
                  "Registration is open to all college students. Visit our registration desk or contact us for more information about upcoming events.",
              },
              {
                question: "Are there any participation fees?",
                answer:
                  "Most events are free to participate. Some specialized workshops may have a nominal fee to cover materials and resources.",
              },
              {
                question: "Can I participate in multiple categories?",
                answer:
                  "Yes! We encourage students to showcase their diverse talents by participating in multiple categories and events.",
              },
              {
                question: "When will the next festival be held?",
                answer:
                  "UMMATHEE Arts Festival is held annually. Follow our social media channels for updates on the next festival dates and registration.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 shadow-sm animate-slide-in-right"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start">
                  <MessageCircle className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
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

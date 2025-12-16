import React, { useState } from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaUtensils, FaArrowRight } from 'react-icons/fa'
import Header from '../components/Header'
// import Footer from '../components/Footer'
import api from '../services/api'

const Contact = () => {
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', address: '', dish: '', query: '' })
  const [status, setStatus] = useState({ loading: false, success: null, error: null })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: null, error: null })
    try {
      await api.contact.submit(form)
      setStatus({ loading: false, success: 'Message sent. Thank you!', error: null })
      setForm({ fullName: '', phone: '', email: '', address: '', dish: '', query: '' })
      setTimeout(() => setStatus({ loading: false, success: null, error: null }), 4000)
    } catch (err) {
      setStatus({ loading: false, success: null, error: 'Failed to send message. Try again.' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#7a2b0d] via-[#7a2b0d] to-[#071227] text-white">
      <Header />

      <div className="mt-6 max-w-screen-2xl mx-auto px-12 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-[#ffc22e] mb-12">Connect With Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Left contact cards */}
          <div className="space-y-8 md:pr-8">
            <div className="relative bg-[#6b2b12] rounded-xl p-6 shadow-2xl border border-[#5a230d]">
              <div className="absolute left-0 top-0 h-full w-2 bg-[#ffae42] rounded-l-xl"></div>
              <div className="ml-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-[#7a2b12] rounded-lg shadow-inner">
                    <FaMapMarkerAlt className="text-xl text-[#ffc76b]" />
                  </div>
                  <h3 className="text-lg font-semibold">Our Headquarter</h3>
                </div>
                <p className="text-[#e6b07a]">Lucknow, UP</p>
              </div>
            </div>

            <div className="relative bg-[#5b2610] rounded-xl p-6 shadow-2xl border border-[#4f200c]">
              <div className="absolute left-0 top-0 h-full w-2 bg-[#00c176] rounded-l-xl"></div>
              <div className="ml-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-[#6b3a25] rounded-lg shadow-inner">
                    <FaPhone className="text-xl text-[#7ef0b3]" />
                  </div>
                  <h3 className="text-lg font-semibold">Contact Number</h3>
                </div>
                <p className="text-[#b7f0d0]">+91 8299431275</p>
              </div>
            </div>

            <div className="relative bg-[#5d2911] rounded-xl p-6 shadow-2xl border border-[#4f200c]">
              <div className="absolute left-0 top-0 h-full w-2 bg-[#ff7a1a] rounded-l-xl"></div>
              <div className="ml-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-[#6b3a25] rounded-lg shadow-inner">
                    <FaEnvelope className="text-xl text-[#ffc76b]" />
                  </div>
                  <h3 className="text-lg font-semibold">Email Address</h3>
                </div>
                <p className="text-[#ffd9a8]">hexagonsservices@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="relative md:col-span-2">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ffc76b] opacity-18 rounded-full"></div>
            <div className="relative bg-gradient-to-r from-[#2b1a12]/70 to-[#071227]/60 p-8 md:p-10 rounded-3xl border border-[#6b3a25]/40 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#ffdca8] mb-2">Full Name</label>
                  <div className="relative">
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full bg-transparent border border-[#7a4a2a] rounded-xl px-4 py-3 placeholder-[#c99b6c] focus:outline-none focus:border-[#ff9a3c]"
                    />
                    <div className="absolute right-3 top-3 text-[#ffb86b]"><FaUtensils/></div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#ffdca8] mb-2">Phone Number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 12345 67890"
                    className="w-full bg-transparent border border-[#7a4a2a] rounded-lg px-4 py-3 placeholder-[#c99b6c] focus:outline-none focus:border-[#ff9a3c]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#ffdca8] mb-2">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-transparent border border-[#7a4a2a] rounded-lg px-4 py-3 placeholder-[#c99b6c] focus:outline-none focus:border-[#ff9a3c]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#ffdca8] mb-2">Address</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your delivery address"
                    className="w-full bg-transparent border border-[#7a4a2a] rounded-lg px-4 py-3 placeholder-[#c99b6c] focus:outline-none focus:border-[#ff9a3c]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#ffdca8] mb-2">Dish Name</label>
                  <input
                    name="dish"
                    value={form.dish}
                    onChange={handleChange}
                    placeholder="Enter dish name (e.g., Butter Chicken)"
                    className="w-full bg-transparent border border-[#7a4a2a] rounded-lg px-4 py-3 placeholder-[#c99b6c] focus:outline-none focus:border-[#ff9a3c]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#ffdca8] mb-2">Your Query</label>
                  <textarea
                    name="query"
                    value={form.query}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Type your message here..."
                    className="w-full bg-transparent border border-[#7a4a2a] rounded-lg px-4 py-3 placeholder-[#c99b6c] focus:outline-none focus:border-[#ff9a3c] resize-none"
                  />
                </div>

                {status.success && <div className="text-green-200 bg-green-900/20 p-3 rounded">{status.success}</div>}
                {status.error && <div className="text-red-200 bg-red-900/20 p-3 rounded">{status.error}</div>}

                <button type="submit" disabled={status.loading} className="w-full bg-gradient-to-r from-[#ff7a1a] to-[#ff4b00] py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-3">
                  <span>{status.loading ? 'Sending...' : 'Submit Query'}</span>
                  <FaArrowRight />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  )
}

export default Contact

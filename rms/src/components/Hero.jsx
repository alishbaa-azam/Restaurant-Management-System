// import React from 'react'


// export default function Hero(){
// return (
// <section className="relative bg-gradient-to-br from-[#b34700] to-[#7a2d00] text-white py-16 px-8">
// <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
// <div>
// <h1 className="text-4xl font-bold">We're Here <span className="block text-yellow-300">For Food & Delivery</span></h1>
// <p className="mt-4 text-gray-100/80">Best cooks and best delivery guys all at your service. Hot tasty food will reach you in 60 minutes.</p>
// <div className="mt-6 flex gap-3">
// <input placeholder="Discover your next favorite meal..." className="px-4 py-2 rounded-md text-black flex-1" />
// <button className="bg-yellow-400 px-4 py-2 rounded-md font-semibold">Search</button>
// </div>
// <div className="mt-4 flex gap-3">
// <button className="bg-[#fdba74] px-4 py-2 rounded-md">Download App</button>
// <button className="bg-[#ffd680] px-4 py-2 rounded-md">Watch Video</button>
// </div>
// </div>
// <div className="flex justify-center md:justify-end">
// <div className="w-64 h-64 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
// <img src="/hero_girl.jpg" alt="hero" className="w-full h-full object-cover" />
// </div>
// </div>
// </div>
// </section>
// )
// }
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaDownload, FaPlay } from 'react-icons/fa'

// Local images from src/assets
import BannerImage from '../assets/BannerImage.png'
import Image1 from '../assets/Image1.png'
import Image2 from '../assets/Image2.png'
import Image3 from '../assets/Image3.png'
import Image4 from '../assets/Image4.png'

const orbitImages = [Image1, Image2, Image3, Image4]


export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  return (
    <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-4xl lg:text-6xl font-bold leading-tight font-serif drop-shadow-md"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            We're Here <br />
            <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text">
              For Food & Delivery
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 text-white/80 text-lg"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            Best cooks and best delivery guys all at your service. Hot tasty food will reach you in 60 minutes.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            className="mt-6"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <div className="relative flex items-center bg-amber-900/30 rounded-xl border-2 border-amber-500/30 shadow-2xl hover:bg-amber-400/50 transition-all duration-300">
              <div className="pl-6 pr-3 py-4">
                <FaSearch className="text-xl text-amber-400/80" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Discover your next favorite meal..."
                className="w-full py-4 pr-6 bg-transparent outline-none placeholder:amber-200/70 text-lg font-medium tracking-wide"
              />
              <button
                type="submit"
                className="mr-4 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-300 rounded-lg font-semibold text-amber-900 hover:from-amber-300 hover:to-amber-200 transition-all duration-300 shadow-lg hover:shadow-amber-300/20"
              >
                Search
              </button>
            </div>
          </motion.form>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center md:justify-start mt-6"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <button className="group flex items-center gap-3 bg-amber-800/30 hover:bg-amber-800/50 px-6 py-3 rounded-xl transition-all duration-300 border-2 border-amber-700/50 hover:border-amber-400 backdrop-blur-sm">
              <FaDownload className="text-xl text-amber-400 group-hover:animate-bounce" />
              <span className="text-lg">Download App</span>
            </button>
            <button className="group flex items-center gap-3 bg-amber-800/30 hover:bg-amber-800/50 px-6 py-3 rounded-xl transition-all duration-300 border-2 border-amber-700/50 hover:border-amber-400 backdrop-blur-sm">
              <FaPlay className="text-xl text-amber-400 group-hover:animate-bounce" />
              <span className="text-lg">Watch Video</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Image + Orbiting Food */}
        <div className="relative flex items-center justify-center">
          {/* Main Image */}
          <div className="w-96 h-96 rounded-full bg-white/10 border-4 border-amber-400/30 shadow-xl overflow-hidden relative z-10">
            <img src={BannerImage} alt="Main" className="w-full h-full object-cover rounded-full" />
          </div>

          {/* Orbiting Images */}
          {/* {orbitImages.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Orbiting ${index + 1}`}
              className={`absolute w-[80px] xs:w-[100px] sm:w-[110px] md:w-[120px] rounded-full orbit-delay-${(index + 1) * 5}`}
            />
          ))} */}
          {orbitImages.map((imgSrc, index) => (
  <img
    key={index}
    src={imgSrc}
    alt={`Orbiting ${index + 1}`}
    className={`absolute w-[120px] xs:w-[140px] sm:w-[150px] md:w-[160px] rounded-full orbit-delay-${(index + 1) * 5} shadow-lg border-4 border-white/30`}
    style={{ zIndex: 5 }}
  />
))}

        </div>
      </div>
    </section>
  )
}

import React from "react";
import { FaBolt, FaClock, FaStar, FaCalendarCheck } from "react-icons/fa";
import AboutImage from "../assets/AboutImage.png";


export default function EpicureanElegance() {
  return (
    <>
      <section className="w-full bg-[#120a06] py-28 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT IMAGE CARD */}
          <div className="flex justify-center">
            <div className="bg-[#2a150b] p-6 rounded-[45px] shadow-[0_0_60px_rgba(255,153,0,0.22)] border border-amber-700/20">
              <img
                src={AboutImage}
                alt="Chef"
                className="rounded-[35px] w-[470px] object-cover"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="text-white">
            {/* Heading */}
            <h2 className="text-6xl font-serif text-amber-400 mb-4 tracking-wide">
              Epicurean Elegance
            </h2>

            <h3 className="text-2xl text-amber-200/90 font-light mb-8 tracking-wide">
              Where Flavors Dance & Memories Bloom
            </h3>

            {/* Quote Box */}
            <div className="bg-amber-700/30 p-6 rounded-xl border-l-4 border-amber-500/60 shadow-md">
              <p className="italic text-amber-200 text-lg leading-relaxed">
                "In our kitchen, passion meets precision. We craft not just meals,
                but culinary journeys that linger on the palate and in the heart."
              </p>
            </div>

            {/* FEATURES GRID */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-10 mt-14">
              {/* BOX 1 */}
              <div className="flex items-center gap-5">
                <div className="p-5 rounded-full bg-amber-600/20 text-amber-300 shadow-[0_0_20px_rgba(255,193,7,0.25)]">
                  <FaBolt size={28} />
                </div>
                <p className="text-amber-100 font-semibold text-lg leading-snug">
                  Instant Ordering<br />
                  <span className="text-amber-300/70 text-sm font-normal">
                    Seamless digital experience
                  </span>
                </p>
              </div>

              {/* BOX 2 */}
              <div className="flex items-center gap-5">
                <div className="p-5 rounded-full bg-rose-600/20 text-rose-300 shadow-[0_0_20px_rgba(255,0,122,0.25)]">
                  <FaClock size={28} />
                </div>
                <p className="text-amber-100 font-semibold text-lg leading-snug">
                  Always Open<br />
                  <span className="text-amber-300/70 text-sm font-normal">
                    24/7 premium service
                  </span>
                </p>
              </div>

              {/* BOX 3 */}
              <div className="flex items-center gap-5">
                <div className="p-5 rounded-full bg-teal-600/20 text-teal-300 shadow-[0_0_20px_rgba(0,200,150,0.25)]">
                  <FaCalendarCheck size={28} />
                </div>
                <p className="text-amber-100 font-semibold text-lg leading-snug">
                  Exclusive Booking<br />
                  <span className="text-amber-300/70 text-sm font-normal">
                    Priority reservations
                  </span>
                </p>
              </div>

              {/* BOX 4 */}
              <div className="flex items-center gap-5">
                <div className="p-5 rounded-full bg-purple-600/20 text-purple-300 shadow-[0_0_20px_rgba(150,70,255,0.25)]">
                  <FaStar size={28} />
                </div>
                <p className="text-amber-100 font-semibold text-lg leading-snug">
                  Signature Dishes<br />
                  <span className="text-amber-300/70 text-sm font-normal">
                    Chef's special creations
                  </span>
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <button className="mt-14 px-12 py-4 bg-linear-to-r from-amber-400 to-amber-300 text-amber-900 font-semibold rounded-xl text-lg shadow-[0_0_30px_rgba(255,200,0,0.25)] hover:scale-105 transition-all duration-300">
              Unveil Our Legacy
            </button>
          </div>
        </div>
      </section>

    </>
  );
}

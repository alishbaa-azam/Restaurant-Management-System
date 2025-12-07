import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#231612] text-gray-300 py-24 px-8">
<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">

        {/* LEFT SECTION */}
        <div>
          <h2 className="text-5xl font-bold text-[#ffb74a] font-serif">
            Foodies
          </h2>

          <p className="mt-4 text-base text-gray-300 leading-relaxed">
            When culinary artistry meets doorstep convenience.<br />
            Savor handcrafted perfection, delivered with care.
          </p>

          {/* Email Offers */}
          <div className="mt-8">
            <p className="flex items-center gap-2 text-[#ffb74a] font-semibold">
              <span className="text-lg">📧</span> Get Exclusive Offers
            </p>

            <div className="mt-4 border border-[#c68f3d] rounded-lg p-1 flex items-center bg-transparent">
              <input
                type="email"
                placeholder="Enter your email..."
                className="w-full bg-transparent px-4 py-2 text-gray-300 outline-none placeholder-gray-400"
              />
              <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#ff8f1f] to-[#ff5200] text-white font-semibold shadow-[0_0_10px_rgba(255,150,50,0.5)] hover:opacity-90">
                Join Now →
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="text-left">
          <h3 className="text-xl font-semibold text-[#ffb74a] border-l-4 pl-3 border-[#ffb74a]">
            Navigation
          </h3>

          <ul className="mt-6 space-y-3 text-gray-300 text-lg">
            <li className="hover:text-[#ffb74a] transition cursor-pointer">› Home</li>
            <li className="hover:text-[#ffb74a] transition cursor-pointer">› Menu</li>
            <li className="hover:text-[#ffb74a] transition cursor-pointer">› About Us</li>
            <li className="hover:text-[#ffb74a] transition cursor-pointer">› Contact</li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div>
          <h3 className="text-xl font-semibold text-[#ffb74a] border-l-4 pl-3 border-[#ffb74a]">
            Social Connect
          </h3>

          <div className="mt-6 flex gap-5">
            {/* Each icon circle */}
            <div className="bg-[#4c3b2d] p-4 rounded-full hover:scale-105 transition cursor-pointer">
              <FaFacebookF className="text-[#3b5998] text-xl" />
            </div>
            <div className="bg-[#4c3b2d] p-4 rounded-full hover:scale-105 transition cursor-pointer">
              <FaInstagram className="text-pink-500 text-xl" />
            </div>
            <div className="bg-[#4c3b2d] p-4 rounded-full hover:scale-105 transition cursor-pointer">
              <FaXTwitter className="text-white text-xl" />
            </div>
            <div className="bg-[#4c3b2d] p-4 rounded-full hover:scale-105 transition cursor-pointer">
              <FaYoutube className="text-red-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="mt-16 pt-6 border-t border-[#a56a32] text-center">
        <p className="text-[#ffb74a] text-sm">
          © 2025 Foodies. All rights reserved.
        </p>
        <p className="text-[#ffb74a] text-sm mt-2">
          Designed by Maryam
        </p>
      </div>
    </footer>
  );
}

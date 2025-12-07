import React from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHome,
  FaBookOpen,
  FaStar,
  FaPhone,
  FaKey,
} from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import { motion } from "framer-motion";

export default function Header({ cartCount = 0 }) {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-[#2a1a12] text-white px-12 py-6 flex items-center justify-between shadow-xl border-b border-[#5a2d0c]"
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-3xl font-semibold text-yellow-400 tracking-wide"
      >
        <GiChefToque className="text-4xl text-yellow-400" />
        Foodies
      </Link>

      {/* Navigation + Cart + Login (Right Side Compact) */}
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-5 mr-4">
          <Link
            to="/"
            className="flex items-center gap-2 border border-[#7a441a] px-5 py-2.5 rounded-3xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300 shadow-md"
          >
            <FaHome /> Home
          </Link>

          <Link
            to="/menu"
            className="flex items-center gap-2 border border-[#7a441a] px-5 py-2.5 rounded-3xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300 shadow-md"
          >
            <FaBookOpen /> Menu
          </Link>

          <Link
            to="/about"
            className="flex items-center gap-2 border border-[#7a441a] px-5 py-2.5 rounded-3xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300 shadow-md"
          >
            <FaStar /> About
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-2 border border-[#7a441a] px-5 py-2.5 rounded-3xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300 shadow-md"
          >
            <FaPhone /> Contact
          </Link>
        </nav>

        {/* Cart - Reduced Space */}
        <Link
          to="/cart"
          className="flex items-center gap-1 border border-[#7a441a] px-4 py-2.5 rounded-3xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300 shadow-md"
        >
          <FaShoppingCart className="text-lg" />
          <span className="text-sm">{cartCount}</span>
        </Link>

        {/* Login Button - Reduced Space */}
        <button className="flex items-center gap-1 bg-gradient-to-b from-[#f9a825] to-[#f57c00] px-5 py-2.5 rounded-2xl text-black font-semibold shadow-lg hover:scale-105 transition-all duration-200">
          <FaKey className="text-base" />
          <span className="text-sm">Login</span>
        </button>
      </div>
    </motion.header>
  );
}

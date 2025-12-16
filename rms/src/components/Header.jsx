import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

import {
  FaShoppingCart,
  FaHome,
  FaBookOpen,
  FaStar,
  FaPhone,
  FaKey,
  FaCalendarAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import { motion } from "framer-motion";

// export default function Header({ cartCount = 0 }) {
export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
const { cartCount } = useCart();

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-[#2a1a12] text-white px-4 md:px-8 lg:px-12 py-4 md:py-6 flex items-center justify-between shadow-xl border-b border-[#5a2d0c]"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-semibold text-yellow-400 tracking-wide"
        >
          <GiChefToque className="text-2xl sm:text-3xl md:text-4xl text-yellow-400" />
          <span className="hidden sm:inline">Foodies</span>
          <span className="sm:hidden">Foodies</span>
        </Link>

        {/* Desktop Navigation + Cart + Login */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <nav className="flex items-center gap-1 lg:gap-3 xl:gap-4 mr-2 lg:mr-4">
            <Link
              to="/"
              className="flex items-center gap-1 lg:gap-2 border border-[#7a441a] px-3 py-2 lg:px-4 lg:py-2.5 rounded-3xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300 shadow-md text-xs lg:text-sm xl:text-base"
            >
              <FaHome className="text-sm lg:text-base" />
              <span className="hidden lg:inline">Home</span>
            </Link>

            <Link
              to="/menu"
              className="flex items-center gap-1 lg:gap-2 border border-[#7a441a] px-3 py-2 lg:px-4 lg:py-2.5 rounded-3xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300 shadow-md text-xs lg:text-sm xl:text-base"
            >
              <FaBookOpen className="text-sm lg:text-base" />
              <span className="hidden lg:inline">Menu</span>
            </Link>

            <Link
              to="/booking"
              className="flex items-center gap-1 lg:gap-2 border border-[#7a441a] px-3 py-2 lg:px-4 lg:py-2.5 rounded-3xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300 shadow-md text-xs lg:text-sm xl:text-base"
            >
              <FaCalendarAlt className="text-sm lg:text-base" />
              <span className="hidden lg:inline">Book Table</span>
            </Link>

            <Link
              to="/about"
              className="flex items-center gap-1 lg:gap-2 border border-[#7a441a] px-3 py-2 lg:px-4 lg:py-2.5 rounded-3xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300 shadow-md text-xs lg:text-sm xl:text-base"
            >
              <FaStar className="text-sm lg:text-base" />
              <span className="hidden lg:inline">About</span>
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-1 lg:gap-2 border border-[#7a441a] px-3 py-2 lg:px-4 lg:py-2.5 rounded-3xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300 shadow-md text-xs lg:text-sm xl:text-base"
            >
              <FaPhone className="text-sm lg:text-base" />
              <span className="hidden lg:inline">Contact</span>
            </Link>
          </nav>

          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center gap-1 border border-[#7a441a] px-3 py-2 lg:px-4 lg:py-2 rounded-3xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300 shadow-md relative"
          >
            <FaShoppingCart className="text-base lg:text-lg" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login Button */}
          <Link to="/admin/login" className="flex items-center gap-1 bg-linear-to-b from-[#f9a825] to-[#f57c00] px-3 py-2 lg:px-4 lg:py-2.5 rounded-2xl text-black font-semibold shadow-lg hover:scale-105 transition-all duration-200 text-xs lg:text-sm xl:text-base whitespace-nowrap">
            <FaKey className="text-sm lg:text-base" />
            <span className="hidden lg:inline">Login</span>
          </Link>
        </div>

        {/* Mobile menu button and cart/login */}
        <div className="flex md:hidden items-center gap-3">
          {/* Book Table - Mobile Version (Simplified) */}
          <Link
            to="/booking"
            className="flex items-center gap-1 border border-[#7a441a] px-3 py-2 rounded-3xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300 shadow-md relative"
          >
            <FaCalendarAlt className="text-base" />
            <span className="text-sm">Book</span>
          </Link>

          {/* Cart for mobile */}
          <Link
            to="/cart"
            className="flex items-center gap-1 border border-[#7a441a] px-3 py-2 rounded-3xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300 shadow-md relative"
          >
            <FaShoppingCart className="text-lg" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#7a441a] text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-16 md:top-20 left-0 w-full z-40 bg-[#2a1a12] border-b border-[#5a2d0c] shadow-2xl md:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col p-4 space-y-3">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 border border-[#7a441a] px-5 py-3 rounded-2xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300"
          >
            <FaHome className="text-lg" />
            <span className="text-lg">Home</span>
          </Link>

          <Link
            to="/menu"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 border border-[#7a441a] px-5 py-3 rounded-2xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300"
          >
            <FaBookOpen className="text-lg" />
            <span className="text-lg">Menu</span>
          </Link>

          <Link
            to="/booking"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 border border-[#7a441a] px-5 py-3 rounded-2xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300"
          >
            <FaCalendarAlt className="text-lg" />
            <span className="text-lg font-semibold">Book Your Table</span>
          </Link>

          <Link
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 border border-[#7a441a] px-5 py-3 rounded-2xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300"
          >
            <FaStar className="text-lg" />
            <span className="text-lg">About</span>
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 border border-[#7a441a] px-5 py-3 rounded-2xl text-yellow-300 hover:bg-[#7a441a]/40 transition duration-300"
          >
            <FaPhone className="text-lg" />
            <span className="text-lg">Contact</span>
          </Link>

          {/* Mobile Login Button */}
          <Link
            to="/admin/login"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center gap-2 bg-linear-to-b from-[#f9a825] to-[#f57c00] px-5 py-3 rounded-2xl text-black font-semibold shadow-lg hover:scale-105 transition-all duration-200 mt-4"
          >
            <FaKey className="text-lg" />
            <span className="text-lg">Login</span>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
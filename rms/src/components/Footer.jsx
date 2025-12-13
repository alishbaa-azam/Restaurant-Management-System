import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#2a1a12] text-gray-200 py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand & Description */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-[#fbbf24] tracking-wide font-serif">
            Foodies
          </h1>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            Experience the fusion of gourmet flavors with unmatched doorstep convenience.
            Handcrafted meals delivered fresh to your home.
          </p>

          <form className="flex max-w-md " onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address for newsletter"
              required
              className="flex-grow px-4 py-2 rounded-l-md bg-transparent border border-[#fbbf24] placeholder-gray-300 text-gray-200 focus:outline-none focus:ring-1 focus:ring-yellow-300"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] px-5 py-2 rounded-r-md font-semibold tracking-wide hover:brightness-110 transition  "
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Footer navigation" className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-[#fbbf24] border-l-4 border-yellow-300 pl-4">
            Explore
          </h2>
          <ul className="space-y-3 text-gray-300 text-lg">
            {["Home", "Menu", "About Us", "Contact"].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-yellow-300 transition"
                tabIndex={0}
                role="link"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    // Add navigation logic here if needed
                  }
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Media & Contact */}
        <div>
          <h2 className="text-2xl font-semibold text-[#fbbf24] border-l-4 border-yellow-300 pl-4">
            Connect With Us
          </h2>
          <p className="mt-4 text-gray-300 mb-6">
            Follow us on social media for the latest updates and offers.
          </p>
          <div className="flex space-x-3">
            {[
              {
                icon: <FaFacebookF className="text-[#1877F2]" />,
                label: "Facebook",
                href: "https://facebook.com",
              },
              {
                icon: <FaInstagram className="text-pink-500" />,
                label: "Instagram",
                href: "https://instagram.com",
              },
              {
                icon: <FaXTwitter className="text-white" />,
                label: "Twitter",
                href: "https://twitter.com",
              },
              {
                icon: <FaYoutube className="text-red-600" />,
                label: "YouTube",
                href: "https://youtube.com",
              },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="bg-[#3a2a18] p-4 rounded-full flex items-center justify-center hover:bg-yellow-300 hover:text-[#2b1f13] transition"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 pt-8 border-t border-yellow-500 text-center text-sm text-yellow-300 select-none">
        <p>© 2025 Foodies. All rights reserved.</p>
        <p className="mt-1">Designed by Team MAD</p>
      </div>
    </footer>
  );
}

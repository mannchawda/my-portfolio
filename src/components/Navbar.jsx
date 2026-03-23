"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Projects", "About", "Contact"];

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <a href="/" className="flex items-center gap-0.5">
        <span className="text-white font-bold text-xl tracking-tight">MNC</span>
        <span className="text-cyan-400 font-bold text-xl">.</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link.toLowerCase())}
            className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
          >
            {link}
          </button>
        ))}
        <button
          onClick={() => scrollTo("contact")}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-500 rounded-full text-sm font-medium transition-colors duration-200"
        >
          Hire Me
        </button>
      </div>

      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 flex flex-col p-6 gap-4 md:hidden">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="text-gray-400 hover:text-white text-sm transition-colors text-left"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-500 rounded-full text-sm font-medium text-center transition-colors duration-200"
          >
            Hire Me
          </button>
        </div>
      )}
    </motion.nav>
  );
}

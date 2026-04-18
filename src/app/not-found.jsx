"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NotFound() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-6">

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        {/* 404 number */}
        <div className="text-[160px] md:text-[220px] font-bold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400/20 to-cyan-400/20 select-none mb-0">
          404
        </div>

        <div className="-mt-8 md:-mt-12 mb-6">
          <p className="text-purple-400 text-sm font-mono tracking-[0.3em] uppercase mb-3">Page Not Found</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Lost in the void
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            This page doesn't exist — maybe it was deleted, moved, or never created. Let's get you back.
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap mt-8">
          <a
            href="/"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-full text-sm font-medium transition-colors duration-200"
          >
            Back to Home
          </a>
          <a
            href="/#projects"
            className="px-8 py-3 border border-white/20 hover:border-white/50 rounded-full text-sm font-medium transition-colors duration-200"
          >
            View Projects
          </a>
        </div>

        {/* Branding */}
        <div className="mt-16">
          <a href="/" className="flex items-center gap-0.5 justify-center">
            <span className="text-white font-bold text-2xl tracking-tight">MNC</span>
            <span className="text-cyan-400 font-bold text-2xl">.</span>
          </a>
          <p className="text-gray-600 text-xs mt-2">Mann Chawda — 3D Artist & Game Dev Student</p>
        </div>
      </motion.div>

    </main>
  );
}

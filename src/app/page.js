"use client";
import { useEffect, useState } from "react";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import AdminPanel from "@/components/AdminPanel";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px]" />

        <div className={`relative z-10 text-center transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-purple-400 text-sm font-mono tracking-[0.3em] uppercase mb-6">
            Blender Artist & Game Dev Student
          </p>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none tracking-tight">
            Mann Chawda
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-4xl md:text-5xl mt-2">
              MNC.
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            BTech CSE student from Surat, India — building game props, product renders,
            architectural environments and isometric scenes in Blender. Open for freelance work.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#projects" className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-full text-sm font-medium transition-colors duration-200">
              View My Work
            </a>
            <a href="mailto:mann.chawda.work@gmail.com" className="px-8 py-3 border border-white/20 hover:border-white/50 rounded-full text-sm font-medium transition-colors duration-200">
              Get in Touch
            </a>
          </div>
        </div>

        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent animate-pulse" />
        </div>
      </section>

      <ProjectsSection />
      <AboutSection />
      <ContactSection />

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-gray-600 text-sm">
          Mann N. Chawda — MNC. &nbsp;|&nbsp; Surat, Gujarat, India &nbsp;|&nbsp;
          <a href="mailto:mann.chawda.work@gmail.com" className="hover:text-gray-400 transition-colors">
            mann.chawda.work@gmail.com
          </a>
        </p>
      </footer>

      {/* Admin Panel */}
      <AdminPanel />

    </main>
  );
}

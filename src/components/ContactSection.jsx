"use client";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-purple-400 text-sm font-mono tracking-[0.3em] uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let us work together
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed mb-12">
            Have a project in mind? Whether it is a game prop, product render, environment, or
            something entirely new — I would love to hear about it. Open to freelance work and
            creative collaborations.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="mailto:mann.chawda.work@gmail.com"
              className="px-10 py-4 bg-purple-600 hover:bg-purple-500 rounded-full text-base font-medium transition-all duration-200 hover:scale-105"
            >
              Email Me
            </a>
            <a
              href="https://www.behance.net/mannchawda"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 border border-white/20 hover:border-white/50 rounded-full text-base font-medium transition-all duration-200 hover:scale-105"
            >
              View on Behance
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-4 justify-center mb-16">
            <a
              href="https://www.instagram.com/mann.chawda_5501"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-white/10 hover:border-white/30 rounded-full text-sm text-gray-400 hover:text-white transition-all duration-200"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/mann-chawda"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-white/10 hover:border-white/30 rounded-full text-sm text-gray-400 hover:text-white transition-all duration-200"
            >
              LinkedIn
            </a>
          </div>

          {/* Info row */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
            <div>
              <div className="text-white font-medium mb-1">Based in</div>
              <div className="text-gray-400 text-sm">Surat, Gujarat, India</div>
            </div>
            <div>
              <div className="text-white font-medium mb-1">Available for</div>
              <div className="text-gray-400 text-sm">Freelance Work</div>
            </div>
            <div>
              <div className="text-white font-medium mb-1">Response time</div>
              <div className="text-gray-400 text-sm">Within 24 hours</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";

const stats = [
  { number: "1-2", label: "Years in Blender" },
  { number: "4+", label: "Work Categories" },
  { number: "CSE", label: "BTech Student" },
  { number: "Open", label: "For Freelance" },
];

const skills = [
  "Blender", "3D Modelling", "UV Editing", "Texturing",
  "Game Props", "Isometric Scenes", "Product Renders", "Environments",
  "Unreal Engine", "C++", "C", "Game Development",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-purple-400 text-sm font-mono tracking-[0.3em] uppercase mb-4">About Me</p>
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Turning ideas into 3D realities
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-4">
            Hi, I am Mann Chawda — a BTech Computer Science and Engineering student from Surat, Gujarat,
            with a deep passion for 3D art and game development. Over the past 1-2 years I have been
            self-teaching Blender, working on game props, product visualizations, architectural
            environments, and isometric models.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            My background in C++ and C gives me a technical edge when working with game engines. I am
            growing my skills in Unreal Engine and working toward becoming a well-rounded game developer
            and 3D generalist. Every model I build is a step toward mastery — I am actively looking
            for freelance opportunities and creative collaborations.
          </p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 border border-white/10 rounded-full text-sm text-gray-300 hover:border-purple-500/50 hover:text-purple-300 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900 border border-white/10 rounded-2xl p-8 text-center hover:border-purple-500/30 transition-colors duration-300"
            >
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

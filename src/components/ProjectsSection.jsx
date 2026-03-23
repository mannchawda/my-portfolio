"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const fallbackProjects = [
  {
    id: 1,
    title: "No Projects Yet",
    category: "Add via Admin Panel",
    year: "2024",
    description: "Click the settings button in the bottom right corner to add your first project.",
    color: "from-purple-900 to-violet-800",
    image_url: null,
    placeholder: true,
  },
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => { fetchProjects(); }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });
    setProjects(error || !data?.length ? fallbackProjects : data);
    setLoading(false);
  }

  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-purple-400 text-sm font-mono tracking-[0.3em] uppercase mb-4">Selected Work</p>
        <h2 className="text-5xl md:text-6xl font-bold text-white">Projects</h2>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-white/10 animate-pulse">
              <div className="h-56 bg-white/5" />
              <div className="p-6 bg-zinc-900/80">
                <div className="h-3 bg-white/10 rounded mb-3 w-1/3" />
                <div className="h-5 bg-white/10 rounded mb-2 w-2/3" />
                <div className="h-3 bg-white/10 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => !project.placeholder && setSelectedProject(project)}
              className={`group relative rounded-2xl overflow-hidden border border-white/10 ${!project.placeholder ? "cursor-pointer" : ""}`}
            >
              <div className="relative h-56 w-full overflow-hidden">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${project.color || "from-purple-900 to-violet-800"} flex items-center justify-center`}>
                    <div className="text-center px-6">
                      <div className="text-5xl mb-3 text-white/20">+</div>
                      <p className="text-white/40 text-sm">Add projects via admin panel</p>
                    </div>
                  </div>
                )}
                {!project.placeholder && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                      View Project
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 bg-zinc-900/80 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-400 text-xs font-mono tracking-wider uppercase">{project.category}</span>
                  <span className="text-gray-500 text-xs">{project.year}</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-purple-300 transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              {selectedProject.image_url && (
                <div className="w-full h-72 md:h-96 overflow-hidden">
                  <img src={selectedProject.image_url} alt={selectedProject.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-purple-400 text-xs font-mono tracking-wider uppercase">{selectedProject.category}</span>
                      <span className="text-gray-500 text-xs">{selectedProject.year}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 flex-shrink-0 ml-4 text-lg"
                  >
                    x
                  </button>
                </div>
                <p className="text-gray-300 text-base leading-relaxed mb-8">{selectedProject.description}</p>
                <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                  <span className="text-gray-500 text-sm">Tools used:</span>
                  <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs">Blender 3D</span>
                  <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs">Cycles / EEVEE</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

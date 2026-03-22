"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const initialProjects = [
  {
    id: 1,
    title: "Add Your First Project",
    category: "Game Props",
    year: "2024",
    description: "Click the + button below to add your real projects with images and descriptions.",
    color: "from-purple-900 to-violet-800",
    placeholder: true,
  },
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "Game Props",
    year: new Date().getFullYear().toString(),
    description: "",
    color: "from-purple-900 to-violet-800",
  });

  const categories = [
    "Game Props",
    "Product Render",
    "Isometric Scene",
    "Architectural",
    "3D Model",
    "Other",
  ];

  const colors = [
    { label: "Purple", value: "from-purple-900 to-violet-800" },
    { label: "Blue", value: "from-blue-900 to-sky-800" },
    { label: "Green", value: "from-green-900 to-emerald-800" },
    { label: "Amber", value: "from-amber-900 to-orange-800" },
    { label: "Rose", value: "from-rose-900 to-pink-800" },
    { label: "Slate", value: "from-slate-800 to-zinc-700" },
  ];

  const handleAdd = () => {
    if (!form.title.trim()) return;
    const newProject = {
      ...form,
      id: Date.now(),
      placeholder: false,
    };
    setProjects((prev) => prev.filter((p) => !p.placeholder).concat(newProject));
    setForm({ title: "", category: "Game Props", year: new Date().getFullYear().toString(), description: "", color: "from-purple-900 to-violet-800" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      return updated.length === 0 ? initialProjects : updated;
    });
  };

  return (
    <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="flex items-end justify-between mb-16 flex-wrap gap-4"
      >
        <div>
          <p className="text-purple-400 text-sm font-mono tracking-[0.3em] uppercase mb-4">Selected Work</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white">Projects</h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-full text-sm text-gray-300 hover:text-white transition-all duration-200"
        >
          <span className="text-lg leading-none">+</span>
          Add Project
        </button>
      </motion.div>

      {/* Add Project Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-purple-500/30 rounded-2xl p-8 mb-10"
        >
          <h3 className="text-white font-bold text-xl mb-6">Add New Project</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Project Title *</label>
              <input
                type="text"
                placeholder="e.g. Wooden Crate Prop"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50"
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Year</label>
              <input
                type="text"
                placeholder="2024"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Card Color</label>
              <select
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50"
              >
                {colors.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-400 text-sm mb-2 block">Description</label>
            <textarea
              placeholder="Briefly describe this project — what it is, tools used, what you learned..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Add Project
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-8 py-3 border border-white/10 hover:border-white/30 rounded-full text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
          >
            <div className={`bg-gradient-to-br ${project.color} h-56 w-full flex items-center justify-center relative`}>
              {project.placeholder ? (
                <div className="text-center px-6">
                  <div className="text-5xl mb-3 text-white/20">+</div>
                  <p className="text-white/40 text-sm">Your render image will appear here</p>
                </div>
              ) : (
                <span className="text-white/20 text-8xl font-bold">
                  {project.title.charAt(0)}
                </span>
              )}
              {!project.placeholder && (
                <button
                  onClick={() => handleDelete(project.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-red-600/80 rounded-full text-white/50 hover:text-white text-xs transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  x
                </button>
              )}
            </div>
            <div className="p-6 bg-zinc-900/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400 text-xs font-mono tracking-wider uppercase">{project.category}</span>
                <span className="text-gray-500 text-xs">{project.year}</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-2 group-hover:text-purple-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

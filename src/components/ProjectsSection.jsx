"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

const fallbackProjects = [
  {
    id: 1,
    title: "Add Your First Project",
    category: "Game Props",
    year: "2024",
    description: "Click the + button to add your real projects with images.",
    color: "from-purple-900 to-violet-800",
    image_url: null,
    placeholder: true,
  },
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "Game Props",
    year: new Date().getFullYear().toString(),
    description: "",
    color: "from-purple-900 to-violet-800",
  });

  const categories = [
    "Game Props", "Product Render", "Isometric Scene",
    "Architectural", "3D Model", "Character", "Abstract / Motion", "Other",
  ];

  const colors = [
    { label: "Purple", value: "from-purple-900 to-violet-800" },
    { label: "Blue", value: "from-blue-900 to-sky-800" },
    { label: "Green", value: "from-green-900 to-emerald-800" },
    { label: "Amber", value: "from-amber-900 to-orange-800" },
    { label: "Rose", value: "from-rose-900 to-pink-800" },
    { label: "Slate", value: "from-slate-800 to-zinc-700" },
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });
    if (error) {
      setProjects(fallbackProjects);
    } else {
      setProjects(data && data.length > 0 ? data : fallbackProjects);
    }
    setLoading(false);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleAdd() {
    if (!form.title.trim()) return;
    setUploading(true);
    let image_url = null;
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(fileName, imageFile);
      if (!uploadError) {
        image_url = `${SUPABASE_URL}/storage/v1/object/public/project-images/${fileName}`;
      }
    }
    const { error } = await supabase.from("projects").insert([{
      title: form.title,
      category: form.category,
      year: form.year,
      description: form.description,
      color: form.color,
      image_url,
      order_index: projects.filter((p) => !p.placeholder).length + 1,
    }]);
    if (!error) {
      setForm({ title: "", category: "Game Props", year: new Date().getFullYear().toString(), description: "", color: "from-purple-900 to-violet-800" });
      setImageFile(null);
      setImagePreview(null);
      setShowForm(false);
      fetchProjects();
    }
    setUploading(false);
  }

  async function handleDelete(e, id) {
    e.stopPropagation();
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  }

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
          <div className="mb-6">
            <label className="text-gray-400 text-sm mb-2 block">Render Image</label>
            <div className="flex items-start gap-4">
              {imagePreview ? (
                <img src={imagePreview} alt="preview" className="w-32 h-24 object-cover rounded-xl border border-white/10" />
              ) : (
                <div className="w-32 h-24 bg-white/5 border border-dashed border-white/20 rounded-xl flex items-center justify-center text-gray-500 text-xs">No image</div>
              )}
              <label className="cursor-pointer px-6 py-3 border border-white/10 hover:border-purple-500/50 rounded-xl text-sm text-gray-300 hover:text-white transition-all duration-200">
                Choose Image
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Project Title *</label>
              <input type="text" placeholder="e.g. Wooden Crate Prop" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50" />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Year</label>
              <input type="text" placeholder="2024" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50" />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Card Color (fallback)</label>
              <select value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50">
                {colors.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label className="text-gray-400 text-sm mb-2 block">Description</label>
            <textarea placeholder="Briefly describe this project..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 resize-none" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleAdd} disabled={uploading} className="px-8 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-full text-sm font-medium transition-colors duration-200">
              {uploading ? "Uploading..." : "Add Project"}
            </button>
            <button onClick={() => { setShowForm(false); setImagePreview(null); setImageFile(null); }} className="px-8 py-3 border border-white/10 hover:border-white/30 rounded-full text-sm text-gray-400 hover:text-white transition-colors duration-200">
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Projects Grid */}
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
                    {project.placeholder ? (
                      <div className="text-center px-6">
                        <div className="text-5xl mb-3 text-white/20">+</div>
                        <p className="text-white/40 text-sm">Your render image will appear here</p>
                      </div>
                    ) : (
                      <span className="text-white/20 text-8xl font-bold">{project.title.charAt(0)}</span>
                    )}
                  </div>
                )}
                {!project.placeholder && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium bg-black/50 px-4 py-2 rounded-full">View Project</span>
                  </div>
                )}
                {!project.placeholder && (
                  <button
                    onClick={(e) => handleDelete(e, project.id)}
                    className="absolute top-3 right-3 w-7 h-7 bg-black/60 hover:bg-red-600/80 rounded-full text-white/50 hover:text-white text-xs transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
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
                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-purple-300 transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Project Detail Popup */}
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
              {/* Image */}
              {selectedProject.image_url && (
                <div className="w-full h-72 md:h-96 overflow-hidden">
                  <img src={selectedProject.image_url} alt={selectedProject.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Content */}
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
                    className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 flex-shrink-0 ml-4"
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

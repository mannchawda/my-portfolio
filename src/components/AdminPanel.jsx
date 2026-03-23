"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export default function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [skillsInput, setSkillsInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    title: "", category: "Game Props",
    year: new Date().getFullYear().toString(),
    description: "", color: "from-purple-900 to-violet-800",
  });

  const categories = ["Game Props","Product Render","Isometric Scene","Architectural","3D Model","Character","Abstract / Motion","Other"];
  const colors = [
    { label: "Purple", value: "from-purple-900 to-violet-800" },
    { label: "Blue", value: "from-blue-900 to-sky-800" },
    { label: "Green", value: "from-green-900 to-emerald-800" },
    { label: "Amber", value: "from-amber-900 to-orange-800" },
    { label: "Rose", value: "from-rose-900 to-pink-800" },
    { label: "Slate", value: "from-slate-800 to-zinc-700" },
  ];

  useEffect(() => {
    if (open) { fetchProfile(); fetchProjects(); }
  }, [open]);

  async function fetchProfile() {
    const { data } = await supabase.from("profile").select("*").eq("id", 1).single();
    if (data) { setProfile(data); setSkillsInput((data.skills || []).join(", ")); }
  }

  async function fetchProjects() {
    const { data } = await supabase.from("projects").select("*").order("order_index", { ascending: true });
    if (data) setProjects(data);
  }

  async function saveProfile() {
    setSaving(true);
    let photo_url = profile.photo_url;
    if (photoFile) {
      const fileExt = photoFile.name.split(".").pop();
      const fileName = `profile-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from("project-images").upload(fileName, photoFile);
      if (!uploadError) photo_url = `${SUPABASE_URL}/storage/v1/object/public/project-images/${fileName}`;
    }
    const skillsArray = skillsInput.split(",").map((s) => s.trim()).filter(Boolean);
    await supabase.from("profile").update({ ...profile, photo_url, skills: skillsArray }).eq("id", 1);
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setPhotoFile(null); setPhotoPreview(null);
  }

  async function deleteProject(id) {
    if (!confirm("Delete this project permanently?")) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  }

  async function handleAddProject() {
    if (!form.title.trim()) return;
    setUploading(true);
    let image_url = null;
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from("project-images").upload(fileName, imageFile);
      if (!uploadError) image_url = `${SUPABASE_URL}/storage/v1/object/public/project-images/${fileName}`;
    }
    const { error } = await supabase.from("projects").insert([{
      ...form, image_url,
      order_index: projects.length + 1,
    }]);
    if (!error) {
      setForm({ title: "", category: "Game Props", year: new Date().getFullYear().toString(), description: "", color: "from-purple-900 to-violet-800" });
      setImageFile(null); setImagePreview(null);
      fetchProjects();
      setTab("projects");
    }
    setUploading(false);
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file); setPhotoPreview(URL.createObjectURL(file));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file); setImagePreview(URL.createObjectURL(file));
  }

  const tabs = ["profile", "projects", "add project"];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
        title="Admin Panel"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
                <div>
                  <h2 className="text-white font-bold text-lg">Admin Panel</h2>
                  <p className="text-gray-500 text-xs">Manage your portfolio content</p>
                </div>
                <button onClick={() => setOpen(false)} className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all">x</button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10 flex-shrink-0 overflow-x-auto">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-5 py-3 text-sm font-medium capitalize whitespace-nowrap transition-colors ${tab === t ? "text-white border-b-2 border-purple-500" : "text-gray-400 hover:text-white"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 p-6">

                {/* Profile Tab */}
                {tab === "profile" && profile && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-gray-400 text-sm mb-3 block">Profile Photo</label>
                      <div className="flex items-center gap-4">
                        <img src={photoPreview || profile.photo_url} alt="profile" className="w-20 h-20 rounded-2xl object-cover border border-white/10" />
                        <label className="cursor-pointer px-5 py-2 border border-white/10 hover:border-purple-500/50 rounded-xl text-sm text-gray-300 hover:text-white transition-all">
                          Change Photo
                          <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Display Name</label>
                      <input value={profile.name || ""} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Tagline</label>
                      <input value={profile.tagline || ""} onChange={(e) => setProfile({ ...profile, tagline: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Full Bio</label>
                      <textarea value={profile.bio_long || ""} onChange={(e) => setProfile({ ...profile, bio_long: e.target.value })} rows={5} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 resize-none" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Skills (comma separated)</label>
                      <textarea value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} rows={3} placeholder="Blender, 3D Modelling, UV Editing..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 resize-none" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-3 block">Stats</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((n) => (
                          <div key={n} className="bg-black/30 rounded-xl p-3 flex flex-col gap-2">
                            <input value={profile[`stat${n}_number`] || ""} onChange={(e) => setProfile({ ...profile, [`stat${n}_number`]: e.target.value })} placeholder="Number" className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50" />
                            <input value={profile[`stat${n}_label`] || ""} onChange={(e) => setProfile({ ...profile, [`stat${n}_label`]: e.target.value })} placeholder="Label" className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <button onClick={saveProfile} disabled={saving} className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-xl text-sm font-medium transition-colors">
                      {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
                    </button>
                  </div>
                )}

                {/* Projects Tab */}
                {tab === "projects" && (
                  <div className="space-y-3">
                    {projects.length === 0 && (
                      <p className="text-gray-500 text-sm text-center py-8">No projects yet. Go to Add Project tab to add your first one!</p>
                    )}
                    {projects.map((p) => (
                      <div key={p.id} className="flex items-center gap-4 bg-black/30 rounded-xl p-3 border border-white/5">
                        {p.image_url ? (
                          <img src={p.image_url} alt={p.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${p.color} flex-shrink-0`} />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{p.title}</p>
                          <p className="text-gray-500 text-xs">{p.category} · {p.year}</p>
                        </div>
                        <button onClick={() => deleteProject(p.id)} className="w-8 h-8 bg-red-500/10 hover:bg-red-500/30 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 transition-all flex-shrink-0 text-xs">
                          del
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Project Tab */}
                {tab === "add project" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Render Image</label>
                      <div className="flex items-start gap-4">
                        {imagePreview ? (
                          <img src={imagePreview} alt="preview" className="w-32 h-24 object-cover rounded-xl border border-white/10" />
                        ) : (
                          <div className="w-32 h-24 bg-white/5 border border-dashed border-white/20 rounded-xl flex items-center justify-center text-gray-500 text-xs">No image</div>
                        )}
                        <label className="cursor-pointer px-5 py-3 border border-white/10 hover:border-purple-500/50 rounded-xl text-sm text-gray-300 hover:text-white transition-all">
                          Choose Image
                          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Project Title *</label>
                      <input type="text" placeholder="e.g. Wooden Crate Prop" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Card Color (if no image)</label>
                      <select value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50">
                        {colors.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Description</label>
                      <textarea placeholder="Describe this project..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 resize-none" />
                    </div>
                    <button onClick={handleAddProject} disabled={uploading} className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-xl text-sm font-medium transition-colors">
                      {uploading ? "Uploading..." : "Add Project"}
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AboutSection() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data } = await supabase.from("profile").select("*").eq("id", 1).single();
    if (data) setProfile(data);
  }

  const skills = profile?.skills || [
    "Blender", "3D Modelling", "UV Editing", "Texturing",
    "Game Props", "Isometric Scenes", "Product Renders", "Environments",
    "Unreal Engine", "C++", "C", "Game Development",
  ];

  const stats = [
    { number: profile?.stat1_number || "1-2", label: profile?.stat1_label || "Years in Blender" },
    { number: profile?.stat2_number || "4+", label: profile?.stat2_label || "Work Categories" },
    { number: profile?.stat3_number || "CSE", label: profile?.stat3_label || "BTech Student" },
    { number: profile?.stat4_number || "Open", label: profile?.stat4_label || "For Freelance" },
  ];

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

          {/* Profile photo */}
          {profile?.photo_url && (
            <div className="mb-8 flex items-center gap-5">
              <div className="relative">
                <img
                  src={profile.photo_url}
                  alt="Mann Chawda"
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-purple-500/30"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">{profile?.name || "Mann Chawda"}</p>
                <p className="text-purple-400 text-sm">{profile?.tagline || "Blender Artist & Game Dev Student"}</p>
                <p className="text-gray-500 text-xs mt-1">Surat, Gujarat, India</p>
              </div>
            </div>
          )}

          <p className="text-gray-400 text-lg leading-relaxed mb-4">
            {profile?.bio_long || "Hi, I am Mann Chawda — a BTech Computer Science and Engineering student from Surat, Gujarat, with a deep passion for 3D art and game development."}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
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

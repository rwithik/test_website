"use client";

import { useState } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import { galleryImages } from "@/lib/data";

const categories = ["all", "campus", "events"];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const filtered = filter === "all" ? galleryImages : galleryImages.filter((g) => g.category === filter);

  return (
    <>
      <PageHero title="Gallery" subtitle="Campus life and events" />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 mb-8 justify-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  filter === c ? "bg-primary-500 text-white" : "bg-white border text-slate-600 hover:border-primary-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((img, i) => (
              <Reveal key={img.title + i} delay={i * 50}>
                <div
                   className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer"
                   onClick={() => setSelectedImage(img.src)}
                >
                  <Image src={img.src} alt={img.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="400px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-4 left-4 text-white font-semibold">{img.title}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {selectedImage && (
  <div
    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    onClick={() => setSelectedImage(null)}
  >
    <button
      className="absolute top-4 right-6 text-white text-5xl font-bold"
      onClick={() => setSelectedImage(null)}
    >
      ×
    </button>

    <div className="relative w-[95vw] h-[90vh]">
      <Image
        src={selectedImage}
        alt="Gallery Image"
        fill
        className="object-contain"
      />
    </div>
  </div>
)}
    </>
  );
}

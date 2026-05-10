"use client";

import { useState } from "react";

const CATEGORY_LABELS = {
  "T-shirt": "T",
  "Pantalon": "P",
  "Hoodie": "H",
  "Veste": "V",
};

export function ProductImage({ src, alt, category = "", className = "" }) {
  const [failed, setFailed] = useState(false);

  const isPlaceholder = failed || !src || src.includes("nomad") || src.includes("cabin") || src.includes("hearth");

  if (isPlaceholder) {
    const letter = CATEGORY_LABELS[category] ?? category.charAt(0).toUpperCase();
    return (
      <div className={`flex items-center justify-center bg-[#111] ${className}`}>
        <span
          className="select-none font-headline font-black uppercase text-white/10"
          style={{ fontSize: "clamp(5rem, 20vw, 14rem)", lineHeight: 1 }}
        >
          {letter || "C"}
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-[#f0f0ee] ${className}`}>
      <img
        alt={alt}
        className="h-full w-full object-contain p-6"
        src={src}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

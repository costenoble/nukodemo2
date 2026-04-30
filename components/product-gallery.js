"use client";

import { useEffect, useState } from "react";

export function ProductGallery({ images, productName }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e) {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  return (
    <>
      {/* Galerie principale */}
      <div className="space-y-3">
        <button
          className="group relative w-full overflow-hidden border border-outline bg-surface"
          onClick={() => setLightbox(active)}
          type="button"
        >
          <img
            alt={`${productName} — vue principale`}
            className="h-[480px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            src={images[active]}
          />
          <span className="absolute bottom-4 right-4 border border-white/40 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            Agrandir
          </span>
        </button>

        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-3">
            {images.map((src, i) => (
              <button
                key={src}
                className={`overflow-hidden border transition-all duration-200 ${
                  i === active ? "border-primary" : "border-outline opacity-60 hover:opacity-100"
                }`}
                onClick={() => setActive(i)}
                type="button"
              >
                <img
                  alt={`${productName} vue ${i + 1}`}
                  className="h-24 w-full object-cover"
                  src={src}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-white/30 text-white hover:border-white"
            onClick={() => setLightbox(null)}
            type="button"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/30 text-white hover:border-white"
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + images.length) % images.length); }}
                type="button"
              >
                ‹
              </button>
              <button
                className="absolute right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/30 text-white hover:border-white"
                onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % images.length); }}
                type="button"
              >
                ›
              </button>
            </>
          )}

          <img
            alt={`${productName} — plein écran`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
            src={images[lightbox]}
          />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                className={`h-1.5 transition-all duration-200 ${i === lightbox ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                type="button"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

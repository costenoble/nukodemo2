"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function ParallaxHero({ src, alt, imageClassName = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onScroll() {
      el.style.transform = `scale(1.08) translateY(${window.scrollY * 0.12}px)`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0"
      style={{ transform: "scale(1.08)", willChange: "transform" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}

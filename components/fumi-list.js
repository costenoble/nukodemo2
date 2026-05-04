"use client";

import { useEffect, useRef } from "react";

function FumiItem({ num, label, desc }) {
  const innerRef = useRef(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const row = el.closest("[data-fumi-row]");

    function update() {
      const rect = row.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1,
        (vh * 0.9 - rect.top) / (vh * 0.22)
      ));
      el.style.transform = `translateX(${((1 - progress) * -48).toFixed(1)}px)`;
      el.style.opacity = Math.min(1, progress * 1.8).toFixed(2);
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div data-fumi-row className="group relative overflow-hidden px-8 py-7">
      <div className="absolute inset-0 -translate-x-full bg-surface-muted transition-transform duration-500 ease-out group-hover:translate-x-0" />
      <div ref={innerRef} className="relative flex items-center gap-8" style={{ opacity: 0 }}>
        <div className="flex-1">
          <h3 className="font-headline text-2xl font-bold tracking-[-0.04em]">{label}</h3>
          <p className="mt-2 text-sm font-light leading-7 text-on-surface-muted">{desc}</p>
        </div>
        <span className="select-none font-headline text-[5.5rem] font-bold leading-none tracking-[-0.06em] text-outline transition-transform duration-500 ease-out group-hover:-translate-x-1">
          {num}
        </span>
      </div>
    </div>
  );
}

export function FumiList({ items }) {
  return (
    <div className="mt-14 divide-y divide-outline border border-outline">
      {items.map((item) => (
        <FumiItem key={item.num} {...item} />
      ))}
    </div>
  );
}

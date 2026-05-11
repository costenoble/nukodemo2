"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import { TransitionLink as Link } from "@/components/page-transition";

const HIDDEN = { clipPath: "inset(0 0 100% 0)", opacity: 0 };

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function update() {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const triggerStart = vh * 0.65;
      const triggerEnd = vh * 0.05;
      const progress = Math.max(0, Math.min(1, (triggerStart - rect.top) / (triggerStart - triggerEnd)));
      el.style.clipPath = `inset(0 0 ${((1 - progress) * 100).toFixed(2)}% 0)`;
      el.style.opacity = Math.min(1, progress * 1.8).toFixed(2);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return ref;
}

export function HomeSplit() {
  const t = useTranslations("home");
  const particulierRef = useScrollReveal();
  const proRef = useScrollReveal();

  return (
    <>
      {/* ── PARTICULIER ── */}
      <section
        ref={particulierRef}
        className="relative flex min-h-[92vh] flex-col justify-between border-b border-outline bg-white px-8 py-16 md:px-16 md:py-20"
        style={HIDDEN}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-on-surface-muted">
          {t("splitParticularEyebrow")}
        </p>

        <div className="mt-auto pt-16">
          <h2 className="font-headline text-[13vw] font-black uppercase leading-[0.85] tracking-[-0.04em] text-black md:text-[10vw] lg:text-[8vw]">
            {t("splitParticularTitle").split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
          <p className="mt-8 max-w-md text-base font-light leading-8 text-on-surface-muted">
            {t("splitParticularDesc")}
          </p>
          <Link
            className="mt-10 inline-flex items-center gap-3 border border-black px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white"
            href="/particulier"
          >
            {t("splitParticularCta")} →
          </Link>
        </div>
      </section>

      {/* ── PROFESSIONNEL ── */}
      <section
        ref={proRef}
        className="relative flex min-h-[92vh] flex-col justify-between border-b border-black bg-black px-8 py-16 text-white md:px-16 md:py-20"
        style={HIDDEN}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/40">
          {t("splitProEyebrow")}
        </p>

        <div className="mt-auto pt-16">
          <h2 className="font-headline text-[13vw] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white md:text-[10vw] lg:text-[8vw]">
            {t("splitProTitle").split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
          <p className="mt-8 max-w-md text-base font-light leading-8 text-white/50">
            {t("splitProDesc")}
          </p>
          <Link
            className="mt-10 inline-flex items-center gap-3 border border-white px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
            href="/contact"
          >
            {t("splitProCta")} →
          </Link>
        </div>
      </section>
    </>
  );
}

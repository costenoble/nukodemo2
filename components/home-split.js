"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

function Arrow() {
  return (
    <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

const HIDDEN = { clipPath: "inset(0 0 100% 0)", opacity: 0 };

function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function update() {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Démarre quand l'élément est à 65% du viewport (bien visible)
      // Se termine quand son haut touche 5% du viewport
      const triggerStart = vh * 0.65;
      const triggerEnd = vh * 0.05;
      const progress = Math.max(0, Math.min(1, (triggerStart - rect.top) / (triggerStart - triggerEnd)));

      const clipBottom = (1 - progress) * 100;
      el.style.clipPath = `inset(0 0 ${clipBottom.toFixed(2)}% 0)`;
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
        className="relative flex min-h-[92vh] flex-col justify-between border-b border-outline bg-[#f6f3ee] px-8 py-16 md:px-16 md:py-20"
        style={HIDDEN}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-secondary">
          {t("splitParticularEyebrow")}
        </p>

        <div className="mt-auto pt-16">
          <h2 className="font-headline text-[13vw] font-bold uppercase leading-[0.85] tracking-[-0.06em] text-on-surface md:text-[10vw] lg:text-[8vw]">
            {t("splitParticularTitle").split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
          <p className="mt-8 max-w-md text-base font-light leading-8 text-on-surface-muted">
            {t("splitParticularDesc")}
          </p>
          <Link
            className="group mt-10 inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.24em] text-on-surface transition-colors hover:text-secondary"
            href="/particulier"
          >
            {t("splitParticularCta")}
            <Arrow />
          </Link>
        </div>

        <div className="absolute bottom-8 right-8 hidden text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-muted md:block">
          ↓ scroll
        </div>
      </section>

      {/* ── PROFESSIONNEL ── */}
      <section
        ref={proRef}
        className="relative flex min-h-[92vh] flex-col justify-between border-b border-[#2d2c28] bg-[#1d1c18] px-8 py-16 text-white md:px-16 md:py-20"
        style={HIDDEN}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#dcbf96]">
          {t("splitProEyebrow")}
        </p>

        <div className="mt-auto pt-16">
          <h2 className="font-headline text-[13vw] font-bold uppercase leading-[0.85] tracking-[-0.06em] text-white md:text-[10vw] lg:text-[8vw]">
            {t("splitProTitle").split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
          <p className="mt-8 max-w-md text-base font-light leading-8 text-white/60">
            {t("splitProDesc")}
          </p>
          <Link
            className="group mt-10 inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#dcbf96] transition-colors hover:text-white"
            href="/professionnel"
          >
            {t("splitProCta")}
            <Arrow />
          </Link>
        </div>

        <div className="absolute bottom-8 right-8 hidden text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 md:block">
          ↓ scroll
        </div>
      </section>
    </>
  );
}

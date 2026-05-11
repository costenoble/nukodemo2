"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function parseRange(value, fallbackStart, fallbackEnd) {
  if (!value) {
    return [fallbackStart, fallbackEnd];
  }

  const [rawStart, rawEnd] = value.split(",");
  const start = Number.parseFloat(rawStart?.trim() ?? "");
  const end = Number.parseFloat(rawEnd?.trim() ?? "");

  return [
    Number.isFinite(start) ? start : fallbackStart,
    Number.isFinite(end) ? end : fallbackEnd
  ];
}

// Module-level singletons so navigation between routes never reinstantiates
// the scroll engine or re-registers the plugin.
let motionLibsPromise = null;
let locomotiveInstance = null;

function loadMotionLibs() {
  if (!motionLibsPromise) {
    motionLibsPromise = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("locomotive-scroll")
    ]).then(([gsapMod, stMod, locoMod]) => {
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger, LocomotiveScroll: locoMod.default };
    });
  }
  return motionLibsPromise;
}

export function MotionProvider({ children }) {
  const pathname = usePathname();
  const libsRef = useRef(null);

  // ── Effect A: init scroll engine ONCE for the lifetime of the app ─────────
  useEffect(() => {
    let cancelled = false;

    loadMotionLibs().then((libs) => {
      if (cancelled) return;
      libsRef.current = libs;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!locomotiveInstance && !prefersReducedMotion && window.innerWidth >= 1024) {
        locomotiveInstance = new libs.LocomotiveScroll({
          lenisOptions: {
            lerp: 0.12,
            duration: 1.1,
            smoothWheel: true,
            wheelMultiplier: 0.92
          },
          scrollCallback: () => libs.ScrollTrigger.update()
        });
      }
    });

    return () => {
      cancelled = true;
      // Intentionally do NOT destroy locomotive on unmount — the provider lives
      // for the whole app, and we want the scroll engine to persist across
      // route changes for buttery transitions.
    };
  }, []);

  // ── Effect B: (re)build GSAP triggers on every route change ──────────────
  useEffect(() => {
    let cancelled = false;
    let context = null;

    loadMotionLibs().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      context = gsap.context(() => {
        const revealElements = gsap.utils.toArray("[data-reveal]");
        revealElements.forEach((element) => {
          gsap.from(element, {
            autoAlpha: 0,
            y: 28,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true
            }
          });
        });

        const staggerGroups = gsap.utils.toArray("[data-reveal-stagger]");
        staggerGroups.forEach((group) => {
          const items = group.querySelectorAll("[data-reveal-item]");
          if (!items.length) return;

          gsap.from(items, {
            autoAlpha: 0,
            y: 24,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
              once: true
            }
          });
        });

        const mediaBlocks = gsap.utils.toArray("[data-media-reveal]");
        mediaBlocks.forEach((element) => {
          gsap.fromTo(
            element,
            {
              autoAlpha: 0,
              clipPath: "inset(16% 10% 16% 10%)"
            },
            {
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 82%",
                once: true
              }
            }
          );
        });

        const isolatedSections = gsap.utils.toArray("[data-section-transition]");
        isolatedSections.forEach((section) => {
          const variant = section.dataset.sectionTransition ?? "lift";
          const start = section.dataset.sectionStart ?? "top 76%";
          const baseConfig = {
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start, once: true }
          };

          switch (variant) {
            case "curtain":
              gsap.fromTo(
                section,
                { autoAlpha: 0, y: 36, clipPath: "inset(0% 0% 18% 0%)" },
                { ...baseConfig, autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }
              );
              break;
            case "drift-left":
              gsap.from(section, { ...baseConfig, autoAlpha: 0, x: 60 });
              break;
            case "drift-right":
              gsap.from(section, { ...baseConfig, autoAlpha: 0, x: -60 });
              break;
            case "press-in":
              gsap.from(section, { ...baseConfig, autoAlpha: 0, y: 24, scale: 0.96 });
              break;
            default:
              gsap.from(section, { ...baseConfig, autoAlpha: 0, y: 40 });
          }
        });

        const scrubYElements = gsap.utils.toArray("[data-scrub-y]");
        scrubYElements.forEach((element) => {
          const [startY, endY] = parseRange(element.dataset.scrubY, -12, 12);
          gsap.fromTo(
            element,
            { yPercent: startY },
            {
              yPercent: endY,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        });

        const scrubXElements = gsap.utils.toArray("[data-scrub-x]");
        scrubXElements.forEach((element) => {
          const [startX, endX] = parseRange(element.dataset.scrubX, -6, 6);
          gsap.fromTo(
            element,
            { xPercent: startX },
            {
              xPercent: endX,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        });

        const scrubScaleElements = gsap.utils.toArray("[data-scrub-scale]");
        scrubScaleElements.forEach((element) => {
          const [startScale, endScale] = parseRange(element.dataset.scrubScale, 1.12, 1);
          gsap.fromTo(
            element,
            { scale: startScale },
            {
              scale: endScale,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelled = true;
      if (context) {
        context.revert();
      }
    };
  }, [pathname]);

  return children;
}

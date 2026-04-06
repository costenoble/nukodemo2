"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

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

export function MotionProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    let isCancelled = false;
    let cleanup = () => {};

    async function initMotion() {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const [{ default: gsap }, { ScrollTrigger }, { default: LocomotiveScroll }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("locomotive-scroll")
        ]);

      if (isCancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      let locomotive = null;

      if (!prefersReducedMotion && window.innerWidth >= 1024) {
        locomotive = new LocomotiveScroll({
          lenisOptions: {
            lerp: 0.12,
            duration: 1.1,
            smoothWheel: true,
            wheelMultiplier: 0.92
          },
          scrollCallback: () => ScrollTrigger.update()
        });
      }

      const context = gsap.context(() => {
        if (prefersReducedMotion) {
          return;
        }

        const heroBlocks = gsap.utils.toArray("[data-hero-copy]");
        heroBlocks.forEach((block) => {
          const items = block.querySelectorAll("[data-reveal-item]");

          if (!items.length) {
            return;
          }

          gsap.from(items, {
            autoAlpha: 0,
            y: 36,
            duration: 1.05,
            ease: "power3.out",
            stagger: 0.12,
            clearProps: "all"
          });
        });

        const revealElements = gsap.utils.toArray("[data-reveal]");
        revealElements.forEach((element) => {
          gsap.from(element, {
            autoAlpha: 0,
            y: 34,
            filter: "blur(10px)",
            duration: 1,
            ease: "power3.out",
            clearProps: "filter",
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

          if (!items.length) {
            return;
          }

          gsap.from(items, {
            autoAlpha: 0,
            y: 28,
            filter: "blur(8px)",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            clearProps: "filter",
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
              duration: 1.2,
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
            duration: 1.15,
            ease: "power3.out",
            clearProps: "clipPath",
            scrollTrigger: {
              trigger: section,
              start,
              once: true
            }
          };

          switch (variant) {
            case "curtain":
              gsap.fromTo(
                section,
                {
                  autoAlpha: 0,
                  y: 42,
                  clipPath: "inset(0% 0% 18% 0%)"
                },
                {
                  ...baseConfig,
                  autoAlpha: 1,
                  y: 0,
                  clipPath: "inset(0% 0% 0% 0%)"
                }
              );
              break;
            case "drift-left":
              gsap.from(section, {
                ...baseConfig,
                autoAlpha: 0,
                x: 72
              });
              break;
            case "drift-right":
              gsap.from(section, {
                ...baseConfig,
                autoAlpha: 0,
                x: -72
              });
              break;
            case "press-in":
              gsap.from(section, {
                ...baseConfig,
                autoAlpha: 0,
                y: 28,
                scale: 0.96
              });
              break;
            default:
              gsap.from(section, {
                ...baseConfig,
                autoAlpha: 0,
                y: 48
              });
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

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      cleanup = () => {
        context.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        locomotive?.destroy();
      };
    }

    initMotion();

    return () => {
      isCancelled = true;
      cleanup();
    };
  }, [pathname]);

  return children;
}

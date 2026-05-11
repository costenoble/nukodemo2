"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";

import { Link, usePathname, useRouter } from "@/i18n/navigation";

const TransitionContext = createContext(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used within PageTransitionProvider");
  return ctx;
}

// ── Timing (ms) ─────────────────────────────────────────────────────────────
const OVERLAY_ENTER = 600;
const LOGO_DELAY    = 80;
const LOGO_IN       = 480;
const NAVIGATE_AT   = 400;
const HOLD          = 50;
const LOGO_EXIT     = 220;
const OVERLAY_EXIT  = 680;
const EASE = "cubic-bezier(0.76,0,0.24,1)";
const EXIT_START = OVERLAY_ENTER + HOLD; // 650ms

// ── Animate page titles in after overlay reveals the new page ────────────────
function animateTitlesIn() {
  const raw = document.querySelectorAll(
    ".page-title, .eyebrow, [data-hero-badge], [data-hero-title], [data-hero-cta]"
  );
  const els = Array.from(new Set(Array.from(raw)));
  if (!els.length) return;

  // Cancel any running CSS animation and hard-set to hidden state
  els.forEach(el => {
    el.style.willChange  = "opacity, transform";
    el.style.animation   = "none";
    el.style.transition  = "none";
    el.style.opacity     = "0";
    el.style.transform   = "translateY(50px)";
  });

  // Double rAF: first frame commits the reset, second frame kicks the transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      els.forEach((el, i) => {
        const delay = 0.05 + i * 0.07;
        el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`;
        el.style.opacity    = "1";
        el.style.transform  = "translateY(0)";
      });

      setTimeout(() => {
        els.forEach(el => {
          el.style.willChange = "";
          el.style.animation  = "";
          el.style.transition = "";
          el.style.opacity    = "";
          el.style.transform  = "";
        });
      }, 1400);
    });
  });
}

export function PageTransitionProvider({ children }) {
  const router          = useRouter();
  const pathname        = usePathname();
  const overlayRef      = useRef(null);
  const logoRef         = useRef(null);
  const isAnimatingRef  = useRef(false);
  const prevPathnameRef = useRef(pathname);

  // ── Phase 2: pathname changed → slide overlay back down ──────────────────
  useEffect(() => {
    if (pathname === prevPathnameRef.current) return;
    prevPathnameRef.current = pathname;

    const overlay = overlayRef.current;
    const logo    = logoRef.current;
    if (!overlay) return;

    const exitTimer = setTimeout(() => {
      // Logo exits: scale up + fade out (GPU-only, no reflow)
      if (logo) {
        logo.style.transition = `opacity ${LOGO_EXIT}ms ease, transform ${LOGO_EXIT}ms ease`;
        logo.style.opacity    = "0";
        logo.style.transform  = "scale(1.12)";
      }

      animateTitlesIn();

      overlay.style.transition = `transform ${OVERLAY_EXIT}ms ${EASE}`;
      overlay.style.transform  = "translateY(100%)";

      const doneTimer = setTimeout(() => {
        isAnimatingRef.current = false;
        if (logo) {
          logo.style.transition = "none";
          logo.style.opacity    = "0";
          logo.style.transform  = "scale(0.88)";
        }
      }, OVERLAY_EXIT);

      return () => clearTimeout(doneTimer);
    }, EXIT_START);

    return () => clearTimeout(exitTimer);
  }, [pathname]);

  // ── Phase 1: navigate → overlay slides up, logo animates in ──────────────
  const navigate = useCallback(
    (href) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const overlay = overlayRef.current;
      const logo    = logoRef.current;

      if (!overlay) {
        router.push(href);
        isAnimatingRef.current = false;
        return;
      }

      // Reset logo to start state (small, hidden) — no transition so it's instant
      if (logo) {
        logo.style.transition = "none";
        logo.style.opacity    = "0";
        logo.style.transform  = "scale(0.88)";
      }

      // Slide overlay up (GPU transform only)
      overlay.style.transition = `transform ${OVERLAY_ENTER}ms ${EASE}`;
      overlay.style.transform  = "translateY(0)";

      // Logo enters: scale up + fade in (GPU-only)
      const logoTimer = setTimeout(() => {
        if (logo) {
          logo.style.transition = `opacity ${LOGO_IN}ms cubic-bezier(0.16,1,0.3,1), transform ${LOGO_IN}ms cubic-bezier(0.16,1,0.3,1)`;
          logo.style.opacity    = "1";
          logo.style.transform  = "scale(1)";
        }
      }, LOGO_DELAY);

      const navTimer = setTimeout(() => router.push(href), NAVIGATE_AT);

      return () => {
        clearTimeout(logoTimer);
        clearTimeout(navTimer);
      };
    },
    [router]
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-black"
        style={{
          transform: "translateY(100%)",
          willChange: "transform",
        }}
      >
        <span
          ref={logoRef}
          className="select-none font-headline font-black uppercase text-white"
          style={{
            fontSize:   "clamp(80px, 20vw, 280px)",
            lineHeight: 1,
            opacity:    0,
            transform:  "scale(0.88)",
            willChange: "opacity, transform",
          }}
        >
          CST
        </span>
      </div>
    </TransitionContext.Provider>
  );
}

// ── TransitionLink ────────────────────────────────────────────────────────────
export function TransitionLink({ href, children, onClick, ...props }) {
  const { navigate } = usePageTransition();
  const router = useRouter();

  const isExternal =
    typeof href === "string" &&
    (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:"));

  // Prefetch eagerly on hover so the page is ready before the animation ends
  function handleMouseEnter() {
    if (!isExternal && typeof href === "string") {
      router.prefetch(href);
    }
  }

  function handleClick(e) {
    if (isExternal) { onClick?.(); return; }
    e.preventDefault();
    onClick?.();
    navigate(href);
  }

  if (isExternal) {
    return <a href={href} onClick={handleClick} {...props}>{children}</a>;
  }

  return (
    <Link href={href} onClick={handleClick} onMouseEnter={handleMouseEnter} {...props}>
      {children}
    </Link>
  );
}

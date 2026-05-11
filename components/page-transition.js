"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";

import { Link, usePathname, useRouter } from "@/i18n/navigation";

const TransitionContext = createContext(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used within PageTransitionProvider");
  return ctx;
}

// ── Timing constants (ms) ──────────────────────────────────────────────────
const OVERLAY_ENTER   = 600;  // overlay slides up
const LOGO_DELAY      = 80;   // logo starts animating after overlay begins
const LOGO_IN         = 500;  // logo entrance duration
const NAVIGATE_AT     = 400;  // when router.push fires (page loads under overlay)
const HOLD            = 50;   // black screen hold after overlay fully covers
const LOGO_EXIT       = 250;  // logo fade-out duration
const OVERLAY_EXIT    = 700;  // overlay slides down
const EASE = "cubic-bezier(0.76,0,0.24,1)";

// Start of overlay exit phase (after enter + hold)
const EXIT_START = OVERLAY_ENTER + HOLD; // 900ms

function animateTitlesIn() {
  const els = document.querySelectorAll(".page-title, .eyebrow, [data-hero-badge], [data-hero-title], [data-hero-cta]");
  // Deduplicate (an element can match multiple selectors)
  const unique = [...new Set(els)];

  unique.forEach((el) => {
    // Cancel any running CSS keyframe animation so it doesn't fight the transition
    el.style.animation  = "none";
    el.style.transition = "none";
    el.style.opacity    = "0";
    el.style.transform  = "translateY(50px)";
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      unique.forEach((el, i) => {
        const delay = 0.05 + i * 0.07;
        el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`;
        el.style.opacity    = "1";
        el.style.transform  = "translateY(0)";
      });

      setTimeout(() => {
        unique.forEach(el => {
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

    // Wait for the full enter + hold before exiting
    const exitTimer = setTimeout(() => {
      // Fade logo out while overlay starts moving
      if (logo) {
        logo.style.transition = `opacity ${LOGO_EXIT}ms ease, letter-spacing ${LOGO_EXIT}ms ease, transform ${LOGO_EXIT}ms ease`;
        logo.style.opacity      = "0";
        logo.style.letterSpacing = "0.3em";
        logo.style.transform    = "scale(0.95)";
      }

      // Animate page titles (reset + slide up from below)
      animateTitlesIn();

      // Slide overlay down
      overlay.style.transition = `transform ${OVERLAY_EXIT}ms ${EASE}`;
      overlay.style.transform  = "translateY(100%)";

      const doneTimer = setTimeout(() => {
        isAnimatingRef.current = false;
        // Reset logo for next use
        if (logo) {
          logo.style.transition    = "none";
          logo.style.opacity       = "0";
          logo.style.letterSpacing = "0.5em";
          logo.style.transform     = "scale(1.05)";
        }
      }, OVERLAY_EXIT);

      return () => clearTimeout(doneTimer);
    }, EXIT_START);

    return () => clearTimeout(exitTimer);
  }, [pathname]);

  // ── Phase 1: click → overlay slides up, logo animates in ─────────────────
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

      // Reset logo to wide/invisible start state
      if (logo) {
        logo.style.transition    = "none";
        logo.style.opacity       = "0";
        logo.style.letterSpacing = "0.5em";
        logo.style.transform     = "scale(1.05)";
      }

      // Slide overlay up
      overlay.style.transition = `transform ${OVERLAY_ENTER}ms ${EASE}`;
      overlay.style.transform  = "translateY(0)";

      // Logo enters: compress letter-spacing + fade in
      const logoTimer = setTimeout(() => {
        if (logo) {
          logo.style.transition    = `opacity ${LOGO_IN}ms cubic-bezier(0.16,1,0.3,1), letter-spacing ${LOGO_IN}ms cubic-bezier(0.16,1,0.3,1), transform ${LOGO_IN}ms cubic-bezier(0.16,1,0.3,1)`;
          logo.style.opacity       = "1";
          logo.style.letterSpacing = "-0.04em";
          logo.style.transform     = "scale(1)";
        }
      }, LOGO_DELAY);

      // Navigate while overlay is covering the page
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
        style={{ transform: "translateY(100%)", willChange: "transform" }}
      >
        <span
          ref={logoRef}
          className="select-none font-headline font-black uppercase text-white"
          style={{
            fontSize:      "clamp(80px, 20vw, 280px)",
            lineHeight:    1,
            opacity:       0,
            letterSpacing: "0.5em",
            transform:     "scale(1.05)",
          }}
        >
          CST
        </span>
      </div>
    </TransitionContext.Provider>
  );
}

export function TransitionLink({ href, children, onClick, ...props }) {
  const { navigate } = usePageTransition();

  const isExternal =
    typeof href === "string" &&
    (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:"));

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
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

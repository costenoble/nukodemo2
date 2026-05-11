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
const OVERLAY_ENTER = 450;
const LOGO_DELAY    = 60;
const LOGO_IN       = 340;
const NAVIGATE_AT   = 300;
const HOLD          = 50;
const LOGO_EXIT     = 180;
const OVERLAY_EXIT  = 400;
const EASE = "cubic-bezier(0.76,0,0.24,1)";
const EXIT_START = OVERLAY_ENTER + HOLD; // 650ms

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

      overlay.style.transition = `transform ${OVERLAY_EXIT}ms ${EASE}`;
      overlay.style.transform  = "translateY(100%)";

      // Release the gate so the new page's hero CSS keyframes start NOW,
      // synced to the overlay reveal instead of fighting it.
      document.documentElement.removeAttribute("data-transitioning");

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

      // Gate hero anims on the incoming page so they play in sync with the
      // overlay reveal rather than running while the page is hidden.
      document.documentElement.setAttribute("data-transitioning", "1");

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

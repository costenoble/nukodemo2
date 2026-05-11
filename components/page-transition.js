"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";

import { Link, usePathname, useRouter } from "@/i18n/navigation";

const TransitionContext = createContext(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used within PageTransitionProvider");
  return ctx;
}

const ENTER_DURATION = 900;
const EXIT_DURATION  = 900;
const NAVIGATE_AFTER = 600;
const EASE = "cubic-bezier(0.76,0,0.24,1)";

export function PageTransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const logoRef    = useRef(null);
  const isAnimatingRef   = useRef(false);
  const prevPathnameRef  = useRef(pathname);

  // ── EXIT: pathname changed → animate logo out, then slide overlay down ──
  useEffect(() => {
    if (pathname === prevPathnameRef.current) return;
    prevPathnameRef.current = pathname;

    const overlay = overlayRef.current;
    const logo    = logoRef.current;
    if (!overlay) return;

    // 1. Fade logo out
    if (logo) {
      logo.style.transition = `opacity 0.25s ease, transform 0.25s ease`;
      logo.style.opacity    = "0";
      logo.style.transform  = "scale(0.9) translateY(-20px)";
    }

    // 2. After short pause, slide overlay down
    const slideTimer = setTimeout(() => {
      overlay.style.transition = `transform ${EXIT_DURATION}ms ${EASE}`;
      overlay.style.transform  = "translateY(100%)";

      const doneTimer = setTimeout(() => {
        isAnimatingRef.current = false;
        // Reset logo for next enter
        if (logo) {
          logo.style.transition = "none";
          logo.style.opacity    = "0";
          logo.style.transform  = "scale(0.85) translateY(30px)";
        }
      }, EXIT_DURATION);

      return () => clearTimeout(doneTimer);
    }, 200);

    return () => clearTimeout(slideTimer);
  }, [pathname]);

  // ── ENTER: slide overlay up, animate logo in, then navigate ──
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

      // Reset logo to start state before animating in
      if (logo) {
        logo.style.transition = "none";
        logo.style.opacity    = "0";
        logo.style.transform  = "scale(0.85) translateY(30px)";
      }

      // Slide overlay up
      overlay.style.transition = `transform ${ENTER_DURATION}ms ${EASE}`;
      overlay.style.transform  = "translateY(0)";

      // Animate logo in after overlay starts rising
      const logoTimer = setTimeout(() => {
        if (logo) {
          logo.style.transition = `opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)`;
          logo.style.opacity    = "1";
          logo.style.transform  = "scale(1) translateY(0)";
        }
      }, 150);

      // Navigate mid-animation
      const navTimer = setTimeout(() => {
        router.push(href);
      }, NAVIGATE_AFTER);

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
            fontSize: "clamp(80px, 18vw, 260px)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            opacity: 0,
            transform: "scale(0.85) translateY(30px)",
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
    if (isExternal) {
      onClick?.();
      return;
    }
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

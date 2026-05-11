"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";

import { Link, usePathname, useRouter } from "@/i18n/navigation";

const TransitionContext = createContext(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used within PageTransitionProvider");
  return ctx;
}

export function PageTransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const prevPathnameRef = useRef(pathname);

  // When pathname changes → slide overlay back down, revealing the new page
  useEffect(() => {
    if (pathname === prevPathnameRef.current) return;
    prevPathnameRef.current = pathname;

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Small delay so Next.js has rendered the new page under the overlay
    const timer = setTimeout(() => {
      overlay.style.transform = "translateY(100%)";
      const reset = setTimeout(() => {
        isAnimatingRef.current = false;
      }, 700);
      return () => clearTimeout(reset);
    }, 80);

    return () => clearTimeout(timer);
  }, [pathname]);

  const navigate = useCallback(
    (href) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const overlay = overlayRef.current;
      if (!overlay) {
        router.push(href);
        isAnimatingRef.current = false;
        return;
      }

      // Phase 1 — overlay slides UP, covering the current page
      overlay.style.transform = "translateY(0)";

      // Navigate mid-animation so the new page loads while covered
      setTimeout(() => {
        router.push(href);
      }, 380);
    },
    [router]
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      {/* Overlay — lives above everything including the fixed header (z-[200]) */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
        style={{
          transform: "translateY(100%)",
          transition: "transform 0.6s cubic-bezier(0.76,0,0.24,1)",
          willChange: "transform"
        }}
      >
        <span className="font-headline text-2xl font-black uppercase tracking-[0.06em] text-white opacity-20 select-none">
          CST
        </span>
      </div>
    </TransitionContext.Provider>
  );
}

/**
 * Drop-in replacement for next-intl <Link> that triggers the page transition
 * before navigating. External links (http / mailto / tel) are passed through.
 */
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
    return (
      <a href={href} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

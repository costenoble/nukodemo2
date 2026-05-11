"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef, useCallback } from "react";

import { useCart } from "@/components/cart-provider";
import { TransitionLink } from "@/components/page-transition";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const navItems = [
  { href: "/", key: "home" },
  { href: "/particulier", key: "stoves" },
  { href: "/fumisterie", key: "fumisterie" },
  { href: "/histoire", key: "story" },
  { href: "/contact", key: "contact" },
];

function isActive(pathname, href) {
  const clean = pathname.replace(/^\/(fr|en)/, "") || "/";
  if (href === "/") return clean === href;
  return clean.startsWith(href);
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { count, hasHydrated } = useCart();
  const t = useTranslations("nav");
  const currentLocale = pathname.startsWith("/en") ? "en" : "fr";
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const handleKeyDown = useCallback((event) => {
    if (!isMenuOpen) return;
    if (event.key === "Escape") {
      setIsMenuOpen(false);
      hamburgerRef.current?.focus();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = menuRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isMenuOpen) {
      setTimeout(() => {
        menuRef.current?.querySelector("a, button")?.focus();
      }, 50);
    }
  }, [isMenuOpen]);

  function switchLocale(locale) {
    router.replace(pathname, { locale });
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-black">
        {/* ── Barre principale ── */}
        <div className="flex h-14 items-center px-5 md:px-10">

          {/* Hamburger (visible everywhere now) */}
          <div className="flex w-1/3 md:w-auto md:mr-8">
            <button
              ref={hamburgerRef}
              className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMenuOpen((c) => !c)}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              type="button"
            >
              <span className={`block h-px w-5 bg-white transition-all duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-white transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-white transition-all duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>

          {/* Logo — centré */}
          <div className="flex w-1/3 justify-center md:flex-1 md:justify-center">
            <TransitionLink
              className="font-headline text-2xl font-black uppercase tracking-[0.06em] text-white md:text-3xl"
              href="/"
              onClick={() => setIsMenuOpen(false)}
            >
              CST
            </TransitionLink>
          </div>

          {/* Droite */}
          <div className="flex w-1/3 items-center justify-end gap-3 md:w-auto md:gap-5">

            {/* FR / EN */}
            <div className="hidden items-center gap-1.5 md:flex">
              {routing.locales.map((locale, i) => (
                <span key={locale} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-white/20 text-xs">|</span>}
                  <button
                    className={`text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
                      currentLocale === locale ? "text-white" : "text-white/40 hover:text-white/70"
                    }`}
                    onClick={() => switchLocale(locale)}
                    type="button"
                  >
                    {locale.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            {/* Dark mode toggle */}
            <ThemeToggle />

            {/* Panier */}
            <TransitionLink className="relative text-white transition-opacity hover:opacity-60" href="/panier" aria-label={t("cart")}>
              <CartIcon />
              {hasHydrated && count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold leading-none text-black">
                  {count}
                </span>
              )}
            </TransitionLink>

            {/* Précommander — desktop */}
            <TransitionLink
              className="hidden border border-white/60 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white hover:text-black md:inline-flex"
              href="/particulier"
            >
              {t("preorder")}
            </TransitionLink>

            {/* Précommander — mobile */}
            <TransitionLink
              className="border border-white/50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white md:hidden"
              href="/particulier"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("preorder")}
            </TransitionLink>
          </div>
        </div>
      </header>

      {/* ── Menu overlay plein écran ── */}
      <div
        ref={menuRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className={`fixed inset-0 z-40 flex flex-col bg-black transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Contenu centré verticalement */}
        <div className="flex flex-1 flex-col items-start justify-center px-8 md:px-16">
          <nav className="w-full space-y-1">
            {navItems.map((item, i) => (
              <div
                key={item.href}
                className="overflow-hidden"
                style={{
                  transitionDelay: isMenuOpen ? `${80 + i * 60}ms` : "0ms",
                }}
              >
                <TransitionLink
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 font-headline text-5xl font-black uppercase tracking-[-0.03em] transition-all duration-500 md:text-7xl ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  } ${isActive(pathname, item.href) ? "text-[#006400]" : "text-white hover:text-white/60"}`}
                  style={{
                    transitionDelay: isMenuOpen ? `${80 + i * 60}ms` : "0ms",
                  }}
                >
                  {t(item.key)}
                </TransitionLink>
              </div>
            ))}
          </nav>

          {/* Bas : locale + infos */}
          <div
            className={`mt-12 flex items-center gap-6 transition-all duration-500 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            style={{ transitionDelay: isMenuOpen ? "400ms" : "0ms" }}
          >
            {routing.locales.map((locale, i) => (
              <span key={locale} className="flex items-center gap-6">
                {i > 0 && <span className="text-white/20">|</span>}
                <button
                  className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                    currentLocale === locale ? "text-white" : "text-white/30 hover:text-white/60"
                  }`}
                  onClick={() => { switchLocale(locale); setIsMenuOpen(false); }}
                  type="button"
                >
                  {locale.toUpperCase()}
                </button>
              </span>
            ))}
            <span className="text-white/20">—</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">CST Studio</span>
          </div>
        </div>
      </div>
    </>
  );
}

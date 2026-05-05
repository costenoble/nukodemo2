"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { useCart } from "@/components/cart-provider";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const navItems = [
  { href: "/particulier", key: "stoves" },
  { href: "/fumisterie", key: "fumisterie" },
  { href: "/histoire", key: "story" },
  { href: "/journal", key: "journal" },
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

  function switchLocale(locale) {
    router.replace(pathname, { locale });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black">

      {/* ── Barre principale ── */}
      <div className="flex h-14 items-center justify-between px-5 md:px-10">

        {/* Mobile : hamburger */}
        <button
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setIsMenuOpen((c) => !c)}
          aria-label="Menu"
          type="button"
        >
          <span className={`block h-px w-5 bg-white transition-all duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-px w-5 bg-white transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-5 bg-white transition-all duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>

        {/* Desktop : nav gauche */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={`text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${
                isActive(pathname, item.href) ? "text-white" : "text-white/50 hover:text-white"
              }`}
              href={item.href}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Centre : logo */}
        <Link
          className="absolute left-1/2 -translate-x-1/2 font-headline text-xl font-black uppercase tracking-[-0.04em] text-white md:text-2xl"
          href="/"
        >
          NUKÖ
        </Link>

        {/* Droite : utilitaires */}
        <div className="flex items-center gap-4 md:gap-5">

          {/* FR / EN — desktop */}
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

          {/* Espace pro — desktop */}
          <Link
            className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-white md:inline"
            href="/professionnel"
          >
            {t("pro")}
          </Link>

          {/* Panier */}
          <Link className="relative text-white transition-opacity hover:opacity-60" href="/panier" aria-label={t("cart")}>
            <CartIcon />
            {hasHydrated && count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold leading-none text-black">
                {count}
              </span>
            )}
          </Link>

          {/* Précommander — desktop */}
          <Link
            className="hidden border border-white/60 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white hover:text-black md:inline-flex"
            href="/precommande"
          >
            {t("preorder")}
          </Link>

          {/* Précommander — mobile (petit) */}
          <Link
            className="border border-white/50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white md:hidden"
            href="/precommande"
          >
            {t("preorder")}
          </Link>
        </div>
      </div>

      {/* ── Menu mobile ── */}
      <div className={`overflow-hidden bg-black transition-all duration-300 md:hidden ${isMenuOpen ? "max-h-screen border-t border-white/10" : "max-h-0"}`}>
        <div className="flex flex-col px-5 pb-6 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={`border-b border-white/10 py-4 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                isActive(pathname, item.href) ? "text-white" : "text-white/60 hover:text-white"
              }`}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            className="border-b border-white/10 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40"
            href="/professionnel"
            onClick={() => setIsMenuOpen(false)}
          >
            {t("pro")}
          </Link>

          {/* FR/EN + précommande */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex gap-4">
              {routing.locales.map((locale) => (
                <button
                  key={locale}
                  className={`text-[10px] font-bold uppercase tracking-[0.14em] ${
                    currentLocale === locale ? "text-white" : "text-white/40"
                  }`}
                  onClick={() => { switchLocale(locale); setIsMenuOpen(false); }}
                  type="button"
                >
                  {locale.toUpperCase()}
                </button>
              ))}
            </div>
            <Link
              className="border border-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
              href="/precommande"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("preorder")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

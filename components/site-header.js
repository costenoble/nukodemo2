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
  { href: "/contact", key: "contact" }
];

function isActive(pathname, href) {
  const clean = pathname.replace(/^\/(fr|en)/, "") || "/";
  if (href === "/") return clean === href;
  return clean.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { count, hasHydrated } = useCart();
  const t = useTranslations("nav");

  const isDark = pathname === "/" || pathname === "/fr" || pathname === "/en";

  function switchLocale(locale) {
    router.replace(pathname, { locale });
  }

  const currentLocale = pathname.startsWith("/en") ? "en" : "fr";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
      isDark
        ? "border-white/10 bg-[#141410]/80 backdrop-blur-xl"
        : "border-outline/70 bg-background/90 backdrop-blur-xl"
    }`}>
      <div className="page-shell flex items-center justify-between py-5">
        <div className="flex flex-col gap-0.5">
          <Link
            className={`font-headline text-2xl font-bold tracking-[-0.08em] transition-colors ${
              isDark ? "text-white" : "text-on-surface"
            }`}
            href="/"
          >
            NUKÖ
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {routing.locales.map((locale) => (
              <button
                key={locale}
                className={`text-[9px] font-bold uppercase tracking-[0.12em] transition-colors ${
                  currentLocale === locale
                    ? isDark ? "text-[#dcbf96]" : "text-secondary"
                    : isDark ? "text-white/40 hover:text-white/70" : "text-on-surface-muted hover:text-on-surface"
                }`}
                onClick={() => switchLocale(locale)}
                type="button"
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={`nav-link ${isActive(pathname, item.href) ? "nav-link-active" : ""} ${
                isDark ? "text-white/70 hover:text-white" : ""
              }`}
              href={item.href}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            className={`hidden text-[11px] font-bold uppercase tracking-[0.2em] transition-colors md:inline-flex ${
              isDark ? "text-[#dcbf96] hover:text-white" : "text-secondary hover:text-on-surface"
            }`}
            href="/professionnel"
          >
            {t("pro")}
          </Link>

          <Link
            className={`hidden items-center gap-2 border px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors md:inline-flex ${
              isDark
                ? "border-white/20 text-white/70 hover:border-white/50 hover:text-white"
                : "border-outline text-on-surface-muted hover:border-primary hover:text-on-surface"
            }`}
            href="/panier"
          >
            {t("cart")}
            {hasHydrated && count > 0 && (
              <span className={`rounded-full px-1.5 py-0.5 text-[9px] leading-none ${
                isDark ? "bg-[#dcbf96] text-[#141410]" : "bg-primary text-white"
              }`}>
                {count}
              </span>
            )}
          </Link>

          <Link
            className={`button-primary px-5 py-3 ${isDark ? "bg-white text-[#141410] hover:bg-[#dcbf96]" : ""}`}
            href="/precommande"
          >
            {t("preorder")}
          </Link>

          <button
            className="button-secondary px-4 py-3 md:hidden"
            onClick={() => setIsMenuOpen((c) => !c)}
            type="button"
          >
            {t("menu")}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-outline bg-surface md:hidden">
          <div className="page-shell flex flex-col gap-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={`nav-link ${isActive(pathname, item.href) ? "nav-link-active" : ""}`}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link className="nav-link text-secondary" href="/professionnel" onClick={() => setIsMenuOpen(false)}>
              {t("pro")}
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                {routing.locales.map((locale) => (
                  <button
                    key={locale}
                    className={`text-[10px] font-bold uppercase tracking-[0.12em] ${
                      currentLocale === locale ? "text-secondary" : "text-on-surface-muted"
                    }`}
                    onClick={() => { switchLocale(locale); setIsMenuOpen(false); }}
                    type="button"
                  >
                    {locale.toUpperCase()}
                  </button>
                ))}
              </div>
              <Link
                className="flex items-center gap-2 border border-outline px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em]"
                href="/panier"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("cart")}
                {hasHydrated && count > 0 && (
                  <span className="rounded-full bg-primary px-1.5 py-0.5 text-[9px] leading-none text-white">{count}</span>
                )}
              </Link>
            </div>
            <Link
              className="button-primary mt-2 justify-center"
              href="/precommande"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("preorder")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

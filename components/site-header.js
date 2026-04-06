"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/components/cart-provider";
import { navigation } from "@/lib/content";

function isActive(pathname, href) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { count, hasHydrated } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-outline/70 bg-background/90 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between py-5">
        <Link className="font-headline text-2xl font-bold tracking-[-0.08em]" href="/">
          NUKÖ
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              className={`nav-link ${isActive(pathname, item.href) ? "nav-link-active" : ""}`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link className="button-secondary px-4 py-3" href="/panier">
            Panier
            <span className="rounded-full bg-primary px-2 py-1 text-[10px] leading-none text-white">
              {hasHydrated ? count : 0}
            </span>
          </Link>

          <button
            className="button-secondary px-4 py-3 md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
          >
            Menu
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-outline bg-surface md:hidden">
          <div className="page-shell flex flex-col gap-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                className={`nav-link ${isActive(pathname, item.href) ? "nav-link-active" : ""}`}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

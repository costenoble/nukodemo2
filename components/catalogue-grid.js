"use client";

import { useState } from "react";

import { TransitionLink as Link } from "@/components/page-transition";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/product-image";

const FILTERS_FR = [
  { key: "all", label: "Tous" },
  { key: "T-shirt", label: "Tees" },
  { key: "Pantalon", label: "Pantalons" },
];

const FILTERS_EN = [
  { key: "all", label: "All" },
  { key: "T-shirt", label: "Tees" },
  { key: "Pantalon", label: "Trousers" },
];

export function CatalogueGrid({ products, locale = "fr" }) {
  const [active, setActive] = useState("all");
  const filters = locale === "en" ? FILTERS_EN : FILTERS_FR;
  const addLabel = locale === "en" ? "View piece" : "Voir la pièce";

  const filtered = active === "all"
    ? products
    : products.filter((p) => p.category === active);

  return (
    <div>
      {/* Filtres */}
      <div className="mb-10 flex gap-0 border-b border-outline">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
              active === f.key
                ? "border-b-2 border-secondary text-secondary"
                : "text-on-surface-muted hover:text-on-surface"
            }`}
            onClick={() => setActive(f.key)}
            type="button"
          >
            {f.label}
            <span className="ml-2 text-[9px] opacity-50">
              {f.key === "all" ? products.length : products.filter((p) => p.category === f.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="grid gap-px bg-outline md:grid-cols-2 lg:grid-cols-2">
        {filtered.map((product) => (
          <Link
            key={product.id}
            className="group relative flex flex-col bg-background"
            href={`/produit/${product.slug}`}
          >
            {/* Image / Placeholder */}
            <div className="overflow-hidden">
              <ProductImage
                alt={product.name}
                category={product.category}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={product.heroImage}
              />
            </div>

            {/* Infos */}
            <div className="flex items-end justify-between gap-4 border-t border-outline p-6 md:p-8">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-secondary">
                  {product.category}
                </p>
                <h3 className="font-headline text-3xl font-black uppercase tracking-[-0.03em] md:text-4xl">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm font-light text-on-surface-muted">{product.subtitle}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-headline text-2xl font-black tracking-[-0.04em]">
                  {formatPrice(product.price)}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-muted transition-colors group-hover:text-secondary">
                  {addLabel}
                  <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

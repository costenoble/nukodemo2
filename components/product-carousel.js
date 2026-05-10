"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/product-image";

export function ProductCarousel({ products }) {
  const tc = useTranslations("common");
  const trackRef = useRef(null);

  function scroll(dir) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const width = card ? card.offsetWidth + 24 : 600;
    el.scrollBy({ left: dir * width, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            data-card
            className="group relative flex-none w-[85vw] max-w-[760px] snap-start overflow-hidden border border-outline bg-surface"
            href={`/produit/${product.slug}`}
          >
            <div className="overflow-hidden">
              <ProductImage
                alt={product.name}
                category={product.category}
                className="h-[55vw] max-h-[500px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={product.heroImage}
              />
            </div>
            <div className="flex flex-col gap-5 p-6 md:flex-row md:items-end md:justify-between md:gap-6 md:p-10">
              <div>
                <h3 className="font-headline text-4xl font-bold uppercase tracking-[-0.06em] md:text-6xl">
                  {product.name}
                </h3>
                <p className="mt-2 max-w-xs text-sm font-light leading-7 text-on-surface-muted">
                  {product.subtitle}
                </p>
              </div>
              <div className="flex items-center justify-between md:block md:shrink-0 md:text-right">
                <div>
                  <p className="font-headline text-2xl font-bold tracking-[-0.05em] md:text-3xl">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-muted transition-colors group-hover:text-primary md:mt-4">
                  {tc("seeProduct")}
                  <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          className="border border-outline p-3 transition hover:border-primary"
          onClick={() => scroll(-1)}
          type="button"
          aria-label="Précédent"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        </button>
        <button
          className="border border-outline p-3 transition hover:border-primary"
          onClick={() => scroll(1)}
          type="button"
          aria-label="Suivant"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        </button>
        <span className="text-xs text-on-surface-muted">
          {products.length} {products.length > 1 ? "modèles" : "modèle"}
        </span>
      </div>
    </div>
  );
}

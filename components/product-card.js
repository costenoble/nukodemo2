import Link from "next/link";

import { formatPrice } from "@/lib/format";

export function ProductCard({ product, ctaLabel = "Voir le produit" }) {
  return (
    <article className="group overflow-hidden border border-outline bg-surface" data-reveal="">
      <div className="relative overflow-hidden bg-surface-soft">
        <img
          alt={product.name}
          className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
          data-media-reveal=""
          data-scrub-scale="1.14,1"
          data-scrub-y="-6,10"
          src={product.cardImage ?? product.heroImage}
        />
        <div className="absolute left-5 top-5 bg-background px-3 py-2 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
          {product.stockLabel}
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-md">
            <p className="eyebrow mb-3">{product.category}</p>
            <h3 className="font-headline text-3xl font-bold tracking-[-0.05em]">{product.name}</h3>
            <p className="mt-3 text-sm leading-7 text-on-surface-muted">{product.subtitle}</p>
          </div>

          <div className="text-right">
            <div className="font-headline text-3xl font-bold tracking-[-0.05em]">
              {formatPrice(product.price)}
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.16em] text-on-surface-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {product.audience.map((item) => (
            <span
              key={item}
              className="border border-outline px-3 py-2 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-muted"
            >
              {item}
            </span>
          ))}
        </div>

        <Link className="button-primary w-full sm:w-auto" href={`/boutique/${product.slug}`}>
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}

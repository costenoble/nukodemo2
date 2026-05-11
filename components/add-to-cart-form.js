"use client";

import { useState } from "react";

import { useCart } from "@/components/cart-provider";
import { TransitionLink as Link } from "@/components/page-transition";
import { useToast } from "@/components/toast";
import { formatPrice } from "@/lib/format";

export function AddToCartForm({ product }) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[2] ?? product.sizes?.[0] ?? null);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? null);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    const label = [selectedSize, selectedColor?.name].filter(Boolean).join(" — ");
    addItem(product.id, 1, { unitPrice: product.price, configLabel: label || undefined });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    toast(`${product.name} ajouté au panier`);
  }

  return (
    <div className="space-y-6">
      {/* Prix */}
      <div className="border border-outline bg-background p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-muted mb-2">Prix</p>
            <p className="font-headline text-5xl font-bold tracking-[-0.06em]">
              {formatPrice(product.price)}
            </p>
          </div>
          <div className="text-right text-sm leading-6 text-on-surface-muted">
            <p>{product.shippingLabel}</p>
            <p>{product.stockLabel}</p>
          </div>
        </div>

        {/* Couleurs */}
        {product.colors?.length > 0 && (
          <div className="mt-5 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-muted">
              Couleur — <span className="text-on-surface">{selectedColor?.name}</span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  aria-label={color.name}
                  aria-pressed={selectedColor?.name === color.name}
                  title={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`h-7 w-7 border-2 transition-all ${
                    selectedColor?.name === color.name ? "border-primary scale-110" : "border-transparent hover:border-primary/40"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tailles */}
        {product.sizes?.length > 0 && (
          <div className="mt-5 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-muted">
              Taille — <span className="text-on-surface">{selectedSize}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] border transition-all ${
                    selectedSize === size
                      ? "border-primary bg-primary text-white"
                      : "border-outline text-on-surface-muted hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleAdd}
            className={`button-primary flex-1 justify-center transition-colors ${added ? "bg-[#006400] border-[#006400]" : ""}`}
          >
            {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
          </button>
          <Link className="button-secondary flex-1 justify-center" href="/contact">
            Une question ?
          </Link>
        </div>

        {added && (
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-on-surface-muted">Article ajouté</span>
            <Link className="font-bold underline" href="/panier">Voir le panier →</Link>
          </div>
        )}
      </div>
    </div>
  );
}

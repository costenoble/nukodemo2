"use client";

import { useEffect, useState } from "react";

import { useCart } from "@/components/cart-provider";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/format";

export function StickyProductCTA({ product }) {
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleAdd() {
    addItem({ productId: product.id, quantity: 1, unitPrice: product.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-outline bg-background/95 backdrop-blur-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="page-shell flex items-center justify-between gap-4 py-4">
        <div className="hidden sm:block">
          <p className="font-headline text-xl font-bold tracking-[-0.04em]">{product.name}</p>
          <p className="text-xs text-on-surface-muted">{product.shippingLabel}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-headline text-2xl font-bold tracking-[-0.05em]">{formatPrice(product.price)}</p>
          {added ? (
            <Link className="button-primary" href="/panier">Voir le panier →</Link>
          ) : (
            <button className="button-primary" type="button" onClick={handleAdd}>
              Ajouter au panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

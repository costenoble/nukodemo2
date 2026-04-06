"use client";

import Link from "next/link";

import { CheckoutButton } from "@/components/checkout-button";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format";
import { getProductById } from "@/lib/products";

export function CartPage() {
  const { hasHydrated, items, removeItem, setQuantity, subtotal } = useCart();

  const detailedItems = items
    .map((item) => {
      const product = getProductById(item.productId);

      if (!product) {
        return null;
      }

      return {
        ...item,
        product
      };
    })
    .filter(Boolean);

  if (!hasHydrated) {
    return (
      <div className="page-shell page-section">
        <p className="eyebrow mb-4">Panier</p>
        <h1 className="page-title">Chargement...</h1>
      </div>
    );
  }

  return (
    <div className="page-shell page-section space-y-12">
      <div className="space-y-4" data-hero-copy="">
        <p className="eyebrow" data-reveal-item="">
          Panier
        </p>
        <h1 className="page-title" data-reveal-item="">
          Votre panier
        </h1>
      </div>

      {!detailedItems.length ? (
        <div className="surface-panel p-10" data-reveal="">
          <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">Aucun produit pour l'instant</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-on-surface-muted">
            Retrouvez le Nomad 01 dans la boutique pour consulter sa fiche complete et demarrer
            votre commande.
          </p>
          <Link className="button-primary mt-8" href="/boutique/nomad-01">
            Retour a la fiche produit
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6" data-reveal-stagger="">
            {detailedItems.map(({ product, quantity }) => (
              <article
                key={product.id}
                className="surface-panel overflow-hidden p-6"
                data-reveal-item=""
              >
                <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                  <img
                    alt={product.name}
                    className="h-full w-full object-cover"
                    data-media-reveal=""
                    data-scrub-scale="1.1,1"
                    data-scrub-y="-4,8"
                    src={product.heroImage}
                  />

                  <div className="flex flex-col justify-between gap-6">
                    <div className="space-y-3">
                      <p className="eyebrow">{product.category}</p>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h2 className="font-headline text-3xl font-bold tracking-[-0.05em]">
                            {product.name}
                          </h2>
                          <p className="mt-2 max-w-xl text-sm leading-7 text-on-surface-muted">
                            {product.subtitle}
                          </p>
                        </div>
                        <div className="font-headline text-3xl font-bold tracking-[-0.05em]">
                          {formatPrice(product.price * quantity)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center border border-outline">
                        <button
                          className="px-4 py-3 text-sm font-bold"
                          onClick={() => setQuantity(product.id, quantity - 1)}
                          type="button"
                        >
                          -
                        </button>
                        <span className="min-w-14 px-4 py-3 text-center font-headline text-lg font-bold">
                          {quantity}
                        </span>
                        <button
                          className="px-4 py-3 text-sm font-bold"
                          onClick={() => setQuantity(product.id, quantity + 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="button-secondary"
                        onClick={() => removeItem(product.id)}
                        type="button"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="surface-panel h-fit p-8" data-float-panel="" data-reveal="">
            <p className="eyebrow mb-4">Recapitulatif</p>
            <div className="space-y-4 text-sm leading-7 text-on-surface-muted">
              <div className="flex items-center justify-between">
                <span>Sous-total</span>
                <span className="font-headline text-xl font-bold text-on-surface">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Livraison</span>
                <span className="font-headline text-xl font-bold text-on-surface">Offerte</span>
              </div>
              <div className="border-t border-outline pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-headline text-2xl font-bold uppercase tracking-[-0.04em] text-on-surface">
                    Total
                  </span>
                  <span className="font-headline text-3xl font-bold tracking-[-0.05em] text-on-surface">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
            </div>

            <CheckoutButton className="mt-8 w-full" />

            <p className="mt-4 text-sm leading-7 text-on-surface-muted">
              Une fois la commande validee, vous recevez un e-mail de confirmation avec le
              recapitulatif et les prochaines etapes.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";

import { CheckoutButton } from "@/components/checkout-button";
import { useCart } from "@/components/cart-provider";
import { TransitionLink as Link } from "@/components/page-transition";
import { getFumiProductById } from "@/lib/fumisterie";
import { formatPrice } from "@/lib/format";
import { getProductById } from "@/lib/products";

function getItemDetails(item) {
  const product = getProductById(item.productId);
  if (product) {
    return {
      id: item.productId,
      name: product.name,
      subtitle: item.configLabel ?? product.subtitle,
      image: product.heroImage,
      category: product.category,
      unitPrice: product.price
    };
  }
  const fumi = getFumiProductById(item.productId);
  if (fumi) {
    return {
      id: item.productId,
      name: fumi.name,
      subtitle: item.configLabel ?? fumi.ref,
      image: "/images/nomad-detail.jpg",
      category: "Fumisterie",
      unitPrice: fumi.price
    };
  }
  return null;
}

export function CartPage() {
  const { hasHydrated, items, removeItem, setQuantity, subtotal, getItemPrice } = useCart();
  const t = useTranslations("cart");

  const detailedItems = items
    .map((item) => {
      const details = getItemDetails(item);
      if (!details) return null;
      return { ...item, details };
    })
    .filter(Boolean);

  if (!hasHydrated) {
    return (
      <div className="page-shell page-section">
        <p className="eyebrow mb-4">{t("eyebrow")}</p>
        <h1 className="page-title">{t("loading")}</h1>
      </div>
    );
  }

  return (
    <div className="page-shell page-section space-y-12">
      <div className="space-y-4" data-reveal-stagger="">
        <p className="eyebrow" data-reveal-item="">{t("eyebrow")}</p>
        <h1 className="page-title" data-reveal-item="">{t("title")}</h1>
      </div>

      {!detailedItems.length ? (
        <div className="surface-panel p-10" data-reveal="">
          <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">{t("emptyTitle")}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-on-surface-muted">{t("emptyDesc")}</p>
          <Link className="button-primary mt-8" href="/produit/nomad-01">
            {t("emptyCta")}
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6" data-reveal-stagger="">
            {detailedItems.map((item) => {
              const { details, quantity, configLabel } = item;
              const lineTotal = (item.unitPrice ?? details.unitPrice) * quantity;

              return (
                <article
                  key={`${details.id}-${configLabel ?? "default"}`}
                  className="surface-panel overflow-hidden p-6"
                  data-reveal-item=""
                >
                  <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                    <img
                      alt={details.name}
                      className="h-48 w-full object-cover md:h-full"
                      src={details.image}
                    />

                    <div className="flex flex-col justify-between gap-6">
                      <div className="space-y-3">
                        <p className="eyebrow">{details.category}</p>
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <h2 className="font-headline text-3xl font-bold tracking-[-0.05em]">
                              {details.name}
                            </h2>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-on-surface-muted">
                              {details.subtitle}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-headline text-3xl font-bold tracking-[-0.05em]">
                              {formatPrice(lineTotal)}
                            </div>
                            {quantity > 1 && (
                              <div className="text-xs text-on-surface-muted">
                                {formatPrice(details.unitPrice)} / u.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center border border-outline">
                          <button
                            className="px-4 py-3 text-sm font-bold"
                            onClick={() => setQuantity(details.id, quantity - 1, configLabel)}
                            type="button"
                          >
                            -
                          </button>
                          <span className="min-w-14 px-4 py-3 text-center font-headline text-lg font-bold">
                            {quantity}
                          </span>
                          <button
                            className="px-4 py-3 text-sm font-bold"
                            onClick={() => setQuantity(details.id, quantity + 1, configLabel)}
                            type="button"
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="button-secondary"
                          onClick={() => removeItem(details.id, configLabel)}
                          type="button"
                        >
                          {t("remove")}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="surface-panel h-fit p-8" data-float-panel="" data-reveal="">
            <p className="eyebrow mb-4">{t("summaryEyebrow")}</p>
            <div className="space-y-3 text-sm leading-7 text-on-surface-muted">
              {detailedItems.map((item) => (
                <div
                  key={`${item.details.id}-${item.configLabel ?? "default"}`}
                  className="flex items-start justify-between gap-4"
                >
                  <span className="flex-1">
                    {item.details.name}
                    {item.quantity > 1 && ` x${item.quantity}`}
                  </span>
                  <span className="shrink-0 font-medium text-on-surface">
                    {formatPrice((item.unitPrice ?? item.details.unitPrice) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-4 border-t border-outline pt-4 text-sm leading-7 text-on-surface-muted">
              <div className="flex items-center justify-between">
                <span>{t("shipping")}</span>
                <span className="font-headline text-xl font-bold text-on-surface">{t("shippingFree")}</span>
              </div>
              <div className="border-t border-outline pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-headline text-2xl font-bold uppercase tracking-[-0.04em] text-on-surface">
                    {t("total")}
                  </span>
                  <span className="font-headline text-3xl font-bold tracking-[-0.05em] text-on-surface">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
            </div>

            <CheckoutButton className="mt-8 w-full" />

            <p className="mt-4 text-sm leading-7 text-on-surface-muted">{t("confirmNote")}</p>
          </aside>
        </div>
      )}
    </div>
  );
}

"use client";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatPrice } from "@/lib/format";

export function AccessoryCard({ accessory }) {
  return (
    <article
      className="flex flex-col border border-outline bg-background"
      data-float-panel=""
      data-reveal-item=""
    >
      <div className="overflow-hidden border-b border-outline">
        <img
          alt={accessory.name}
          className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
          src={accessory.image}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex-1 space-y-2">
          <h3 className="font-headline text-2xl font-bold tracking-[-0.04em]">
            {accessory.name}
          </h3>
          <p className="text-sm leading-6 text-on-surface-muted">{accessory.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-headline text-2xl font-bold tracking-[-0.04em]">
            {formatPrice(accessory.price)}
          </span>
          <AddToCartButton
            isAccessory
            label="Ajouter"
            productId={accessory.id}
            unitPrice={accessory.price}
          />
        </div>
      </div>
    </article>
  );
}

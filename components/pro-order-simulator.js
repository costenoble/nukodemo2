"use client";

import { useState } from "react";

import { formatPrice } from "@/lib/format";
import { applyProDiscount, getTierByQuantity } from "@/lib/pro-pricing";

const BASE_PRICE_HT = 104167;

export function ProOrderSimulator() {
  const [quantity, setQuantity] = useState(1);
  const tier = getTierByQuantity(quantity);
  const unitPriceHT = applyProDiscount(BASE_PRICE_HT, tier.discountPercent);
  const totalHT = unitPriceHT * quantity;
  const totalTTC = Math.round(totalHT * 1.2);

  return (
    <div className="space-y-6">
      <p className="eyebrow">Simulateur de commande</p>

      <div className="flex items-center gap-4">
        <label className="eyebrow" htmlFor="qty-input">Quantite</label>
        <div className="flex items-center border border-outline">
          <button
            className="px-5 py-3 text-lg font-bold"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            type="button"
          >
            -
          </button>
          <input
            className="w-16 border-x border-outline bg-background py-3 text-center font-headline text-xl font-bold"
            id="qty-input"
            min={1}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            type="number"
            value={quantity}
          />
          <button
            className="px-5 py-3 text-lg font-bold"
            onClick={() => setQuantity((q) => q + 1)}
            type="button"
          >
            +
          </button>
        </div>
        <span
          className={`inline-flex items-center border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
            tier.id === "platinum"
              ? "border-secondary bg-secondary text-white"
              : tier.id === "gold"
              ? "border-yellow-600 bg-yellow-50 text-yellow-800"
              : "border-outline bg-surface-muted text-on-surface-muted"
          }`}
        >
          {tier.label}
        </span>
      </div>

      <div className="grid gap-px overflow-hidden border border-outline bg-outline sm:grid-cols-3">
        <div className="bg-background p-6">
          <p className="eyebrow mb-2">Remise</p>
          <p className="font-headline text-4xl font-bold tracking-[-0.05em]">
            -{tier.discountPercent}%
          </p>
        </div>
        <div className="bg-background p-6">
          <p className="eyebrow mb-2">Prix unitaire HT</p>
          <p className="font-headline text-4xl font-bold tracking-[-0.05em]">
            {formatPrice(unitPriceHT)}
          </p>
        </div>
        <div className="bg-background p-6">
          <p className="eyebrow mb-2">Total TTC ({quantity} u.)</p>
          <p className="font-headline text-4xl font-bold tracking-[-0.05em]">
            {formatPrice(totalTTC)}
          </p>
          <p className="mt-1 text-xs text-on-surface-muted">HT {formatPrice(totalHT)}</p>
        </div>
      </div>

      <p className="text-sm leading-7 text-on-surface-muted">{tier.description}</p>

      <a className="button-primary inline-block" href="/contact">
        Demander un pro-forma
      </a>
    </div>
  );
}

"use client";

import { useState } from "react";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { CheckoutButton } from "@/components/checkout-button";
import { formatPrice } from "@/lib/format";

export function ProductConfigurator({ product }) {
  const [selections, setSelections] = useState(() => {
    const defaults = {};
    for (const option of product.configuratorOptions ?? []) {
      defaults[option.id] = option.choices[0].id;
    }
    return defaults;
  });

  function getChoice(option) {
    return option.choices.find((c) => c.id === selections[option.id]) ?? option.choices[0];
  }

  const totalDelta = (product.configuratorOptions ?? []).reduce((sum, option) => {
    return sum + getChoice(option).priceDelta;
  }, 0);

  const totalPrice = product.price + totalDelta;

  const configLabel = (product.configuratorOptions ?? [])
    .map((opt) => getChoice(opt).label)
    .join(" · ");

  return (
    <div className="space-y-8">
      {(product.configuratorOptions ?? []).map((option) => (
        <div key={option.id}>
          <p className="eyebrow mb-4">{option.label}</p>

          {option.type === "color" ? (
            <div className="flex flex-wrap gap-3">
              {option.choices.map((choice) => (
                <button
                  key={choice.id}
                  className={`group flex items-center gap-2.5 rounded-none border px-4 py-2.5 text-sm transition-all duration-200 ${
                    selections[option.id] === choice.id
                      ? "border-primary bg-primary text-white"
                      : "border-outline bg-background text-on-surface hover:border-primary"
                  }`}
                  onClick={() => setSelections((s) => ({ ...s, [option.id]: choice.id }))}
                  type="button"
                >
                  <span
                    className="h-4 w-4 shrink-0 rounded-full border border-black/10"
                    style={{ backgroundColor: choice.hex }}
                  />
                  {choice.label}
                  {choice.priceDelta > 0 && (
                    <span className="ml-1 text-xs opacity-60">+{formatPrice(choice.priceDelta)}</span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {option.choices.map((choice) => (
                <button
                  key={choice.id}
                  className={`flex w-full items-center justify-between border px-5 py-3 text-left text-sm transition-all duration-200 ${
                    selections[option.id] === choice.id
                      ? "border-primary bg-primary text-white"
                      : "border-outline bg-background text-on-surface hover:border-primary"
                  }`}
                  onClick={() => setSelections((s) => ({ ...s, [option.id]: choice.id }))}
                  type="button"
                >
                  <span>{choice.label}</span>
                  {choice.priceDelta > 0 && (
                    <span className="text-xs opacity-60">+{formatPrice(choice.priceDelta)}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="border border-outline bg-surface-muted p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow mb-1">Configuration choisie</p>
            <p className="text-sm leading-6 text-on-surface-muted">{configLabel}</p>
          </div>
          <div className="text-right">
            <p className="font-headline text-4xl font-bold tracking-[-0.06em]">
              {formatPrice(totalPrice)}
            </p>
            {totalDelta > 0 && (
              <p className="text-xs text-on-surface-muted">
                Base {formatPrice(product.price)} + options {formatPrice(totalDelta)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <AddToCartButton
          className="w-full sm:w-auto"
          configLabel={configLabel}
          productId={product.id}
          unitPrice={totalPrice}
        />
        <CheckoutButton
          className="w-full sm:w-auto"
          items={[{ productId: product.id, quantity: 1, unitPrice: totalPrice, configLabel }]}
          label="Payer maintenant"
        />
      </div>
    </div>
  );
}

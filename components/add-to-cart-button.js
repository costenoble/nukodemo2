"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { useCart } from "@/components/cart-provider";

export function AddToCartButton({
  productId,
  className = "",
  unitPrice,
  configLabel,
  isAccessory = false
}) {
  const { addItem } = useCart();
  const [didAdd, setDidAdd] = useState(false);
  const t = useTranslations("common");

  useEffect(() => {
    if (!didAdd) return undefined;
    const timeout = window.setTimeout(() => setDidAdd(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [didAdd]);

  return (
    <button
      className={`${didAdd ? "button-secondary" : "button-primary"} ${className}`}
      onClick={() => {
        addItem(productId, 1, { unitPrice, configLabel, isAccessory });
        setDidAdd(true);
      }}
      type="button"
    >
      {didAdd ? t("addedToCart") : t("addToCart")}
    </button>
  );
}

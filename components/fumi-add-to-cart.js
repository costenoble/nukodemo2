"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { useCart } from "@/components/cart-provider";

export function FumiAddToCart({ product }) {
  const { addItem } = useCart();
  const [didAdd, setDidAdd] = useState(false);
  const t = useTranslations("fumisterie");

  useEffect(() => {
    if (!didAdd) return undefined;
    const timeout = setTimeout(() => setDidAdd(false), 1800);
    return () => clearTimeout(timeout);
  }, [didAdd]);

  return (
    <button
      className="button-secondary px-4 py-3 text-xs transition-colors"
      style={didAdd ? { borderColor: "var(--secondary)", color: "var(--secondary)" } : {}}
      onClick={() => {
        addItem(product.id, 1, {
          unitPrice: product.price,
          configLabel: product.ref,
          isAccessory: true
        });
        setDidAdd(true);
      }}
      type="button"
    >
      {didAdd ? t("addedToCart") : t("addToCart")}
    </button>
  );
}

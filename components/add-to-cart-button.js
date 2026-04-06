"use client";

import { useEffect, useState } from "react";

import { useCart } from "@/components/cart-provider";

export function AddToCartButton({ productId, className = "", label = "Ajouter au panier" }) {
  const { addItem } = useCart();
  const [didAdd, setDidAdd] = useState(false);

  useEffect(() => {
    if (!didAdd) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setDidAdd(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [didAdd]);

  return (
    <button
      className={`${didAdd ? "button-secondary" : "button-primary"} ${className}`}
      onClick={() => {
        addItem(productId, 1);
        setDidAdd(true);
      }}
      type="button"
    >
      {didAdd ? "Ajoute au panier" : label}
    </button>
  );
}

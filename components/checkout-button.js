"use client";

import { useState } from "react";

import { useCart } from "@/components/cart-provider";

export function CheckoutButton({ items: directItems, label = "Passer au paiement", className = "" }) {
  const { items: cartItems } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const items = directItems ?? cartItems;

  async function handleCheckout() {
    if (!items.length) {
      setError("Votre panier est vide.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items })
      });

      const payload = await response.json();

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Impossible d'ouvrir la page de paiement.");
      }

      window.location.assign(payload.url);
    } catch (checkoutError) {
      setError(checkoutError.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        className={`button-primary ${className}`}
        disabled={isLoading}
        onClick={handleCheckout}
        type="button"
      >
        {isLoading ? "Redirection..." : label}
      </button>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
